import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  Shield, 
  Check, 
  ChevronRight, 
  User, 
  Lock,
  Percent,
  X,
  MapPin,
  CreditCard
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useCurrency } from "@/contexts/CurrencyContext";
import StripePaymentForm from "@/components/checkout/StripePaymentForm";
import PayPalPaymentButton from "@/components/checkout/PayPalPaymentButton";

// Stripe test public key
const stripePromise = loadStripe('pk_test_51O9K2fBkTfxZn2vKX3w2rLjHn5o1S4L9JdBaZmJUQ8U0z2vR5a9pWqS6X9g4r8vT0wP4L2eY6mQ3sF7nD8oH1zVx00abcdefg');

// PayPal test client ID  
const paypalOptions = {
  clientId: "AeA1QIZXiflr1_-w7Ng2hdCCNhbU1CU9xz3gj8Dw2-5IrMZjhJRhKkflRksXfJNe",
  currency: "USD"
};

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isExistingUser: boolean;
  password?: string;
  address1: string;
  city: string;
  postalCode: string;
  country: string;
  couponCode: string;
  agreeTerms: boolean;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { formatPrice } = useCurrency();
  const plan = searchParams.get('plan') || 'advanced';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'paypal'>('card');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    isExistingUser: false,
    password: '',
    address1: '',
    city: '',
    postalCode: '',
    country: 'US',
    couponCode: '',
    agreeTerms: false
  });

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const planDetails = {
    basic: { name: "Basic", usdPrice: 0, period: "forever", description: "Perfect for teachers getting started" },
    advanced: { name: "Advanced", usdPrice: 9.99, period: "per month", description: "For serious educators and trainers" },
    academic: { name: "Academic", usdPrice: 19.99, period: "per month", description: "Perfect for schools and institutions" },
    commercial: { name: "Commercial", usdPrice: 49.99, period: "per month", description: "For businesses and large organizations" }
  };

  const selectedPlan = planDetails[plan as keyof typeof planDetails] || planDetails.advanced;
  const discountAmount = selectedPlan.usdPrice * (couponDiscount / 100);
  const finalPrice = selectedPlan.usdPrice - discountAmount;

  const coupons = { 'WELCOME20': 20, 'STUDENT50': 50, 'TEACHER30': 30, 'SAVE10': 10 };

  useEffect(() => {
    const validPlans = ['basic', 'advanced', 'academic', 'commercial'];
    if (!validPlans.includes(plan)) navigate('/');
  }, [plan, navigate]);

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (step === 2) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.address1) newErrors.address1 = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
      if (!formData.isExistingUser && !formData.password) newErrors.password = 'Password is required';
    }
    
    if (step === 3 && selectedPayment === 'card') {
      if (!cardData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!cardData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!cardData.cvv) newErrors.cvv = 'CVV is required';
      if (!cardData.nameOnCard) newErrors.nameOnCard = 'Name on card is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleCardChange = (field: string, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleNext = () => {
    if (currentStep === 2 && !validateStep(2)) return;
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const applyCoupon = () => {
    const upperCoupon = formData.couponCode.toUpperCase();
    if (coupons[upperCoupon as keyof typeof coupons]) {
      setCouponDiscount(coupons[upperCoupon as keyof typeof coupons]);
      setCouponApplied(true);
      setErrors(prev => ({ ...prev, coupon: '' }));
    } else {
      setErrors(prev => ({ ...prev, coupon: 'Invalid coupon code' }));
    }
  };

  const removeCoupon = () => {
    setCouponApplied(false);
    setCouponDiscount(0);
    setFormData(prev => ({ ...prev, couponCode: '' }));
  };

  const handlePayment = async () => {
    if (!validateStep(3)) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        orderId: 'HZP-' + Date.now(),
        plan: selectedPlan,
        customer: formData,
        payment: { method: selectedPayment, amount: finalPrice },
        total: finalPrice,
        discount: discountAmount,
        coupon: couponApplied ? formData.couponCode : null,
        timestamp: new Date().toISOString()
      };
      
      sessionStorage.setItem('completedOrder', JSON.stringify(orderData));
      navigate('/thank-you');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Secure Checkout - Complete Your Purchase"
        description="Complete your Horizon Plays subscription purchase with secure payment processing."
        keywords="checkout, secure payment, subscription, educational games"
        canonical="/checkout"
      />
      <Header />
      
      <div className="bg-gradient-to-br from-background via-background to-muted/10 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Secure Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase in just a few steps</p>
            <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 mr-2" />
              <span>SSL Encrypted • Secure Payment • 30-Day Money Back Guarantee</span>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step ? 'bg-primary border-primary text-white' : 'border-muted-foreground text-muted-foreground'
                }`}>
                  {currentStep > step ? <Check className="w-5 h-5" /> : step}
                </div>
                {index < 2 && <div className={`w-12 h-px mx-4 ${currentStep > step ? 'bg-primary' : 'bg-muted-foreground/30'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Plan Review */}
          {currentStep === 1 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Plan Review</h2>
              <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-xl p-6 border border-primary/10 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{selectedPlan.name} Plan</h3>
                    <p className="text-muted-foreground">{selectedPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{formatPrice(selectedPlan.usdPrice)}</div>
                    {selectedPlan.period !== "forever" && (
                      <div className="text-sm text-muted-foreground">/{selectedPlan.period}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => navigate('/#pricing')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />Back to Pricing
                </Button>
                <Button onClick={handleNext} className="btn-hero px-8">
                  Continue<ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Account Information */}
          {currentStep === 2 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Account & Billing Information</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@school.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="flex items-center">
                    <input 
                      type="radio" 
                      checked={!formData.isExistingUser}
                      onChange={() => handleInputChange('isExistingUser', false)}
                      className="mr-3"
                    />
                    New Customer
                  </Label>
                  <Label className="flex items-center">
                    <input 
                      type="radio" 
                      checked={formData.isExistingUser}
                      onChange={() => handleInputChange('isExistingUser', true)}
                      className="mr-3"
                    />
                    Existing Customer
                  </Label>
                </div>

                {!formData.isExistingUser && (
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="address1">Address *</Label>
                    <Input 
                      id="address1" 
                      placeholder="123 Main Street"
                      value={formData.address1}
                      onChange={(e) => handleInputChange('address1', e.target.value)}
                      className={errors.address1 ? 'border-red-500' : ''}
                    />
                    {errors.address1 && <p className="text-sm text-red-500">{errors.address1}</p>}
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input 
                      id="city" 
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input 
                      id="postalCode" 
                      placeholder="10001"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className={errors.postalCode ? 'border-red-500' : ''}
                    />
                    {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
                  />
                  <Label htmlFor="agreeTerms" className="text-sm">
                    I agree to the <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> *
                  </Label>
                </div>
                {errors.agreeTerms && <p className="text-sm text-red-500">{errors.agreeTerms}</p>}
              </div>
              
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />Back
                </Button>
                <Button onClick={handleNext} className="btn-hero px-8">
                  Continue to Payment<ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>{selectedPlan.name} Plan</span>
                    <span>{formatPrice(selectedPlan.usdPrice)}</span>
                  </div>
                  
                  {!couponApplied ? (
                    <div className="space-y-3">
                      <Label>Have a coupon?</Label>
                      <div className="flex space-x-2">
                        <Input 
                          placeholder="Enter coupon code"
                          value={formData.couponCode}
                          onChange={(e) => handleInputChange('couponCode', e.target.value)}
                        />
                        <Button variant="outline" onClick={applyCoupon}>Apply</Button>
                      </div>
                      {errors.coupon && <p className="text-sm text-red-500">{errors.coupon}</p>}
                      <p className="text-xs text-muted-foreground">Try: WELCOME20, STUDENT50, TEACHER30</p>
                    </div>
                  ) : (
                    <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Coupon: {formData.couponCode}</span>
                        <Button variant="ghost" size="sm" onClick={removeCoupon}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-success">Save {couponDiscount}% ({formatPrice(discountAmount)})</p>
                    </div>
                  )}

                  {couponApplied && (
                    <div className="flex justify-between text-sm">
                      <span>Discount</span>
                      <span className="text-success">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(finalPrice)}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex space-x-4">
                    <button 
                      className={`flex-1 p-4 border-2 rounded-lg ${selectedPayment === 'card' ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'}`}
                      onClick={() => setSelectedPayment('card')}
                    >
                      <CreditCard className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Credit Card</div>
                    </button>
                    <button 
                      className={`flex-1 p-4 border-2 rounded-lg ${selectedPayment === 'paypal' ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'}`}
                      onClick={() => setSelectedPayment('paypal')}
                    >
                      <div className="w-6 h-6 mx-auto mb-2 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold">PP</div>
                      <div className="text-sm font-medium">PayPal</div>
                    </button>
                  </div>
                </div>

                <Elements stripe={stripePromise}>
                  <PayPalScriptProvider options={paypalOptions}>
                    {selectedPayment === 'card' && (
                      <StripePaymentForm
                        amount={finalPrice}
                        currency="USD"
                        customerInfo={{
                          email: formData.email,
                          firstName: formData.firstName,
                          lastName: formData.lastName,
                          phone: formData.phone
                        }}
                        onPaymentSuccess={(paymentDetails) => {
                          const orderData = {
                            orderId: 'HZP-' + Date.now(),
                            plan: selectedPlan,
                            customer: formData,
                            payment: paymentDetails,
                            total: finalPrice,
                            discount: discountAmount,
                            coupon: couponApplied ? formData.couponCode : null,
                            timestamp: new Date().toISOString()
                          };
                          sessionStorage.setItem('completedOrder', JSON.stringify(orderData));
                          navigate('/thank-you');
                        }}
                        onPaymentError={(error) => {
                          sessionStorage.setItem('paymentError', JSON.stringify({
                            error: error.message || 'Payment failed',
                            orderId: 'HZP-' + Date.now(),
                            timestamp: new Date().toISOString()
                          }));
                          navigate('/checkout-error');
                        }}
                        isProcessing={isProcessing}
                        setIsProcessing={setIsProcessing}
                      />
                    )}

                    {selectedPayment === 'paypal' && (
                      <PayPalPaymentButton
                        amount={finalPrice}
                        currency="USD"
                        customerInfo={{
                          email: formData.email,
                          firstName: formData.firstName,
                          lastName: formData.lastName,
                          phone: formData.phone
                        }}
                        onPaymentSuccess={(paymentDetails) => {
                          const orderData = {
                            orderId: 'HZP-' + Date.now(),
                            plan: selectedPlan,
                            customer: formData,
                            payment: paymentDetails,
                            total: finalPrice,
                            discount: discountAmount,
                            coupon: couponApplied ? formData.couponCode : null,
                            timestamp: new Date().toISOString()
                          };
                          sessionStorage.setItem('completedOrder', JSON.stringify(orderData));
                          navigate('/thank-you');
                        }}
                        onPaymentError={(error) => {
                          sessionStorage.setItem('paymentError', JSON.stringify({
                            error: error.message || 'Payment failed',
                            orderId: 'HZP-' + Date.now(),
                            timestamp: new Date().toISOString()
                          }));
                          navigate('/checkout-error');
                        }}
                        isProcessing={isProcessing}
                        setIsProcessing={setIsProcessing}
                      />
                    )}
                  </PayPalScriptProvider>
                </Elements>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />Back
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
