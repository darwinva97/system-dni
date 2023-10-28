import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { checkIsAdminOrOwner, checkIsUser } from "@/utils/checks";

const onlyDniSchema = z.object({
  document: z.number(),
  photoFace: z.string(),
  photoSignature: z.string(),
  name: z.string(),
  surname: z.string(),
  sex: z.string(),
  nationality: z.string(),
  exemplar: z.string(),
  birthDate: z.date(),
  issueDate: z.date(),
  expiryDate: z.date(),
  tramitNumber: z.string(),
  codePDF417: z.string(),
  donor: z.string(),
  officeNumber: z.string(),

  address: z.string(),
  birthPlace: z.string(),
  cuil: z.string(),
  interiorMinisterName: z.string(),
  photoInteriorMinisterSignature: z.string(),
  photoFingerPrint: z.string(),
  mechanicalReadingArea: z.string(),

  photoBgFront: z.string(),
  photoBgBack: z.string(),
});

const dniSchema = z.object({
  dni: onlyDniSchema,
  users: z.array(z.number()),
});

export const dniRouter = createTRPCRouter({
  create: protectedProcedure
    .input(dniSchema)
    .mutation(async ({ ctx, input }) => {
      const newDni = await ctx.db.dni.create({
        data: {
          ...input.dni,
          users: {
            create: input.users.map((userId) => ({
              userId,
            })),
          },
        },
        include: {
          users: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  role: true,
                  email: true,
                },
              },
            },
          },
        },
      });
      return newDni;
    }),

  edit: protectedProcedure
    .input(
      dniSchema.extend({
        prevDocument: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { dni: data, prevDocument, users: nextUserIds } = input;
      const dniUpdated = await ctx.db.dni.update({
        data,
        where: {
          document: prevDocument,
        },
        include: {
          users: {
            include: {
              user: true,
            },
          },
        },
      });
      const currentUserIds = dniUpdated.users.map((user) => user.user.id);
      const usersToRemove = currentUserIds.filter(
        (id) => !nextUserIds.includes(id),
      );
      const usersToAdd = nextUserIds.filter(
        (id) => !currentUserIds.includes(id),
      );

      for (const userId of usersToRemove) {
        await ctx.db.dniOnUsers.delete({
          where: {
            userId_dniId: {
              userId,
              dniId: prevDocument,
            },
          },
        });
      }

      for (const userId of usersToAdd) {
        await ctx.db.dniOnUsers.create({
          data: {
            userId,
            dniId: prevDocument,
          },
        });
      }

      return await ctx.db.dni.findFirst({
        where: {
          document: prevDocument,
        },
        include: {
          users: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  role: true,
                  email: true,
                },
              },
            },
          },
        },
      });
    }),

  userEDitDni: protectedProcedure
    .input(
      z.object({
        dni: onlyDniSchema,
        prevDocument: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isUser = checkIsUser(ctx.session.user.role);

      if (!isUser) return null;

      const dniUpdated = await ctx.db.dni.update({
        where: {
          document: input.prevDocument,
          users: {
            some: {
              userId: ctx.session.user.id,
            },
          },
        },
        data: {
          ...input.dni,
        },
      });

      return dniUpdated;
    }),

  getDniById: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.dni.findUnique({
        where: {
          document: input,
        },
        include: {
          users: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  role: true,
                  email: true,
                },
              },
            },
          },
        }
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    const isAdminOrOwner = checkIsAdminOrOwner(ctx.session.user.role);
    if (isAdminOrOwner) {
      return ctx.db.dni.findMany();
    }
    return ctx.db.dni.findMany({
      where: {
        users: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
    });
  }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const isAdmin = checkIsAdminOrOwner(ctx.session.user.role);

      if (!isAdmin) return null;

      const result = await ctx.db.dni.delete({
        where: {
          document: input,
        },
      });
      return result;
    }),
});
