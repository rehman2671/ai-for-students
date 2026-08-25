import { describe, expect, it, vi } from "vitest";

const { sendContactMessage } = vi.hoisted(() => ({ sendContactMessage: vi.fn().mockResolvedValue(undefined) }));
vi.mock("./mail", () => ({ sendAuthenticationCode: vi.fn(), sendContactMessage }));

import { appRouter } from "./routers";

const caller = appRouter.createCaller({
  req: { cookies: {}, protocol: "https", headers: {} } as never,
  res: { cookie: vi.fn(), clearCookie: vi.fn() } as never,
  user: null,
});

describe("contact submission", () => {
  it("delivers a bounded message through the server mail adapter", async () => {
    await expect(caller.contact.submit({ name: "A Learner", replyEmail: "learner@example.com", subject: "Question", message: "How can I start?" })).resolves.toEqual({ success: true });
    expect(sendContactMessage).toHaveBeenCalledWith({ name: "A Learner", replyEmail: "learner@example.com", subject: "Question", message: "How can I start?" });
  });

  it("rejects oversized or malformed values before delivery", async () => {
    await expect(caller.contact.submit({ name: "", replyEmail: "bad", subject: "Question", message: "Hi" })).rejects.toThrow();
    expect(sendContactMessage).toHaveBeenCalledTimes(1);
  });

  it("does not expose provider errors", async () => {
    sendContactMessage.mockRejectedValueOnce(new Error("provider details"));
    await expect(caller.contact.submit({ name: "A Learner", replyEmail: "learner@example.com", subject: "Question", message: "Please help." })).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE", message: "Contact delivery is temporarily unavailable" });
  });
});
