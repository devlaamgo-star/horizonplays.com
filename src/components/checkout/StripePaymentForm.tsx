import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Lock, CreditCard } from 'lucide-react';

interface StripePaymentFormProps {
  amount: number;
  currency: string;
  customerInfo: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };
  onPaymentSuccess: (paymentDetails: any) => void;
  onPaymentError: (error: any) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  currency,
  customerInfo,
  onPaymentSuccess,
  onPaymentError,
  isProcessing,
  setIsProcessing
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>('');

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        backgroundColor: 'transparent',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: false,
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError('');

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError('Card element not found');
      setIsProcessing(false);
      return;
    }

    try {
      // Create payment method
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          phone: customerInfo.phone,
        },
      });

      if (paymentError) {
        throw paymentError;
      }

      // In a real application, you would send the payment method to your server
      // to create a payment intent and confirm the payment
      // For demo purposes, we'll simulate a successful payment
      
      // Simulate server call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment success (in production, this would come from your server)
      const mockPaymentIntent = {
        id: 'pi_' + Math.random().toString(36).substring(7),
        status: 'succeeded',
        amount: Math.round(amount * 100), // Stripe uses cents
        currency: currency.toLowerCase(),
        payment_method: paymentMethod.id,
        created: Math.floor(Date.now() / 1000),
      };

      onPaymentSuccess({
        paymentIntent: mockPaymentIntent,
        paymentMethod: paymentMethod,
        provider: 'stripe'
      });

    } catch (err: any) {
      console.error('Stripe payment error:', err);
      setError(err.message || 'An unexpected error occurred');
      onPaymentError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Card Information
        </label>
        <div className="border rounded-lg p-4 bg-background">
          <CardElement options={cardElementOptions} />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      <div className="bg-muted/20 rounded-lg p-4 text-sm">
        <div className="flex items-center text-muted-foreground mb-2">
          <Lock className="w-4 h-4 mr-2" />
          <span>Secured by Stripe</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Your payment information is encrypted and secure. We never store your card details.
        </p>
      </div>

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full btn-hero"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Pay ${amount.toFixed(2)} {currency}
          </>
        )}
      </Button>

      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <CreditCard className="w-3 h-3 mr-1" />
            <span>Visa</span>
          </div>
          <div className="flex items-center">
            <CreditCard className="w-3 h-3 mr-1" />
            <span>Mastercard</span>
          </div>
          <div className="flex items-center">
            <CreditCard className="w-3 h-3 mr-1" />
            <span>Amex</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Test card: 4242 4242 4242 4242 • Any future date • Any CVC
        </p>
      </div>
    </form>
  );
};

export default StripePaymentForm;
