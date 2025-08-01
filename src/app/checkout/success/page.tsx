import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <h1 className="font-headline text-4xl text-primary">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your trust. Your magical order is being prepared with care.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Next Steps
            </CardTitle>
            <CardDescription>
              Here's what happens next
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold">Email Confirmation</h4>
                <p className="text-sm text-muted-foreground">
                  You will receive a confirmation email with your order details within 30 minutes.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold">Personal Contact</h4>
                <p className="text-sm text-muted-foreground">
                  Our team will contact you within 24 hours to confirm delivery details and answer any questions.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Package className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold">Preparation & Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  Your order will be carefully prepared and delivered according to your chosen payment and delivery method.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <div className="bg-primary/5 p-6 rounded-2xl">
          <h3 className="font-headline text-xl text-primary mb-3">Follow us on Instagram!</h3>
          <p className="text-muted-foreground mb-4">
            Discover our latest creations and share your magical looks with us
          </p>
          <Button asChild variant="outline" className="rounded-full">
            <a href="https://instagram.com/akannesboutique" target="_blank" rel="noopener noreferrer">
              @akannesboutique
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
