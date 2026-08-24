import { describe, expect, it, vi } from "vitest";

const { sendAuthenticationCode } = vi.hoisted(() => ({ sendAuthenticationCode: vi.fn().mockResolvedValue(undefined) }));
vi.mock("./mail", () => ({ sendAuthenticationCode }));

import { appRouter } from "./routers";

const createContext = () => ({
  req: { cookies: {} } as never,
  res: { cookie: vi.fn(), clearCookie: vi.fn() } as never,
  user: null,
});

describe("auth email-code procedure", () => {
  it("calls the provider adapter without returning the code", async () => {
    const context = createContext();
    const caller = appRouter.createCaller(context);
    const result = await caller.auth.requestEmailCode({ email: "learner@example.com" });

    expect(result).toEqual({ success: true, expiresInMinutes: 10 });
    expect(result).not.toHaveProperty("code");
    expect(sendAuthenticationCode).toHaveBeenCalledWith({
      to: "learner@example.com",
      code: expect.stringMatching(/^\d{6}$/),
      expiresInMinutes: 10,
    });
    expect((context.res as { cookie: ReturnType<typeof vi.fn> }).cookie).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining({ httpOnly: true }),
    );
  });

  it("throttles repeated requests for the same email", async () => {
    const caller = appRouter.createCaller(createContext());
    await caller.auth.requestEmailCode({ email: "privacy@example.com" });
    await expect(caller.auth.requestEmailCode({ email: "privacy@example.com" })).rejects.toMatchObject({ code: "TOO_MANY_REQUESTS" });
  });

  it("rejects malformed codes before verification", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.auth.verifyEmailCode({ email: "learner@example.com", code: "123" })).rejects.toThrow();
  });
});
