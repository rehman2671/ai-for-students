import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { deleteLearningProgressForUser, deleteUserAccount, getLearningProgressForUser, mergeGuestProgressForUser, saveLearningProgress } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { sendAuthenticationCode } from "./mail";
import { canRequestEmailCode, createEmailCodeChallenge, verifyEmailCode, AUTH_EMAIL_CODE_COOKIE } from "./authEmail";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    requestEmailCode: publicProcedure.input(z.object({ email: z.string().email().max(320) })).mutation(async ({ ctx, input }) => {
      if (!canRequestEmailCode(input.email)) throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Please wait before requesting another code" });
      const challenge = createEmailCodeChallenge(input.email, ctx.res);
      await sendAuthenticationCode({ to: input.email, code: challenge.code, expiresInMinutes: challenge.expiresInMinutes });
      return { success: true as const, expiresInMinutes: challenge.expiresInMinutes };
    }),
    verifyEmailCode: publicProcedure.input(z.object({ email: z.string().email().max(320), code: z.string().regex(/^\\d{6}$/) })).mutation(({ ctx, input }) => ({ success: verifyEmailCode(input.email, input.code, ctx.req.cookies?.[AUTH_EMAIL_CODE_COOKIE]) })),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, cookieOptions);
      return {
        success: true,
      } as const;
    }),
  }),
  learning: router({
    list: protectedProcedure.query(({ ctx }) => getLearningProgressForUser(ctx.user.id)),
    save: protectedProcedure.input(z.object({
      gameId: z.string().min(1).max(64), attempts: z.number().int().min(0), completions: z.number().int().min(0), bestScore: z.number().int().min(0), lastScore: z.number().int().min(0), lastPlayedAt: z.date().nullable().optional(),
    })).mutation(({ ctx, input }) => saveLearningProgress({ userId: ctx.user.id, ...input })),
    syncGuest: protectedProcedure.input(z.object({
      rows: z.array(z.object({ gameId: z.string().min(1).max(64), attempts: z.number().int().min(0), completions: z.number().int().min(0), bestScore: z.number().int().min(0), lastScore: z.number().int().min(0) })).max(10),
    })).mutation(async ({ ctx, input }) => { for (const row of input.rows) await mergeGuestProgressForUser(ctx.user.id, row); return { success: true as const }; }),
    reset: protectedProcedure.mutation(({ ctx }) => deleteLearningProgressForUser(ctx.user.id).then(() => ({ success: true as const }))),
    export: protectedProcedure.query(async ({ ctx }) => ({ user: { name: ctx.user.name, email: ctx.user.email }, progress: await getLearningProgressForUser(ctx.user.id) })),
    deleteAccount: protectedProcedure.mutation(async ({ ctx }) => { await deleteUserAccount(ctx.user.id); return { success: true as const }; }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
