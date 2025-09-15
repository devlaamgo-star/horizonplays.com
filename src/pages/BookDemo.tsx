import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Video, 
  Clock, 
  Users, 
  CheckCircle, 
  Calendar as CalendarIcon,
  ArrowLeft,
  Star,
  Globe
} from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookDemo = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    interests: '',
    message: ''
  });

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const benefits = [
    "See HorizonPlays in action with real examples",
    "Learn best practices from education experts",
    "Get personalized recommendations for your needs",
    "Discover advanced features and integrations",
    "Ask questions and get expert answers",
    "No sales pressure - just valuable insights"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Head of Digital Learning",
      company: "Riverside Academy",
      quote: "The demo showed exactly how HorizonPlays could transform our classroom engagement. Within weeks, our student participation increased by 40%."
    },
    {
      name: "Mark Chen",
      role: "Training Manager",
      company: "TechCorp Solutions",
      quote: "The personalized demo helped us see the ROI immediately. Our training completion rates improved dramatically after implementing HorizonPlays."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    // Show success message or redirect
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-gradient-to-br from-background via-background to-muted/20 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center mb-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/support')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Support
              </Button>
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Book Your Personal Demo
              <span className="gradient-text block">See HorizonPlays in Action</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get a personalized demonstration tailored to your educational needs. Our experts will show you exactly how HorizonPlays can transform your teaching.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <span>30 minutes</span>
              </div>
              <div className="flex items-center">
                <Video className="w-4 h-4 mr-2 text-primary" />
                <span>Online via Zoom</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-primary" />
                <span>1-on-1 with expert</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Booking Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold mb-6">Tell us about yourself</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          required
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          required
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required
                        placeholder="john@yourschool.edu"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Organization</Label>
                        <Input 
                          id="company" 
                          placeholder="Your School/Company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Your Role</Label>
                        <Select onValueChange={(value) => handleInputChange('role', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="teacher">Teacher/Educator</SelectItem>
                            <SelectItem value="administrator">Administrator</SelectItem>
                            <SelectItem value="it-director">IT Director</SelectItem>
                            <SelectItem value="curriculum">Curriculum Designer</SelectItem>
                            <SelectItem value="trainer">Corporate Trainer</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Team Size</Label>
                      <Select onValueChange={(value) => handleInputChange('teamSize', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="How many people would use HorizonPlays?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 people</SelectItem>
                          <SelectItem value="11-50">11-50 people</SelectItem>
                          <SelectItem value="51-200">51-200 people</SelectItem>
                          <SelectItem value="200+">200+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleNext} className="btn-hero">
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Scheduling */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold mb-6">Choose your preferred time</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <Label className="text-base font-medium mb-4 block">Select Date</Label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                          className="rounded-md border"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-base font-medium mb-4 block">Select Time (GMT)</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className={selectedTime === time ? "btn-hero" : ""}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                      <Button 
                        onClick={handleNext} 
                        className="btn-hero"
                        disabled={!selectedDate || !selectedTime}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Final Details */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold mb-6">Additional information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interests">What interests you most about HorizonPlays?</Label>
                      <Select onValueChange={(value) => handleInputChange('interests', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary interest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engagement">Increasing student engagement</SelectItem>
                          <SelectItem value="assessment">Better assessment tools</SelectItem>
                          <SelectItem value="efficiency">Saving time on content creation</SelectItem>
                          <SelectItem value="analytics">Learning analytics and insights</SelectItem>
                          <SelectItem value="integration">LMS integration</SelectItem>
                          <SelectItem value="scalability">Scaling educational programs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Anything specific you'd like to see in the demo? (Optional)</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your specific needs or challenges..."
                        className="min-h-[100px]"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                      />
                    </div>

                    {/* Booking Summary */}
                    <Card className="p-4 bg-muted/30">
                      <h4 className="font-semibold mb-3">Demo Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span>{selectedDate ? format(selectedDate, 'PPP') : 'Not selected'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span>{selectedTime} GMT (30 minutes)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Attendee:</span>
                          <span>{formData.firstName} {formData.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Organization:</span>
                          <span>{formData.company || 'Not specified'}</span>
                        </div>
                      </div>
                    </Card>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                      <Button 
                        onClick={handleSubmit}
                        className="btn-hero"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Booking..." : "Confirm Demo"}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* What to Expect */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">What to expect</h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Testimonials */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">What others say</h3>
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
                      <div className="text-xs">
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Support Info */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Need help?</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">Email us</div>
                    <div className="text-muted-foreground">demo@horizonplays.com</div>
                  </div>
                  <div>
                    <div className="font-medium">Call us</div>
                    <div className="text-muted-foreground">+44 20 1234 5678</div>
                  </div>
                  <div className="flex items-center space-x-2 text-success">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Available now</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookDemo;