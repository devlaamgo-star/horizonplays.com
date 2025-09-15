import { ArrowLeft, RotateCcw, Clock, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ReturnPolicy = () => {
  const refundScenarios = [
    {
      title: "30-Day Money-Back Guarantee",
      description: "Full refund available within 30 days of purchase",
      timeframe: "30 days",
      status: "Full Refund",
      color: "green"
    },
    {
      title: "Annual Subscription Cancellation",
      description: "Prorated refund for unused months when canceling annual plans",
      timeframe: "Any time",
      status: "Prorated Refund",
      color: "blue"
    },
    {
      title: "Technical Issues",
      description: "Full refund if we cannot resolve critical technical problems",
      timeframe: "60 days",
      status: "Full Refund",
      color: "green"
    },
    {
      title: "Duplicate Charges",
      description: "Immediate refund for any duplicate or erroneous charges",
      timeframe: "Any time",
      status: "Immediate Refund",
      color: "green"
    }
  ];

  const refundProcess = [
    {
      step: 1,
      title: "Submit Request",
      description: "Contact our support team with your refund request and order details",
      icon: AlertCircle
    },
    {
      step: 2,
      title: "Review Process",
      description: "We'll review your request within 2-3 business days",
      icon: Clock
    },
    {
      step: 3,
      title: "Approval & Processing",
      description: "Once approved, refunds are processed within 5-7 business days",
      icon: CheckCircle
    },
    {
      step: 4,
      title: "Refund Completion",
      description: "Funds returned to your original payment method",
      icon: CreditCard
    }
  ];

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
                Return & Refund Policy
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We want you to be completely satisfied with Horizon Plays. Learn about our flexible return and refund options.
              </p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  30-Day Guarantee
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  No Questions Asked
                </Badge>
              </div>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <span>Effective Date: September 13, 2025</span>
                <span>•</span>
                <span>Last Updated: September 13, 2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* Money-Back Guarantee */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Alert className="animate-fade-in mb-8">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>100% Satisfaction Guarantee:</strong> Try Horizon Plays risk-free for 30 days. 
                If you're not completely satisfied, we'll provide a full refund, no questions asked.
              </AlertDescription>
            </Alert>

            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Refund Scenarios
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {refundScenarios.map((scenario, index) => (
                <Card key={index} className="animate-fade-in hover-scale">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold text-foreground">
                        {scenario.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${scenario.color === 'green' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                          ${scenario.color === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                        `}
                      >
                        {scenario.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {scenario.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Timeframe: {scenario.timeframe}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Refund Process */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              How to Request a Refund
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {refundProcess.map((process) => (
                <Card key={process.step} className="animate-fade-in hover-scale text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <process.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {process.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {process.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {process.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="animate-fade-in">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    What's Eligible for Refund
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>All subscription plans within 30 days</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Unused portions of annual subscriptions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Duplicate or erroneous charges</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Service unavailability due to technical issues</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Premium features not working as described</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="animate-fade-in">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Important Terms
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Refunds processed to original payment method only</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Processing time: 5-7 business days after approval</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Account access may be suspended after refund</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Created content may be deleted after account closure</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Special promotions may have different terms</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="animate-fade-in">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Need Help with a Refund?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our customer support team is here to help with any questions about returns, 
                  refunds, or billing issues. We're committed to making this process as smooth as possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="hover-scale" onClick={() => window.location.href = '/request-refund'}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Request Refund
                  </Button>
                  <Button variant="outline" className="hover-scale" onClick={() => window.location.href = '/contact'}>
                    Contact Support
                  </Button>
                  <Button variant="outline" className="hover-scale">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>Email: refunds@horizonplays.com</p>
                  <p>Response time: Within 24 hours</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnPolicy;