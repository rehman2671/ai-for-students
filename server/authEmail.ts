import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import type { Response } from "express";
import { ENV } from "./_core/env";

export const AUTH_EMAIL_CODE_COOKIE = "ai_students_email_challenge";
const CODE_TTL_MS = 10 * 60 * 1000;
const REQUEST_COOLDOWN_MS = 30 * 1000;
const recentRequests = new Map<string, number>();

type Challenge = { email: string; digest: string; expiresAt: number };

function signingKey() {
  if (!ENV.cookieSecret) throw new Error("JWT secret is not configured");
  return ENV.cookieSecret;
}

function digest(email: string, code: string) {
  return createHmac("sha256", signingKey()).update(`${email}:${code}`).digest("hex");
}

export function canRequestEmailCode(email: string) {
  const now = Date.now();
  const previous = recentRequests.get(email);
  if (previous && now - previous < REQUEST_COOLDOWN_MS) return false;
  recentRequests.set(email, now);
  recentRequests.forEach((timestamp, key) => {
    if (now - timestamp > CODE_TTL_MS) recentRequests.delete(key);
  });
  return true;
}

export function createEmailCodeChallenge(email: string, response: Response) {
  const code = String(randomInt(100000, 1000000));
  const challenge: Challenge = { email, digest: digest(email, code), expiresAt: Date.now() + CODE_TTL_MS };
  response.cookie(AUTH_EMAIL_CODE_COOKIE, Buffer.from(JSON.stringify(challenge)).toString("base64url"), {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: CODE_TTL_MS,
  });
  return { code, expiresInMinutes: CODE_TTL_MS / 60000 };
}

export function verifyEmailCode(email: string, code: string, cookieValue?: string) {
  if (!cookieValue) return false;
  try {
    const challenge = JSON.parse(Buffer.from(cookieValue, "base64url").toString("utf8")) as Challenge;
    if (challenge.email !== email || challenge.expiresAt < Date.now()) return false;
    const expected = Buffer.from(challenge.digest, "hex");
    const actual = Buffer.from(digest(email, code), "hex");
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}
