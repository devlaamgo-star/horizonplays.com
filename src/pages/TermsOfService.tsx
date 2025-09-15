import { ArrowLeft, FileText, Users, Gavel, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        "By accessing and using Horizon Plays, you accept and agree to be bound by these Terms of Service.",
        "These terms constitute a legally binding agreement between you and Horizon Plays Ltd.",
        "If you do not agree to these terms, you may not use our services.",
        "We reserve the right to modify these terms at any time with notice to users."
      ]
    },
    {
      id: "services",
      title: "Description of Services",
      icon: FileText,
      content: [
        "Horizon Plays provides an AI-powered platform for creating educational games and interactive content.",
        "Our services include game creation tools, templates, analytics, and educational resources.",
        "We offer various subscription plans with different features and usage limits.",
        "All services are provided 'as is' and we strive to maintain high availability and performance."
      ]
    },
    {
      id: "user-accounts",
      title: "User Accounts and Responsibilities",
      icon: Users,
      content: [
        "You must provide accurate and complete information when creating an account.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to notify us immediately of any unauthorized use of your account.",
        "Each account is for individual use only and may not be shared or transferred.",
        "You must be at least 13 years old to create an account (with parental consent for users under 18)."
      ]
    },
    {
      id: "usage-rules",
      title: "Acceptable Use Policy",
      icon: Gavel,
      content: [
        "Use our platform only for lawful educational and creative purposes.",
        "Do not create content that is offensive, discriminatory, or harmful to minors.",
        "Respect intellectual property rights when using our templates and creating content.",
        "Do not attempt to reverse engineer, hack, or compromise our platform security.",
        "Commercial use requires appropriate subscription plans and licensing.",
        "Do not spam, distribute malware, or engage in any fraudulent activities."
      ]
    },
    {
      id: "content-ownership",
      title: "Content and Intellectual Property",
      icon: FileText,
      content: [
        "You retain ownership of the educational games and content you create using our platform.",
        "You grant us a license to host, store, and display your content as necessary to provide our services.",
        "Our platform, software, and proprietary features remain our intellectual property.",
        "You may not use our trademarks, logos, or brand elements without written permission.",
        "User-generated content must not infringe on third-party intellectual property rights."
      ]
    },
    {
      id: "limitations",
      title: "Limitations and Disclaimers",
      icon: AlertTriangle,
      content: [
        "Our services are provided 'as is' without warranties of any kind.",
        "We do not guarantee uninterrupted access or error-free operation of our platform.",
        "We are not liable for any indirect, incidental, or consequential damages.",
        "Our liability is limited to the amount paid for our services in the preceding 12 months.",
        "Users are responsible for backing up their content and data."
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
                <Gavel className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Terms of Service
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Please read these terms carefully before using our educational game creation platform.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <span>Effective Date: September 13, 2025</span>
                <span>•</span>
                <span>Last Updated: September 13, 2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Alert className="animate-fade-in">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> By using Horizon Plays, you agree to these terms. 
                Please read them carefully as they include important information about your rights and responsibilities.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="outline"
                  size="sm"
                  className="hover-scale"
                  onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <section.icon className="w-4 h-4 mr-2" />
                  {section.title}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {sections.map((section) => (
                <Card key={section.id} id={section.id} className="animate-fade-in hover-scale">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <section.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {section.title}
                      </h2>
                    </div>
                    <ul className="space-y-4">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <p className="text-muted-foreground leading-relaxed">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="animate-fade-in">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Questions About These Terms?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  If you have any questions about these Terms of Service or need clarification on any provision, 
                  please contact our legal team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="hover-scale" onClick={() => window.location.href = '/contact'}>
                    Contact Legal Team
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

export default TermsOfService;