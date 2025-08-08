'use client';

import { api } from '@/lib/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubscriptionButton } from './SubscriptionButton';

export function SubscriptionStatus() {
  const { data: subscriptionStatus, isLoading } = api.stripe.getSubscriptionStatus.useQuery();

  const createPortalSession = api.stripe.createPortalSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.open(data.url, '_blank');
      }
    },
  });

  const handleManageSubscription = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    await createPortalSession.mutateAsync({
      returnUrl: `${baseUrl}/subscription`,
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscriptionStatus) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You don&apos;t have an active subscription.
          </p>
          <SubscriptionButton 
            priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || ''}
          >
            Subscribe Now
          </SubscriptionButton>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-medium">
            Status: {subscriptionStatus.isSubscribed ? 'Active' : 'Inactive'}
          </p>
          {subscriptionStatus.currentPeriodEnd && (
            <p className="text-sm text-muted-foreground">
              {subscriptionStatus.isSubscribed ? 'Renews' : 'Expired'} on:{' '}
              {new Date(subscriptionStatus.currentPeriodEnd).toLocaleDateString()}
            </p>
          )}
        </div>
        
        <Button 
          onClick={handleManageSubscription}
          variant="outline"
          disabled={createPortalSession.isLoading}
        >
          {createPortalSession.isLoading 
            ? 'Loading...' 
            : 'Manage Subscription'
          }
        </Button>
      </CardContent>
    </Card>
  );
}