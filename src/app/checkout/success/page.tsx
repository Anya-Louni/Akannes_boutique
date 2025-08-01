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
          <h1 className="font-headline text-4xl text-primary">Commande confirmée!</h1>
          <p className="text-lg text-muted-foreground">
            Merci pour votre confiance. Votre commande magique est en cours de préparation.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Prochaines étapes
            </CardTitle>
            <CardDescription>
              Voici ce qui va se passer maintenant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold">Confirmation par email</h4>
                <p className="text-sm text-muted-foreground">
                  Vous recevrez un email de confirmation avec les détails de votre commande.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold">Contact personnel</h4>
                <p className="text-sm text-muted-foreground">
                  Notre équipe vous contactera dans les 24h pour organiser la livraison.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Package className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold">Préparation et livraison</h4>
                <p className="text-sm text-muted-foreground">
                  Votre commande sera préparée avec soin et livrée selon le mode de paiement choisi.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/shop">Continuer vos achats</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>

        <div className="bg-primary/5 p-6 rounded-2xl">
          <h3 className="font-headline text-xl text-primary mb-3">Suivez-nous sur Instagram!</h3>
          <p className="text-muted-foreground mb-4">
            Découvrez nos dernières créations et partagez vos looks magiques
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
