import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Lock } from 'lucide-react';

interface PayPalPaymentButtonProps {
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

const PayPalPaymentButton: React.FC<PayPalPaymentButtonProps> = ({
  amount,
  currency,
  customerInfo,
  onPaymentSuccess,
  onPaymentError,
  isProcessing,
  setIsProcessing
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-muted/20 rounded-lg p-4 text-sm">
        <div className="flex items-center text-muted-foreground mb-2">
          <Lock className="w-4 h-4 mr-2" />
          <span>Secured by PayPal</span>
        </div>
        <p className="text-xs text-muted-foreground">
          You'll be redirected to PayPal to complete your payment securely.
        </p>
      </div>

      <PayPalButtons
        style={{
          color: 'blue',
          shape: 'rect',
          label: 'pay',
          height: 50,
        }}
        disabled={isProcessing}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2),
                  currency_code: currency,
                },
                description: 'Horizon Plays Subscription',
                custom_id: `HZP-${Date.now()}`,
              },
            ],
            payer: {
              name: {
                given_name: customerInfo.firstName,
                surname: customerInfo.lastName,
              },
              email_address: customerInfo.email,
              phone: customerInfo.phone ? {
                phone_type: 'MOBILE',
                phone_number: {
                  country_code: '1',
                  national_number: customerInfo.phone.replace(/\D/g, ''),
                },
              } : undefined,
            },
          });
        }}
        onApprove={async (data, actions) => {
          try {
            setIsProcessing(true);
            
            if (!actions.order) {
              throw new Error('PayPal order actions not available');
            }

            const details = await actions.order.capture();
            
            onPaymentSuccess({
              orderID: data.orderID,
              payerID: data.payerID,
              paymentID: data.paymentID,
              details: details,
              provider: 'paypal'
            });
          } catch (error) {
            console.error('PayPal payment error:', error);
            onPaymentError(error);
          } finally {
            setIsProcessing(false);
          }
        }}
        onError={(err) => {
          console.error('PayPal error:', err);
          onPaymentError(err);
        }}
        onCancel={(data) => {
          console.log('PayPal payment cancelled:', data);
          onPaymentError(new Error('Payment was cancelled by user'));
        }}
      />

      <div className="text-center text-xs text-muted-foreground">
        <p>Test PayPal Account:</p>
        <p>Email: sb-buyer@business.example.com</p>
        <p>Password: testbuyer123</p>
      </div>
    </div>
  );
};

export default PayPalPaymentButton;
