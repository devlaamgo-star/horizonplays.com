import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  FileText, 
  Video, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  BookOpen,
  Headphones,
  Send,
  Download
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Support = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ticket");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    // Show success message
  };

  const supportOptions = [
    {
      id: "ticket",
      title: "Submit a Ticket",
      description: "Get detailed help with technical issues",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      id: "live-chat",
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      id: "phone",
      title: "Phone Support",
      description: "Speak directly with our experts",
      icon: Phone,
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-gradient-to-br from-background via-background to-muted/20 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-6">
              Support Center
              <span className="gradient-text block">We're Here to Help</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get the support you need to make the most of HorizonPlays. Our expert team is ready to assist you.
            </p>
          </div>

          {/* Support Options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {supportOptions.map((option) => (
              <Card key={option.id} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`w-12 h-12 rounded-full ${option.bg} flex items-center justify-center mx-auto mb-4`}>
                  <option.icon className={`w-6 h-6 ${option.color}`} />
                </div>
                <h3 className="font-semibold mb-2">{option.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTab(option.id)}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>

          {/* Support Forms */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Main Support Area */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="ticket">Ticket</TabsTrigger>
                  <TabsTrigger value="live-chat">Live Chat</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>

                <TabsContent value="ticket" className="mt-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Submit a Support Ticket</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" required placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required placeholder="john@example.com" />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technical">Technical Issue</SelectItem>
                              <SelectItem value="billing">Billing Question</SelectItem>
                              <SelectItem value="feature">Feature Request</SelectItem>
                              <SelectItem value="bug">Bug Report</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" required placeholder="Brief description of your issue" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          required 
                          placeholder="Please provide detailed information about your issue..."
                          className="min-h-[120px]"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full btn-hero"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Ticket
                          </>
                        )}
                      </Button>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="live-chat" className="mt-6">
                  <Card className="p-6 text-center">
                    <MessageCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-4">Live Chat Support</h3>
                    <p className="text-muted-foreground mb-6">
                      Connect with our support team instantly for quick help and answers.
                    </p>
                    <div className="flex items-center justify-center space-x-2 mb-6">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 font-medium">Available now</span>
                    </div>
                    <Button className="btn-hero">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Live Chat
                    </Button>
                  </Card>
                </TabsContent>

                <TabsContent value="phone" className="mt-6">
                  <Card className="p-6 text-center">
                    <Phone className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-4">Phone Support</h3>
                    <p className="text-muted-foreground mb-6">
                      Speak directly with our support experts for complex issues.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="font-semibold text-lg">+44 20 1234 5678</div>
                        <div className="text-sm text-muted-foreground">UK Support Line</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Available Monday - Friday, 9:00 AM - 6:00 PM GMT
                      </div>
                    </div>
                    <Button className="btn-hero mt-4">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </Card>
                </TabsContent>

              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Response Times */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Response Times</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Live Chat</span>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Instant
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email/Ticket</span>
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      2-4 hours
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Phone</span>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Immediate
                    </Badge>
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

export default Support;