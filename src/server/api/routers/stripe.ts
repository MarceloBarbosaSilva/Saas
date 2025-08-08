import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import {
  createStripeCustomer,
  createStripeCustomerSubscriptionPaymentCheckout,
  createStripeCustomerPortalSession,
} from '@/lib/stripe-utils';

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        priceId: z.string(),
        successUrl: z.string(),
        cancelUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      let customerId = user.stripeCustomerId;

      if (!customerId) {
        customerId = await createStripeCustomer(
          user.email!,
          user.name || undefined
        );

        await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            stripeCustomerId: customerId,
          },
        });
      }

      const session = await createStripeCustomerSubscriptionPaymentCheckout(
        customerId,
        input.priceId,
        input.successUrl,
        input.cancelUrl
      );

      return {
        url: session.url,
      };
    }),

  createPortalSession: protectedProcedure
    .input(
      z.object({
        returnUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user?.stripeCustomerId) {
        throw new Error('User does not have a Stripe customer ID');
      }

      const portalSession = await createStripeCustomerPortalSession(
        user.stripeCustomerId,
        input.returnUrl
      );

      return {
        url: portalSession.url,
      };
    }),

  getSubscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        stripeSubscriptionId: true,
        stripePriceId: true,
        stripeCurrentPeriodEnd: true,
      },
    });

    if (!user) {
      return null;
    }

    const isSubscribed =
      user.stripeSubscriptionId &&
      user.stripeCurrentPeriodEnd &&
      user.stripeCurrentPeriodEnd > new Date();

    return {
      isSubscribed: Boolean(isSubscribed),
      subscriptionId: user.stripeSubscriptionId,
      priceId: user.stripePriceId,
      currentPeriodEnd: user.stripeCurrentPeriodEnd,
    };
  }),
});