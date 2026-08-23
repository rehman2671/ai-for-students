import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { deleteLearningProgressForUser, deleteUserAccount, getLearningProgressForUser, mergeGuestProgressForUser, saveLearningProgress } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
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
