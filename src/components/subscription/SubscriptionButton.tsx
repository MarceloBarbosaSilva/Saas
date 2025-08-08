'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/trpc';

type SubscriptionButtonProps = {
  priceId: string;
  className?: string;
  children: React.ReactNode;
};

export function SubscriptionButton({ 
  priceId, 
  className, 
  children 
}: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createCheckoutSession = api.stripe.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        router.push(data.url);
      }
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSubscribe = async () => {
    setIsLoading(true);
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    await createCheckoutSession.mutateAsync({
      priceId,
      successUrl: `${baseUrl}/subscription/success`,
      cancelUrl: `${baseUrl}/subscription/cancelled`,
    });
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? 'Loading...' : children}
    </Button>
  );
}