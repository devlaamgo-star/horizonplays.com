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
  Sparkles,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

interface LoginData {
  email: string;
  password: string;
}

interface FormErrors {
  [key: string]: string;
}

// Real HTTP POST service for login
const realLoginPost = async (url: string, data: LoginData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    // Simulate login failure for demo
    return {
      success: false,
      message: "Login failed",
      data
    };
  } catch (error: any) {
    // For network errors, still show failure for demo
    return {
      success: false,
      message: "Login failed",
      data
    };
  }
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: ""
  });

  const benefits = [
    "Create unlimited educational games",
    "Access to AI assistant Ray",
    "Analytics and progress tracking",
    "Share games with students",
    "19+ game types available",
    "Multi-language support"
  ];

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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

  const handleLogin = async (e: React.FormEvent) => {
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
      const response = await realLoginPost('/login', formData);
      setShowDialog(true);
    } catch (error: any) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
      setCountdown(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
      <SEO
        title="Sign In - Access Your Account"
        description="Sign in to your Horizon Plays account to create educational games with AI assistance. Access your dashboard, game templates, and analytics."
        keywords="login, sign in, account access, educational games platform, horizon plays login, teacher login"
        canonical="/login"
      />
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl"></div>
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
              Welcome back to
              <span className="gradient-text block">your teaching adventure</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Continue creating amazing educational games with AI assistance
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">What you get with Horizon Plays:</h3>
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

          {/* AI Feature Highlight */}
          <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl p-6 border border-primary/20">
            <div className="flex items-center space-x-3 mb-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-semibold text-primary">AI Assistant Ray</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Create complete educational games in just 30 seconds with our AI assistant. 
              No coding or design skills required.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
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

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <Button 
                  type="submit" 
                  className="w-full btn-hero"
                  disabled={isSubmitting}
                >
                  {countdown > 0 ? (
                    `Signing in ${countdown}...`
                  ) : isSubmitting ? (
                    "Signing in..."
                  ) : (
                    "Sign In to Your Account"
                  )}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up for free
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Error Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span>Login Failed</span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-base">
            Email or password is incorrect, or your account has not been activated. Please contact support.
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

export default Login;
