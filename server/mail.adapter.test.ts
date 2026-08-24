import { afterEach, describe, expect, it, vi } from "vitest";
import { resetHostingerMailboxCacheForTests, sendAuthenticationCode } from "./mail";

describe("Hostinger mail adapter", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    resetHostingerMailboxCacheForTests();
  });

  it("discovers the configured sender mailbox and maps an auth-code message", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: { mailboxes: [{ resourceId: "AC-test", address: "auth@aiforstudents.in" }] } }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: { id: "msg-test" } }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await sendAuthenticationCode({ to: "learner@example.com", code: "123456", expiresInMinutes: 10 });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toBe("https://api.mail.hostinger.com/api/v1/me");
    expect(fetchMock.mock.calls[1][0]).toBe("https://api.mail.hostinger.com/api/v1/mailboxes/AC-test/send");
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual({
      to: ["learner@example.com"],
      subject: "Your AI for Students verification code",
      text: expect.stringContaining("123456"),
    });
  });
});
