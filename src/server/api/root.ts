import { createTRPCRouter } from './trpc';
import { userRouter } from './routers/user';
import { stripeRouter } from './routers/stripe';

export const appRouter = createTRPCRouter({
  user: userRouter,
  stripe: stripeRouter,
});

export type AppRouter = typeof appRouter;