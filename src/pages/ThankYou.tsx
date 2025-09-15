import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  CheckCircle, 
  Clock, 
  Mail, 
  Shield,
  Phone,
  MessageCircle,
  Home
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useCurrency } from "@/contexts/CurrencyContext";

interface OrderData {
  orderId: string;
  plan: {
    name: string;
    usdPrice: number;
    period: string;
    description: string;
  };
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  payment: {
    method: string;
    amount: number;
  };
  total: number;
  discount: number;
  coupon: string | null;
  timestamp: string;
}

const ThankYou = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const storedOrder = sessionStorage.getItem('completedOrder');
    if (storedOrder) {
      try {
        const parsedOrder = JSON.parse(storedOrder);
        setOrderData(parsedOrder);
        sessionStorage.removeItem('completedOrder');
      } catch (error) {
        console.error('Error parsing order data:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const orderDate = new Date(orderData.timestamp);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Thank You - Order Confirmed"
        description="Your Horizon Plays subscription has been successfully processed. Welcome to the future of educational gaming!"
        keywords="order confirmation, subscription confirmed, educational games, horizon plays"
        canonical="/thank-you"
      />
      <Header />
      
      <div className="bg-gradient-to-br from-success/5 via-background to-primary/5 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Thank You for Your Purchase!</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your order has been received and will be processed. We'll send you detailed setup instructions within 12-24 hours. If you need any help, please contact our support team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <CheckCircle className="w-6 h-6 text-success mr-3" />
                <h2 className="text-2xl font-bold">Order Confirmed</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-lg p-4 border">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{orderData.plan.name} Plan</h4>
                      <p className="text-sm text-muted-foreground">{orderData.plan.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatPrice(orderData.plan.usdPrice)}</div>
                      <div className="text-sm text-muted-foreground">/{orderData.plan.period}</div>
                    </div>
                  </div>
                  
                  {orderData.discount > 0 && (
                    <div className="flex justify-between text-sm border-t pt-2">
                      <span>Discount ({orderData.coupon})</span>
                      <span className="text-success">-{formatPrice(orderData.discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-lg font-bold border-t pt-2 mt-2">
                    <span>Total Paid</span>
                    <span>{formatPrice(orderData.total)}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order ID:</span>
                    <span className="font-mono">{orderData.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="capitalize">{orderData.payment.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{orderData.customer.email}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold">What's Next?</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Confirmation</h3>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an order confirmation email within the next few minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Account Setup</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll send detailed setup instructions and login credentials within 12-24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Start Creating</h3>
                    <p className="text-sm text-muted-foreground">
                      Begin creating engaging educational games with AI assistance immediately.
                    </p>
                  </div>
                </div>

                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Shield className="w-5 h-5 text-success mr-2" />
                    <span className="font-semibold text-success">30-Day Money Back Guarantee</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Not satisfied? Contact us within 30 days for a full refund, no questions asked.
                  </p>
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
                Our support team is here to help you get started and answer any questions.
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
                <h3 className="text-xl font-semibold">Quick Actions</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Explore our platform and resources to get the most out of your subscription.
              </p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/">Return to Homepage</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">Access Your Account</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/request-refund">Request Refund</Link>
                </Button>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Thank you for choosing Horizon Plays for your educational gaming needs!
            </p>
            <Button className="btn-hero px-8" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Return to Homepage
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ThankYou;
