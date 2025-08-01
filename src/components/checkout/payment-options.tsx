'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Smartphone, HandHeart, MapPin, User, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/cart-context';

export type PaymentMethod = 'ccp' | 'baridimob' | 'hand-by-hand';

interface PaymentOptionsProps {
  onPaymentSubmit: (paymentData: PaymentData) => void;
}

export interface PaymentData {
  method: PaymentMethod;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  paymentDetails: Record<string, string>;
}

const paymentMethods = [
  {
    id: 'ccp' as PaymentMethod,
    name: 'CCP (Compte Chèques Postaux)',
    description: 'Paiement via CCP Algérie',
    icon: <CreditCard className="h-6 w-6" />,
    fields: [
      { key: 'ccpNumber', label: 'Numéro CCP', placeholder: '1234567890' },
      { key: 'ccpKey', label: 'Clé CCP', placeholder: '12' },
    ]
  },
  {
    id: 'baridimob' as PaymentMethod,
    name: 'BaridiMob',
    description: 'Paiement mobile via BaridiMob',
    icon: <Smartphone className="h-6 w-6" />,
    fields: [
      { key: 'phoneNumber', label: 'Numéro de téléphone', placeholder: '0555123456' },
      { key: 'baridimobPin', label: 'Code PIN BaridiMob', placeholder: '****', type: 'password' },
    ]
  },
  {
    id: 'hand-by-hand' as PaymentMethod,
    name: 'Remise en main propre',
    description: 'Paiement lors de la livraison',
    icon: <HandHeart className="h-6 w-6" />,
    fields: [
      { key: 'meetingLocation', label: 'Lieu de rencontre préféré', placeholder: 'Centre-ville, Alger' },
      { key: 'preferredTime', label: 'Horaire préféré', placeholder: 'Week-end après-midi' },
    ]
  }
];

export default function PaymentOptions({ onPaymentSubmit }: PaymentOptionsProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('ccp');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [paymentDetails, setPaymentDetails] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const { totalPrice, cartItems } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate customer info
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      toast({
        variant: 'destructive',
        title: 'Informations manquantes',
        description: 'Veuillez remplir toutes les informations personnelles.',
      });
      setIsSubmitting(false);
      return;
    }

    // Validate payment details based on method
    const currentMethod = paymentMethods.find(m => m.id === selectedMethod);
    const missingFields = currentMethod?.fields.filter(field => !paymentDetails[field.key]);
    
    if (missingFields && missingFields.length > 0) {
      toast({
        variant: 'destructive',
        title: 'Détails de paiement manquants',
        description: `Veuillez remplir: ${missingFields.map(f => f.label).join(', ')}`,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const paymentData: PaymentData = {
        method: selectedMethod,
        customerInfo,
        paymentDetails,
      };

      await onPaymentSubmit(paymentData);
      
      toast({
        title: 'Commande confirmée! ✨',
        description: 'Votre commande a été reçue. Nous vous contacterons bientôt.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors du traitement de votre commande.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedMethodData = paymentMethods.find(m => m.id === selectedMethod);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">Finaliser votre commande</CardTitle>
          <CardDescription>
            Total: <span className="font-bold text-lg text-primary">{totalPrice.toLocaleString()} DZD</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    placeholder="0555123456"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Adresse complète *</Label>
                  <Textarea
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    placeholder="Votre adresse complète avec wilaya"
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Mode de paiement</h3>
              <RadioGroup value={selectedMethod} onValueChange={(value) => setSelectedMethod(value as PaymentMethod)}>
                {paymentMethods.map((method) => (
                  <div key={method.id} className="space-y-3">
                    <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary/50 transition-colors">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="text-primary">{method.icon}</div>
                        <div>
                          <div className="font-semibold">{method.name}</div>
                          <div className="text-sm text-muted-foreground">{method.description}</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Payment Details */}
            {selectedMethodData && (
              <div className="space-y-4">
                <h4 className="font-semibold">Détails du paiement - {selectedMethodData.name}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedMethodData.fields.map((field) => (
                    <div key={field.key}>
                      <Label htmlFor={field.key}>{field.label} *</Label>
                      <Input
                        id={field.key}
                        type={field.type || 'text'}
                        value={paymentDetails[field.key] || ''}
                        onChange={(e) => setPaymentDetails({
                          ...paymentDetails,
                          [field.key]: e.target.value
                        })}
                        placeholder={field.placeholder}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Traitement en cours...' : `Confirmer la commande - ${totalPrice.toLocaleString()} DZD`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
