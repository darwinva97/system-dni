import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const checkIsAdminOrOwner = (role: string) =>
  role === "admin" || role === "owner";

export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1),
        role: z.enum(["admin", "user"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isAdmin = checkIsAdminOrOwner(ctx.session.user.role);

      if (!isAdmin) return null;

      return ctx.db.user.create({
        data: input,
      });
    }),

  getUserById: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const isAdmin = checkIsAdminOrOwner(ctx.session.user.role);

      if (!isAdmin) return null;

      return ctx.db.user.findUnique({
        where: {
          id: input,
        },
      });
    }),

  editUser: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1),
        role: z.enum(["admin", "user"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isAdmin = checkIsAdminOrOwner(ctx.session.user.role);

      if (!isAdmin) return null;

      return ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const isAdmin = checkIsAdminOrOwner(ctx.session.user.role);

      if (!isAdmin) return null;

      const result = await ctx.db.user.delete({
        where: {
          id: input,
        },
      });
      console.log(result, "result");
      return result;
    }),
});
