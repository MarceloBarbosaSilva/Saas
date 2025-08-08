import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function SubscriptionSuccessPage() {
  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h1 className="text-3xl font-bold">Subscription Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for subscribing. Your payment has been processed successfully.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What&apos;s Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You now have access to all premium features. You can manage your 
              subscription at any time from your account settings.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/subscription">Manage Subscription</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}