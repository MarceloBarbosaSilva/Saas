import { stripe } from './stripe';
import { prisma } from './prisma';

export async function createStripeCustomer(
  email: string,
  name?: string
): Promise<string> {
  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
  });

  return customer.id;
}

export async function createStripeCustomerSubscriptionPaymentCheckout(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  });

  return session;
}

export async function createStripeCustomerPortalSession(
  customerId: string,
  returnUrl: string
) {
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return portalSession;
}

export async function handleStripeSubscriptionWebhook(
  event: any
): Promise<void> {
  const subscription = event.data.object;

  await prisma.user.update({
    where: {
      stripeCustomerId: subscription.customer,
    },
    data: {
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items?.data?.[0]?.price?.id || null,
      stripeCurrentPeriodEnd: subscription.current_period_end 
        ? new Date(subscription.current_period_end * 1000)
        : null,
    },
  });
}