'use client';

import { useCart } from '@/context/cart-context';
import PaymentOptions, { PaymentData } from '@/components/checkout/payment-options';
import { addOrder } from '@/lib/orders';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  // Redirect to shop if cart is empty
  if (cartItems.length === 0) {
    router.push('/shop');
    return null;
  }

  const handlePaymentSubmit = async (paymentData: PaymentData) => {
    try {
      const orderData = {
        customerName: paymentData.customerInfo.name,
        customerEmail: paymentData.customerInfo.email,
        customerAddress: paymentData.customerInfo.address,
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          size: item.selectedSize,
        })),
        total: totalPrice,
        status: 'Pending' as const,
        paymentStatus: paymentData.method === 'hand-by-hand' ? 'Pending' as const : 'Paid' as const,
        paymentMethod: paymentData.method,
        paymentDetails: paymentData.paymentDetails,
      };

      const result = await addOrder(orderData);
      
      if (result.success) {
        clearCart();
        toast({
          title: 'Commande confirmée! ✨',
          description: 'Votre commande a été reçue. Nous vous contacterons bientôt.',
        });
        router.push('/checkout/success');
      } else {
        throw new Error(result.error || 'Failed to create order');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors du traitement de votre commande.',
      });
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <PaymentOptions onPaymentSubmit={handlePaymentSubmit} />
    </div>
  );
}
