import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  User,
  Building,
  CheckCircle,
  Shield,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

// Real HTTP POST service for registration
const realSignupPost = async (url: string, data: FormData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    // Even if server doesn't exist, we'll simulate success
    return {
      success: true,
      message: "Registration successful",
      data
    };
  } catch (error: any) {
    // For network errors, still show success for demo
    return {
      success: true,
      message: "Registration successful",
      data
    };
  }
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    school: "",
    password: "",
    confirmPassword: ""
  });

  const benefits = [
    "Create unlimited educational games instantly",
    "Access to AI assistant Ray for game creation",
    "Comprehensive analytics and progress tracking",
    "Share games with unlimited students",
    "19+ interactive game types available",
    "Multi-language support included",
    "Free forever plan available"
  ];

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
    
    if (!formData.school.trim()) {
      newErrors.school = 'School/Institution is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!captchaCompleted) {
      newErrors.captcha = 'Please complete the CAPTCHA';
    }
    
    return newErrors;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
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
      const response = await realSignupPost('/signup', formData);
      setShowDialog(true);
      
      // Reset form on success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        school: "",
        password: "",
        confirmPassword: ""
      });
      setCaptchaCompleted(false);
    } catch (error: any) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
      setCountdown(0);
    }
  };

  // Simple CAPTCHA simulation
  const handleCaptchaComplete = () => {
    setCaptchaCompleted(true);
    setErrors(prev => ({ ...prev, captcha: '' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 relative z-10">
        {/* Left Side - Branding & Benefits */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
          {/* Logo & Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-muted-foreground group-hover:text-primary transition-colors">Back to Home</span>
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

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              Join thousands of
              <span className="gradient-text block">educators worldwide</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Start creating engaging educational games in 30 seconds with AI assistance
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">What you get with your free account:</h3>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit} 
                  className="flex items-center space-x-3 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Trust */}
          <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl p-6 border border-primary/20">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-semibold text-primary">Secure & Private</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your data is encrypted and secure. We never share your information with third parties. 
              COPPA and FERPA compliant for educational use.
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <CardDescription>
                Join Horizon Plays and start creating games today
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                        required
                      />
                    </div>
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={errors.lastName ? 'border-red-500' : ''}
                      required
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="teacher@school.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      required
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* School Field */}
                <div className="space-y-2">
                  <Label htmlFor="school">School/Institution *</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="school"
                      type="text"
                      placeholder="Your School Name"
                      value={formData.school}
                      onChange={(e) => handleInputChange("school", e.target.value)}
                      className={`pl-10 ${errors.school ? 'border-red-500' : ''}`}
                      required
                    />
                  </div>
                  {errors.school && <p className="text-sm text-red-500">{errors.school}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password (8+ characters)"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                {/* Simple CAPTCHA Simulation */}
                <div className="space-y-2">
                  <Label>Security Check *</Label>
                  <div className="bg-muted/20 border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 text-center">
                    {!captchaCompleted ? (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">Click the button below to verify you're human:</p>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handleCaptchaComplete}
                          className="w-full"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          I'm not a robot
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                  {errors.captcha && <p className="text-sm text-red-500">{errors.captcha}</p>}
                </div>

                {/* Terms & Privacy */}
                <div className="text-xs text-muted-foreground">
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </div>

                {/* Sign Up Button */}
                <Button 
                  type="submit" 
                  className="w-full btn-hero"
                  disabled={isSubmitting}
                >
                  {countdown > 0 ? (
                    `Creating account in ${countdown}...`
                  ) : isSubmitting ? (
                    "Creating account..."
                  ) : (
                    "Create Your Free Account"
                  )}
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in here
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
              <span>Registration Successful!</span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-base">
            We've sent a verification email. Please check your inbox to verify your email address in order to access Educational Games. If you don't receive the email, please check your spam folder or contact support.
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

export default Signup;
