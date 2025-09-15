import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  AlertCircle, 
  RefreshCw, 
  Mail, 
  Phone,
  MessageCircle,
  Home,
  ArrowLeft,
  CreditCard
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

interface ErrorData {
  error: string;
  orderId: string;
  timestamp: string;
}

const CheckoutError = () => {
  const navigate = useNavigate();
  const [errorData, setErrorData] = useState<ErrorData | null>(null);

  useEffect(() => {
    const storedError = sessionStorage.getItem('paymentError');
    if (storedError) {
      try {
        const parsedError = JSON.parse(storedError);
        setErrorData(parsedError);
        sessionStorage.removeItem('paymentError');
      } catch (error) {
        console.error('Error parsing error data:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!errorData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const errorDate = new Date(errorData.timestamp);
  const formattedDate = errorDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Payment Error - Transaction Failed"
        description="There was an issue processing your payment. Please try again or contact our support team for assistance."
        keywords="payment error, transaction failed, checkout error, support help"
        canonical="/checkout-error"
      />
      <Header />
      
      <div className="bg-gradient-to-br from-red-50 via-background to-orange-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-red-600">Payment Failed</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We encountered an issue while processing your payment. Don't worry - no charges have been made to your account.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 border-red-200">
              <div className="flex items-center mb-6">
                <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                <h2 className="text-2xl font-bold">What Happened?</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Error Details</h3>
                  <p className="text-red-700 text-sm mb-3">{errorData.error}</p>
                  <div className="space-y-1 text-xs text-red-600">
                    <div className="flex justify-between">
                      <span>Error ID:</span>
                      <span className="font-mono">{errorData.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Common Reasons for Payment Failure</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Insufficient funds in your account</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Card expired or invalid card details</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Bank declined the transaction</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Network or connectivity issues</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>PayPal account issues (if using PayPal)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center mb-6">
                <RefreshCw className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Next Steps</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Check Your Payment Method</h3>
                      <p className="text-sm text-muted-foreground">
                        Verify your card details, expiry date, and ensure sufficient funds.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Try Again</h3>
                      <p className="text-sm text-muted-foreground">
                        Return to checkout and attempt the payment again with the same or different payment method.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Contact Support</h3>
                      <p className="text-sm text-muted-foreground">
                        If the problem persists, our support team is here to help you complete your purchase.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full btn-hero" asChild>
                    <Link to="/checkout">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Try Payment Again
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/#pricing">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Pricing
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="w-6 h-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Need Help?</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Our support team is available to help resolve payment issues and complete your purchase.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground mr-3" />
                  <a href="mailto:director@horizonplays.com" className="text-primary hover:underline">
                    director@horizonplays.com
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground mr-3" />
                  <span>+44 753 716 7050</span>
                </div>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Home className="w-6 h-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Alternative Options</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                While we resolve the payment issue, you can explore other ways to get started with Horizon Plays.
              </p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/">Return to Homepage</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/signup">Create Free Account</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact">Request Demo</Link>
                </Button>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              We apologize for the inconvenience and appreciate your patience.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="btn-hero px-8" asChild>
                <Link to="/checkout">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Link>
              </Button>
              <Button variant="outline" px-8 asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CheckoutError;
