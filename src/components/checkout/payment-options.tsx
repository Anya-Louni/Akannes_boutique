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
    name: 'CCP (Postal Checking Account)',
    description: 'Payment via CCP Algeria - Secure postal banking',
    icon: <CreditCard className="h-6 w-6" />,
    fields: [
      { key: 'ccpNumber', label: 'CCP Account Number', placeholder: '1234567890' },
      { key: 'ccpKey', label: 'CCP Key', placeholder: '12' },
      { key: 'ccpHolderName', label: 'Account Holder Name', placeholder: 'Full name as on account' },
    ],
    instructions: 'Please transfer the total amount to our CCP account. Include your order number in the transfer reference.'
  },
  {
    id: 'baridimob' as PaymentMethod,
    name: 'BaridiMob',
    description: 'Mobile payment via BaridiMob app - Quick & secure',
    icon: <Smartphone className="h-6 w-6" />,
    fields: [
      { key: 'phoneNumber', label: 'Phone Number', placeholder: '0555123456' },
      { key: 'baridimobPin', label: 'BaridiMob PIN', placeholder: '****', type: 'password' },
    ],
    instructions: 'Payment will be processed through BaridiMob. Please ensure your account has sufficient balance.'
  },
  {
    id: 'hand-by-hand' as PaymentMethod,
    name: 'Cash on Delivery',
    description: 'Pay when you receive your order - Most popular option',
    icon: <HandHeart className="h-6 w-6" />,
    fields: [
      { key: 'meetingLocation', label: 'Preferred Meeting Location', placeholder: 'City center, Algiers' },
      { key: 'preferredTime', label: 'Preferred Delivery Time', placeholder: 'Weekend afternoons' },
      { key: 'additionalNotes', label: 'Special Instructions (Optional)', placeholder: 'Any specific delivery instructions' },
    ],
    instructions: 'We will contact you within 24 hours to arrange delivery. Payment is made when you receive your items.'
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
        title: 'Missing Information',
        description: 'Please fill in all required personal information fields.',
      });
      setIsSubmitting(false);
      return;
    }

    // Validate payment details based on method
    const currentMethod = paymentMethods.find(m => m.id === selectedMethod);
    const requiredFields = currentMethod?.fields.filter(field => !field.key.includes('additional') && !field.key.includes('Optional'));
    const missingFields = requiredFields?.filter(field => !paymentDetails[field.key]);
    
    if (missingFields && missingFields.length > 0) {
      toast({
        variant: 'destructive',
        title: 'Missing Payment Details',
        description: `Please fill in: ${missingFields.map(f => f.label).join(', ')}`,
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
        title: 'Order Confirmed! ✨',
        description: 'Your order has been received. We will contact you soon to confirm details.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Order Error',
        description: 'An error occurred while processing your order. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedMethodData = paymentMethods.find(m => m.id === selectedMethod);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Complete Your Order</CardTitle>
          <CardDescription className="text-lg">
            Order Total: <span className="font-bold text-xl text-primary">{totalPrice.toLocaleString()} DZD</span> • {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Order Summary</h3>
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      {item.selectedSize && <span className="text-sm text-gray-600 ml-2">Size: {item.selectedSize}</span>}
                      <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                    </div>
                    <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} DZD</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    placeholder="0555123456"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    placeholder="Your complete address including wilaya (province) and postal code"
                    required
                    className="min-h-[80px]"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Please include: Street address, city, wilaya, and postal code for accurate delivery
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </h3>
              <RadioGroup value={selectedMethod} onValueChange={(value) => setSelectedMethod(value as PaymentMethod)}>
                {paymentMethods.map((method) => (
                  <div key={method.id} className="space-y-3">
                    <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary/50 transition-colors">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="text-primary">{method.icon}</div>
                        <div className="flex-1">
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
                <h4 className="font-semibold text-lg">Payment Details - {selectedMethodData.name}</h4>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 font-medium">Instructions:</p>
                  <p className="text-sm text-blue-700 mt-1">{selectedMethodData.instructions}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedMethodData.fields.map((field) => {
                    const isOptional = field.label.includes('Optional') || field.key.includes('additional');
                    return (
                      <div key={field.key} className={field.key.includes('additionalNotes') ? 'md:col-span-2' : ''}>
                        <Label htmlFor={field.key}>
                          {field.label} {!isOptional && '*'}
                        </Label>
                        {field.key.includes('additionalNotes') ? (
                          <Textarea
                            id={field.key}
                            value={paymentDetails[field.key] || ''}
                            onChange={(e) => setPaymentDetails({
                              ...paymentDetails,
                              [field.key]: e.target.value
                            })}
                            placeholder={field.placeholder}
                            required={!isOptional}
                            className="min-h-[60px]"
                          />
                        ) : (
                          <Input
                            id={field.key}
                            type={field.type || 'text'}
                            value={paymentDetails[field.key] || ''}
                            onChange={(e) => setPaymentDetails({
                              ...paymentDetails,
                              [field.key]: e.target.value
                            })}
                            placeholder={field.placeholder}
                            required={!isOptional}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <Separator />

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <h4 className="font-semibold">Important Information</h4>
              <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                  <div>
                    <strong>Delivery:</strong> We deliver throughout Algeria. Delivery time is 2-7 business days depending on your location.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-primary" />
                  <div>
                    <strong>Contact:</strong> We will call you within 24 hours to confirm your order and delivery details.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <HandHeart className="h-4 w-4 mt-0.5 text-primary" />
                  <div>
                    <strong>Returns:</strong> 7-day return policy for unworn items in original condition.
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Processing Order...'
              ) : (
                `Confirm Order - ${totalPrice.toLocaleString()} DZD`
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
