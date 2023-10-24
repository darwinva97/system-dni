import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const checkIsAdminOrOwner = (role: string) =>
  role === "admin" || role === "owner";

export const dniRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        document: z.number(),
        photoFace: z.string(),
        photoSignature: z.string(),
        name: z.string(),
        surname: z.string(),
        sex: z.string(),
        nationality: z.string(),
        exemplar: z.string(),
        birthDate: z.string(),
        issueDate: z.string(),
        expiryDate: z.string(),
        tramitNumber: z.number(),
        codePDF417: z.string(),
        donor: z.string(),

        address: z.string(),
        birthPlace: z.string(),
        cuil: z.string(),
        interiorMinisterName: z.string(),
        photoInteriorMinisterSignature: z.string(),
        photoFingerPrint: z.string(),
        mechanicalReadingArea: z.string(),

        photoBgFront: z.string(),
        photoBgBack: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.dni.create({
        data: input,
      });
    }),

  getDniById: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.dni.findUnique({
        where: {
          document: input,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.dni.findMany();
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
      console.log(result, "result");
      return result;
    }),
});
