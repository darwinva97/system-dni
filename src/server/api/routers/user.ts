import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  checkIsAdmin,
  checkIsAdminOrOwner,
  checkIsOwner,
} from "@/utils/checks";

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

  adminGetUserById: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const isAdminOrOwner = checkIsAdminOrOwner(ctx.session.user.role);
      const isOwner = checkIsOwner(ctx.session.user.role);

      if (isOwner) {
        return ctx.db.user.findUnique({
          where: {
            id: input,
          },
          include: {
            dnis: {
              include: {
                dni: true,
              },
            },
          },
        });
      }

      if (isAdminOrOwner) {
        const userData = await ctx.db.user.findUnique({
          where: {
            id: input,
          },
          include: {
            dnis: {
              include: {
                dni: true,
              },
            },
          },
        });
        if (!userData) return null;
        const isAdmin = checkIsAdmin(userData.role);
        const isMatch = ctx.session.user.id === input;

        if (!isMatch && isAdmin) {
          const withoutPassword: Omit<typeof userData, "password"> & {
            password?: string;
          } = {
            ...userData,
          };
          delete withoutPassword.password;
          return withoutPassword;
        }
        return userData;
      }

      return null;
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

  editUserWithDnis: protectedProcedure
    .input(
      z.object({
        user: z.object({
          id: z.number(),
          name: z.string().min(1),
          email: z.string().min(1),
          password: z.string().min(1),
          role: z.enum(["admin", "user", "owner"]),
        }),
        dnis: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isAdminOrOwner = checkIsAdminOrOwner(ctx.session.user.role);

      if (!isAdminOrOwner) return null;

      const userUpdated = await ctx.db.user.update({
        where: {
          id: input.user.id,
        },
        data: input.user,
      });

      if (!userUpdated) return null;

      console.log(input, "input");

      const { count } = await ctx.db.dniOnUsers.deleteMany({
        where: {
          userId: input.user.id,
        },
      });

      console.log(count, "count");

      for (const dniId of input.dnis) {
        await ctx.db.dniOnUsers.create({
          data: {
            userId: input.user.id,
            dniId,
          },
        });
      }

      console.log(input.dnis, "dnis");

      return await ctx.db.user.update({
        where: {
          id: input.user.id,
        },
        data: input.user,
        include: {
          dnis: {
            include: {
              dni: true,
            },
          },
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
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
      return result;
    }),

  me: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.email) return null;
    return await ctx.db.user.findFirst({
      where: {
        email: ctx.session.user.email,
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
