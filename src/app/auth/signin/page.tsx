'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { SignInButton } from '@/components/auth/SignInButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignInPage() {
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

  if (session) {
    redirect('/');
  }

  return (
    <div className="container py-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-muted-foreground">
            Sign in to your account to access all features.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Use your Google account to sign in securely.
            </p>
            <SignInButton className="w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}