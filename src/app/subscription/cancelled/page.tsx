import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function SubscriptionCancelledPage() {
  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <XCircle className="h-16 w-16 text-red-500 mx-auto" />
          <h1 className="text-3xl font-bold">Subscription Cancelled</h1>
          <p className="text-muted-foreground">
            Your subscription process was cancelled. No payment has been charged.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Try Again?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You can try subscribing again at any time. If you encountered any 
              issues, please contact our support team.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/subscription">Try Again</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}