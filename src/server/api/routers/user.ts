import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
        stripePriceId: true,
        stripeCurrentPeriodEnd: true,
      },
    });
  }),

  updateUserStripeCustomerId: protectedProcedure
    .input(
      z.object({
        stripeCustomerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          stripeCustomerId: input.stripeCustomerId,
        },
      });
    }),

  updateUserSubscription: protectedProcedure
    .input(
      z.object({
        stripeSubscriptionId: z.string().optional(),
        stripePriceId: z.string().optional(),
        stripeCurrentPeriodEnd: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          stripeSubscriptionId: input.stripeSubscriptionId,
          stripePriceId: input.stripePriceId,
          stripeCurrentPeriodEnd: input.stripeCurrentPeriodEnd,
        },
      });
    }),
});