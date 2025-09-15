import { ArrowLeft, Cookie, Settings, BarChart, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  const cookieTypes = [
    {
      id: "essential",
      title: "Essential Cookies",
      icon: Shield,
      required: true,
      description: "These cookies are necessary for the website to function and cannot be switched off.",
      examples: [
        "Session management and user authentication",
        "Security and fraud prevention",
        "Load balancing and performance optimization",
        "Basic functionality and navigation"
      ]
    },
    {
      id: "analytics",
      title: "Analytics Cookies",
      icon: BarChart,
      required: false,
      description: "These cookies help us understand how visitors interact with our website.",
      examples: [
        "Page views and user behavior tracking",
        "Feature usage and engagement metrics",
        "Performance monitoring and error reporting",
        "A/B testing and optimization data"
      ]
    },
    {
      id: "preferences",
      title: "Preference Cookies",
      icon: Settings,
      required: false,
      description: "These cookies remember your preferences and provide enhanced functionality.",
      examples: [
        "Language and region preferences",
        "UI theme and display settings",
        "Saved game templates and favorites",
        "Notification and communication preferences"
      ]
    },
    {
      id: "marketing",
      title: "Marketing Cookies",
      icon: Info,
      required: false,
      description: "These cookies are used to deliver relevant advertisements and measure their effectiveness.",
      examples: [
        "Targeted advertising and personalization",
        "Social media integration and sharing",
        "Campaign tracking and attribution",
        "Cross-platform marketing optimization"
      ]
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
                <Cookie className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Cookie Policy
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Learn about how we use cookies to enhance your experience on our educational platform.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <span>Effective Date: September 13, 2025</span>
                <span>•</span>
                <span>Last Updated: September 13, 2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* What Are Cookies */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="animate-fade-in">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  What Are Cookies?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Cookies are small text files that are stored on your device when you visit our website. 
                      They help us provide you with a better experience by remembering your preferences and 
                      understanding how you use our platform.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We use cookies to enhance functionality, analyze performance, and provide personalized 
                      content that supports your educational goals.
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="font-semibold text-foreground mb-4">Cookie Duration Types:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        <span><strong>Session Cookies:</strong> Deleted when you close your browser</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        <span><strong>Persistent Cookies:</strong> Remain until expiry or deletion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cookie Types and Controls */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Cookie Types and Your Choices
            </h2>
            <div className="space-y-6">
              {cookieTypes.map((type) => (
                <Card key={type.id} className="animate-fade-in hover-scale">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <type.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {type.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {type.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id={type.id}
                          disabled={type.required}
                          defaultChecked={type.required}
                        />
                        <Label htmlFor={type.id} className="text-sm">
                          {type.required ? "Required" : "Optional"}
                        </Label>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Examples include:</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {type.examples.map((example, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Managing Cookies */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="animate-fade-in">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Managing Your Cookie Preferences
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Use the cookie controls above to adjust your preferences</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Manage cookies through your browser settings</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Clear existing cookies from your device</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Set your browser to reject all cookies (may affect functionality)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="animate-fade-in">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Third-Party Cookies
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We may use third-party services that set their own cookies:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Google Analytics for website analytics</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Payment processors for secure transactions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Social media platforms for content sharing</span>
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
                  Questions About Cookies?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  If you have any questions about our use of cookies or how to manage your preferences, 
                  we're here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="hover-scale" onClick={() => window.location.href = '/contact'}>
                    Contact Support
                  </Button>
                  <Button variant="outline" className="hover-scale" onClick={() => window.location.href = '/'}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
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

export default CookiePolicy;