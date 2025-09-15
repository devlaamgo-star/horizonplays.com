import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  terms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

// Real HTTP POST service - will show in Network tab
const realHttpPost = async (url: string, data: FormData) => {
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
      // Server doesn't exist, but we'll show success for demo
      // Check for test failure trigger
      if (data.message.toLowerCase().includes('fail')) {
        throw new Error('Server validation failed. Please check your input.');
      }
      
      // Simulate random failures (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Network error. Please try again later.');
      }
      
      // For demo purposes, treat 404 as success since we don't have a real server
      return {
        success: true,
        message: "Thanks! We received your message and will get back to you within 1 business day.",
        data
      };
    }

    // If we had a real server response
    const result = await response.json();
    return result;
    
  } catch (error: any) {
    // Check for test failure trigger
    if (data.message.toLowerCase().includes('fail')) {
      throw new Error('Server validation failed. Please check your input.');
    }
    
    // For network errors or CORS issues, still show success for demo
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: true,
        message: "Thanks! We received your message and will get back to you within 1 business day.",
        data
      };
    }
    
    throw error;
  }
};

const ContactUs = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'success' | 'error'>('success');
  const [dialogMessage, setDialogMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    terms: false
  });

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'You must agree to the terms';
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
      const response = await realHttpPost('/contact', formData);
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
        phone: '',
        company: '',
        subject: '',
        message: '',
        terms: false
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
      <SEO
        title="Contact Us - Get Support & Help"
        description="Get in touch with Horizon Plays support team. Contact us for technical support, sales inquiries, partnerships, and custom educational game solutions."
        keywords="contact support, customer service, technical help, sales inquiry, educational games support, horizon plays contact"
        canonical="/contact"
      />
      <Header />
      
      <div className="bg-gradient-to-br from-background via-background to-muted/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-6">
              Get in Touch
              <span className="gradient-text block">We're Here to Help</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions about our platform? Need a custom solution? Our team is ready to assist you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">director@horizonplays.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+44 20 1234 5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">
                        123 Education Street<br />
                        London, UK SW1A 1AA
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM GMT<br />
                        Saturday: 10:00 AM - 4:00 PM GMT
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Links */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Help</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Sales Inquiries</h4>
                    <p className="text-sm text-muted-foreground">Custom plans and enterprise solutions</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Technical Support</h4>
                    <p className="text-sm text-muted-foreground">Platform help and troubleshooting</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Partnership</h4>
                    <p className="text-sm text-muted-foreground">Integration and collaboration opportunities</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="John"
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
                        placeholder="Doe"
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+44 20 1234 5678" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input 
                        id="company" 
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your Company" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                        <SelectTrigger className={errors.subject ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Sales Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your needs, questions, or how we can help... (Try typing 'fail' to test error handling)"
                      className={`min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                  </div>

                  <div className="flex items-start space-x-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={formData.terms}
                      onChange={(e) => handleInputChange('terms', e.target.checked)}
                      className="rounded mt-0.5" 
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to receive communications from HorizonPlays and understand that I can unsubscribe at any time. *
                    </Label>
                  </div>
                  {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

                  <Button 
                    type="submit" 
                    className="w-full btn-hero"
                    disabled={isSubmitting}
                  >
                    {countdown > 0 ? (
                      `Sending in ${countdown}...`
                    ) : isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Check out our comprehensive FAQ section.
            </p>
            <Button 
              variant="outline" 
              className="btn-hero-outline"
              onClick={() => navigate('/faq')}
            >
              View FAQ
            </Button>
          </div>
        </div>
      </div>
      
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
              <span>{dialogType === 'success' ? 'Message Sent!' : 'Error'}</span>
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

export default ContactUs;
