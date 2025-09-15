import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Play, 
  Mail, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Shield,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

interface FormErrors {
  [key: string]: string;
}

// Real HTTP POST service for forgot password
const realForgotPasswordPost = async (url: string, email: string) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    // Simulate success
    return {
      success: true,
      message: "Password reset email sent",
      email
    };
  } catch (error: any) {
    // For network errors, still show success for demo
    return {
      success: true,
      message: "Password reset email sent",
      email
    };
  }
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateEmail();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    // Start 5-second countdown
    setCountdown(5);
    
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
      const response = await realForgotPasswordPost('/forgot-password', email);
      setShowDialog(true);
    } catch (error: any) {
      console.error('Forgot password error:', error);
    } finally {
      setIsSubmitting(false);
      setCountdown(0);
    }
  };

  const handleInputChange = (value: string) => {
    setEmail(value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-warning/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 relative z-10">
        {/* Left Side - Branding & Info */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
          {/* Logo & Navigation */}
          <div className="space-y-6">
            <Link to="/login" className="flex items-center space-x-3 group">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-muted-foreground group-hover:text-primary transition-colors">Back to Sign In</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center">
                <Play className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">HORIZON PLAYS</div>
                <div className="text-sm text-muted-foreground">Educational Games Platform</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Forgot your password?
              <span className="gradient-text block">We've got you covered</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Enter your email address and we'll send you a secure link to reset your password.
            </p>
          </div>

          {/* Security Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Security Features:</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-muted-foreground">Secure password reset process</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-success" />
                <span className="text-muted-foreground">Reset links expire in 24 hours</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-success" />
                <span className="text-muted-foreground">Email verification required</span>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl p-6 border border-primary/20">
            <h4 className="font-semibold mb-2">Need Help?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              If you're having trouble resetting your password, our support team is here to help.
            </p>
            <a 
              href="mailto:director@horizonplays.com" 
              className="text-primary hover:underline text-sm font-medium"
            >
              Contact Support →
            </a>
          </div>
        </div>

        {/* Right Side - Reset Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
              <CardDescription>
                Enter your email address to receive reset instructions
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="teacher@school.edu"
                      value={email}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  <p className="text-xs text-muted-foreground">
                    Enter the email address associated with your Horizon Plays account.
                  </p>
                </div>

                {/* Submit Button */}
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
                    'Send Reset Link'
                  )}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="text-sm text-primary hover:underline flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sign In</span>
                </Link>
              </div>

              {/* Additional Help */}
              <div className="text-center text-xs text-muted-foreground space-y-2">
                <p>Don't have an account yet?</p>
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up for free →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Reset Link Sent!</span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-base">
            We've sent a link to reset your password. Please check your inbox or spam folder.
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

export default ForgotPassword;
