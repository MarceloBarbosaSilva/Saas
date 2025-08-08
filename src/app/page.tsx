'use client';

import { useSession } from 'next-auth/react';
import { SignInButton } from '@/components/auth/SignInButton';
import { SubscriptionStatus } from '@/components/subscription/SubscriptionStatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
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
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome to MyApp
            </h1>
            <p className="text-xl text-muted-foreground">
              A modern Next.js application with authentication, subscriptions, and more.
            </p>
          </div>

          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Sign in with your Google account to access all features.
              </p>
              <SignInButton className="w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">
            Welcome back, {session.user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your account and subscription settings below.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">
                  {session.user?.name || 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  {session.user?.email || 'Not provided'}
                </p>
              </div>
            </CardContent>
          </Card>

          <SubscriptionStatus />
        </div>
      </div>
    </div>
  );
}
