import { useState } from "react";
import { ArrowLeft, RotateCcw, User, Calendar, CreditCard, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface RefundFormData {
  firstName: string;
  lastName: string;
  email: string;
  orderId: string;
  purchaseDate: string;
  planType: string;
  refundReason: string;
  details: string;
  paymentMethod: string;
  terms: boolean;
  confirm: boolean;
}

interface FormErrors {
  [key: string]: string;
}

// Real HTTP POST service for refund requests - will show in Network tab
const realRefundHttpPost = async (url: string, data: RefundFormData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    // Even if server doesn't exist, we can check the response
    if (!response.ok) {
      // Check for test failure trigger
      if (data.details.toLowerCase().includes('fail')) {
        throw new Error('Server validation failed. Please check your input.');
      }
      
      // Simulate random failures (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Network error. Please try again later.');
      }
      
      // For demo purposes, treat 404 as success since we don't have a real server
      return {
        success: true,
        message: "Refund request submitted. We'll email you an update within 24–48 hours.",
        data
      };
    }

    // If we had a real server response
    const result = await response.json();
    return result;
    
  } catch (error: any) {
    // Check for test failure trigger
    if (data.details.toLowerCase().includes('fail')) {
      throw new Error('Server validation failed. Please check your input.');
    }
    
    // For network errors or CORS issues, still show success for demo
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: true,
        message: "Refund request submitted. We'll email you an update within 24–48 hours.",
        data
      };
    }
    
    throw error;
  }
};

const RequestRefund = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'success' | 'error'>('success');
  const [dialogMessage, setDialogMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<RefundFormData>({
    firstName: '',
    lastName: '',
    email: '',
    orderId: '',
    purchaseDate: '',
    planType: '',
    refundReason: '',
    details: '',
    paymentMethod: '',
    terms: false,
    confirm: false
  });
  
  const refundReasons = [
    "Not satisfied with the service",
    "Technical issues cannot be resolved",
    "Billing error or duplicate charge",
    "Found a better alternative",
    "No longer need the service",
    "Service doesn't meet expectations",
    "Other (please specify)"
  ];

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.orderId.trim()) {
      newErrors.orderId = 'Order ID is required';
    } else if (!/^[A-Z0-9-]+$/i.test(formData.orderId)) {
      newErrors.orderId = 'Please enter a valid order ID format';
    }
    
    if (!formData.purchaseDate) {
      newErrors.purchaseDate = 'Purchase date is required';
    }
    
    if (!formData.planType) {
      newErrors.planType = 'Please select your subscription plan';
    }
    
    if (!formData.refundReason) {
      newErrors.refundReason = 'Please select a reason for refund';
    }
    
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select your original payment method';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'You must acknowledge the terms';
    }
    
    if (!formData.confirm) {
      newErrors.confirm = 'You must confirm the information is accurate';
    }
    
    return newErrors;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    // Start 3-second countdown
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Make the actual request after countdown
          makeRequest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const makeRequest = async () => {
    try {
      const response = await realRefundHttpPost('/request-refund', formData);
      setDialogType('success');
      setDialogMessage(response.message);
      setShowDialog(true);
      
      // Auto close dialog after 3 seconds
      setTimeout(() => {
        setShowDialog(false);
      }, 3000);
      
      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        orderId: '',
        purchaseDate: '',
        planType: '',
        refundReason: '',
        details: '',
        paymentMethod: '',
        terms: false,
        confirm: false
      });
    } catch (error: any) {
      setDialogType('error');
      setDialogMessage(error.message || 'An error occurred. Please try again.');
      setShowDialog(true);
      
      // Auto close error dialog after 3 seconds
      setTimeout(() => {
        setShowDialog(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
      setCountdown(0);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-6">
                <RotateCcw className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Request a Refund
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're sorry to see you go. Please fill out the form below to request your refund.
              </p>
            </div>
          </div>
        </section>

        {/* Refund Information */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Alert className="animate-fade-in">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>30-Day Money-Back Guarantee:</strong> All refund requests are processed within 2-3 business days. 
                Approved refunds are completed within 5-7 business days to your original payment method.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Refund Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-primary" />
                      <span>Refund Request Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="Enter your first name"
                            className={errors.firstName ? 'border-red-500' : ''}
                          />
                          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Enter your last name"
                            className={errors.lastName ? 'border-red-500' : ''}
                          />
                          {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email address"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                      </div>

                      {/* Order Information */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="orderId">Order ID / Transaction ID *</Label>
                          <Input 
                            id="orderId" 
                            value={formData.orderId}
                            onChange={(e) => handleInputChange('orderId', e.target.value)}
                            placeholder="e.g., HZP-2025-001234"
                            className={errors.orderId ? 'border-red-500' : ''}
                          />
                          {errors.orderId && <p className="text-sm text-red-500">{errors.orderId}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="purchaseDate">Purchase Date *</Label>
                          <Input 
                            id="purchaseDate" 
                            type="date"
                            value={formData.purchaseDate}
                            onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                            className={errors.purchaseDate ? 'border-red-500' : ''}
                          />
                          {errors.purchaseDate && <p className="text-sm text-red-500">{errors.purchaseDate}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="planType">Subscription Plan *</Label>
                        <Select value={formData.planType} onValueChange={(value) => handleInputChange('planType', value)}>
                          <SelectTrigger className={errors.planType ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select your plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic Plan</SelectItem>
                            <SelectItem value="advanced">Advanced Plan</SelectItem>
                            <SelectItem value="academic">Academic Plan</SelectItem>
                            <SelectItem value="commercial">Commercial Plan</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.planType && <p className="text-sm text-red-500">{errors.planType}</p>}
                      </div>

                      {/* Refund Details */}
                      <div className="space-y-2">
                        <Label htmlFor="refundReason">Reason for Refund *</Label>
                        <Select value={formData.refundReason} onValueChange={(value) => handleInputChange('refundReason', value)}>
                          <SelectTrigger className={errors.refundReason ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                          <SelectContent>
                            {refundReasons.map((reason, index) => (
                              <SelectItem key={index} value={reason.toLowerCase().replace(/\s+/g, '-')}>
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.refundReason && <p className="text-sm text-red-500">{errors.refundReason}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="details">Additional Details</Label>
                        <Textarea 
                          id="details"
                          value={formData.details}
                          onChange={(e) => handleInputChange('details', e.target.value)}
                          placeholder="Please provide any additional information about your refund request... (Try typing 'fail' to test error handling)"
                          className="min-h-[120px]"
                        />
                      </div>

                      {/* Payment Information */}
                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Original Payment Method *</Label>
                        <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                          <SelectTrigger className={errors.paymentMethod ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="credit-card">Credit Card</SelectItem>
                            <SelectItem value="debit-card">Debit Card</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod}</p>}
                      </div>

                      {/* Terms and Conditions */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="terms" 
                            checked={formData.terms}
                            onCheckedChange={(checked) => handleInputChange('terms', checked as boolean)}
                          />
                          <Label htmlFor="terms" className="text-sm leading-relaxed">
                            I understand that submitting this refund request may result in the immediate 
                            suspension of my account access and deletion of my created content. *
                          </Label>
                        </div>
                        {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="confirm" 
                            checked={formData.confirm}
                            onCheckedChange={(checked) => handleInputChange('confirm', checked as boolean)}
                          />
                          <Label htmlFor="confirm" className="text-sm leading-relaxed">
                            I confirm that all information provided is accurate and I agree to the 
                            terms outlined in our Return Policy. *
                          </Label>
                        </div>
                        {errors.confirm && <p className="text-sm text-red-500">{errors.confirm}</p>}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          className="w-full hover-scale"
                          disabled={isSubmitting}
                        >
                          {countdown > 0 ? (
                            `Submitting in ${countdown}...`
                          ) : isSubmitting ? (
                            "Submitting..."
                          ) : (
                            <>
                              <RotateCcw className="w-4 h-4 mr-2" />
                              Submit Refund Request
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Information */}
              <div className="space-y-6">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      <span>Important Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Processing Time</h4>
                      <p className="text-muted-foreground">Refund requests are reviewed within 2-3 business days.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Refund Timeline</h4>
                      <p className="text-muted-foreground">Approved refunds are processed within 5-7 business days.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Account Access</h4>
                      <p className="text-muted-foreground">Your account may be suspended after refund approval.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <span>Need Help?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Before requesting a refund, consider reaching out to our support team. 
                      We might be able to resolve your concerns.
                    </p>
                    <Button variant="outline" className="w-full hover-scale" onClick={() => window.location.href = '/contact'}>
                      Contact Support First
                    </Button>
                  </CardContent>
                </Card>

                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>Refund Policy</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Review our complete refund policy for detailed terms and conditions.
                    </p>
                    <Button variant="outline" className="w-full hover-scale" onClick={() => window.location.href = '/return-policy'}>
                      View Return Policy
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Back Navigation */}
        <section className="py-8 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Button variant="outline" className="hover-scale" onClick={() => window.location.href = '/'}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Success/Error Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {dialogType === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span>{dialogType === 'success' ? 'Request Submitted!' : 'Error'}</span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-base">
            {dialogMessage}
          </DialogDescription>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestRefund;
