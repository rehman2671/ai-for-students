import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { mergeProgressValues } from "./db";
import { GUEST_RETENTION_DAYS, isGuestSessionExpired } from "../client/src/lib/learningProgress";
import { questions } from "../client/src/data/gameQuestions";
import { factQuestions } from "../client/src/components/game/FactCheckQuest";
import { safetyQuestions } from "../client/src/components/game/AISafetyLab";
import { moreGameCatalog } from "../client/src/components/game/MoreAIGames";
import type { TrpcContext } from "./_core/context";

const baseContext = (user?: TrpcContext["user"]): TrpcContext => ({
  user,
  req: { protocol: "https", headers: {} } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
});

describe("learning progress access", () => {
  it("keeps every core learning game at thirty or more reviewed questions", () => {
    expect(questions.length).toBeGreaterThanOrEqual(30);
    expect(factQuestions.length).toBeGreaterThanOrEqual(30);
    expect(safetyQuestions.length).toBeGreaterThanOrEqual(30);
    expect(moreGameCatalog).toHaveLength(7);
    for (const game of moreGameCatalog) expect(game.scenarios.length).toBeGreaterThanOrEqual(30);
  });
  it("requires an authenticated user to read progress", async () => {
    const caller = appRouter.createCaller(baseContext());
    await expect(caller.learning.list()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("protects account export and deletion procedures", async () => {
    const caller = appRouter.createCaller(baseContext());
    await expect(caller.learning.export()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(caller.learning.deleteAccount()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("expires inactive guest sessions after the retention window", () => {
    const now = Date.parse("2026-08-24T00:00:00.000Z");
    const old = new Date(now - (GUEST_RETENTION_DAYS + 1) * 24 * 60 * 60 * 1000).toISOString();
    expect(isGuestSessionExpired(old, now)).toBe(true);
    expect(isGuestSessionExpired(new Date(now - 1_000).toISOString(), now)).toBe(false);
  });

  it("preserves stronger account progress during guest merge", () => {
    expect(mergeProgressValues({ attempts: 8, completions: 3, bestScore: 5, lastScore: 5 }, { attempts: 2, completions: 1, bestScore: 1, lastScore: 1 })).toEqual({ attempts: 8, completions: 3, bestScore: 5, lastScore: 5 });
  });

  it("accepts stronger guest progress during migration", () => {
    expect(mergeProgressValues({ attempts: 1, completions: 0, bestScore: 1, lastScore: 1 }, { attempts: 4, completions: 2, bestScore: 4, lastScore: 4 })).toEqual({ attempts: 4, completions: 2, bestScore: 4, lastScore: 4 });
  });

  it("is safe for out-of-order and repeated guest syncs", () => {
    const strong = mergeProgressValues(undefined, { attempts: 7, completions: 3, bestScore: 5, lastScore: 5 });
    const stale = mergeProgressValues(strong, { attempts: 2, completions: 1, bestScore: 2, lastScore: 2 });
    const repeated = mergeProgressValues(stale, { attempts: 7, completions: 3, bestScore: 5, lastScore: 5 });
    expect(stale).toEqual(strong);
    expect(repeated).toEqual(strong);
  });

  it("rejects an invalid game id before persistence", async () => {
    const caller = appRouter.createCaller(baseContext({ id: 1, openId: "test", name: null, email: null, loginMethod: "test", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }));
    await expect(caller.learning.save({ gameId: "", attempts: 0, completions: 0, bestScore: 0, lastScore: 0 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
