'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { SubscriptionStatus } from '@/components/subscription/SubscriptionStatus';
import { SubscriptionButton } from '@/components/subscription/SubscriptionButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SubscriptionPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/');
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing settings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SubscriptionStatus />

          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold">Premium Plan</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Access to all premium features and priority support.
                </p>
                <SubscriptionButton 
                  priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || ''}
                  className="w-full"
                >
                  Subscribe to Premium
                </SubscriptionButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}