'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

type SignInButtonProps = {
  className?: string;
};

export function SignInButton({ className }: SignInButtonProps) {
  const handleSignIn = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <Button 
      onClick={handleSignIn} 
      className={className}
      variant="outline"
    >
      Sign in with Google
    </Button>
  );
}