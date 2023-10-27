import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { User } from "@prisma/client";

const checkIsOwner = (role: string) => role === "owner";
const checkIsAdmin = (role: string) => role === "admin";

const checkIsAdminOrOwner = (role: string) =>
  role === "admin" || role === "owner";

export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1),
        role: z.enum(["admin", "user", "owner"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isOwner = checkIsOwner(ctx.session.user.role);
      if (isOwner) {
        return ctx.db.user.create({
          data: input,
        });
      }
      const isAdmin = checkIsAdmin(ctx.session.user.role);

      const willBeUser = input.role === "user";
      if (isAdmin && willBeUser)
        return ctx.db.user.create({
          data: input,
        });

      return null;
    }),

  getUserById: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const isAdminOrOwner = checkIsAdminOrOwner(ctx.session.user.role);
      if (isAdminOrOwner) {
        const userData = await ctx.db.user.findUnique({
          where: {
            id: input,
          },
        });
        if (!userData) return null;
        const isAdmin = checkIsAdmin(userData.role);
        const isMatch = ctx.session.user.id === input;

        if (!isMatch && isAdmin) {
          const withoutPassword: Omit<User, "password"> & {
            password?: string;
          } = {
            ...userData,
          };
          delete withoutPassword.password;
          return withoutPassword;
        }
        return userData;
      }
    }),

  editUser: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1),
        role: z.enum(["admin", "user", "owner"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isOwner = checkIsOwner(ctx.session.user.role);

      if (isOwner) {
        return ctx.db.user.update({
          where: {
            id: input.id,
          },
          data: input,
        });
      }

      const isAdmin = checkIsAdmin(ctx.session.user.role);

      if (!isAdmin) return null;
      // el admin no puede asignar dueños
      if (input.role === "owner") return null;

      const isMatch = ctx.session.user.id === input.id;

      if (!isMatch) {
        const userForEdit = await ctx.db.user.findUnique({
          where: {
            id: input.id,
          },
        });
        if (!userForEdit) return null;
        // el admin puede editar usuarios pero no convertirlos en admin
        if (userForEdit.role === "user" && input.role !== "admin") {
          return ctx.db.user.update({
            where: {
              id: input.id,
            },
            data: input,
          });
        }
      }

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

  me: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const isAdmin = checkIsAdminOrOwner(ctx.session.user.role);

    if (!isAdmin) return null;

    const isOwner = checkIsOwner(ctx.session.user.role);

    const isMatch = ctx.session.user.email === input;

    if (!(isOwner || isMatch)) return null;

    return await ctx.db.user.findFirst({
      where: {
        email: input,
      },
    });
  }),

  changePasswordWithOld: protectedProcedure
    .input(
      z.object({
        email: z.string().min(1),
        oldPassword: z.string().min(1),
        newPassword: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isMatch = ctx.session.user.email === input.email;
      const isOwner = checkIsOwner(ctx.session.user.role);

      if (!(isMatch || isOwner)) return null;

      return await ctx.db.user.update({
        where: {
          email: input.email,
          password: input.oldPassword,
        },
        data: {
          password: input.newPassword,
        },
      });
    }),

  changePassword: protectedProcedure
    .input(
      z.object({
        email: z.string().min(1),
        newPassword: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isMatch = ctx.session.user.email === input.email;
      const isOwner = checkIsOwner(ctx.session.user.role);

      if (!(isMatch || isOwner)) return null;

      return await ctx.db.user.update({
        where: {
          email: input.email,
        },
        data: {
          password: input.newPassword,
        },
      });
    }),
});
