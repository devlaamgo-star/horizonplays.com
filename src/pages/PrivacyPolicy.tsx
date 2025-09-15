import { ArrowLeft, Shield, Eye, Lock, UserCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Eye,
      content: [
        "Personal Information: Name, email address, phone number, and educational institution details when you register for an account.",
        "Usage Data: Information about how you use our platform, including game creation patterns, time spent, and feature usage.",
        "Device Information: Browser type, operating system, and device identifiers for security and optimization purposes.",
        "Educational Content: Games you create, templates you use, and any content you upload to our platform."
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: UserCheck,
      content: [
        "Service Delivery: To provide, maintain, and improve our educational game creation platform.",
        "Account Management: To create and manage your account, process payments, and provide customer support.",
        "Communication: To send important updates, newsletters, and promotional materials (with your consent).",
        "Analytics: To understand platform usage and improve our AI-powered features.",
        "Security: To protect against fraud, unauthorized access, and other security threats."
      ]
    },
    {
      id: "data-sharing",
      title: "Information Sharing and Disclosure",
      icon: Shield,
      content: [
        "We never sell your personal information to third parties.",
        "Service Providers: We may share data with trusted partners who help us operate our platform (cloud hosting, payment processing).",
        "Legal Requirements: We may disclose information when required by law or to protect our rights and users' safety.",
        "Business Transfers: In the event of a merger or acquisition, user data may be transferred as part of the business assets.",
        "Consent: We may share information with your explicit consent for specific purposes."
      ]
    },
    {
      id: "data-protection",
      title: "Data Protection and Security",
      icon: Lock,
      content: [
        "Encryption: All data is encrypted in transit and at rest using industry-standard protocols.",
        "Access Controls: Limited access to personal data on a need-to-know basis for authorized personnel only.",
        "Regular Audits: We conduct regular security assessments and vulnerability testing.",
        "Data Backup: Secure, encrypted backups ensure data availability while maintaining privacy.",
        "Incident Response: Established procedures for detecting, responding to, and reporting security incidents."
      ]
    },
    {
      id: "user-rights",
      title: "Your Rights and Choices",
      icon: FileText,
      content: [
        "Access: Request access to the personal information we hold about you.",
        "Correction: Request correction of inaccurate or incomplete personal information.",
        "Deletion: Request deletion of your personal information (subject to legal retention requirements).",
        "Portability: Request a copy of your data in a structured, machine-readable format.",
        "Opt-out: Unsubscribe from marketing communications at any time.",
        "Account Closure: Delete your account and associated data through your account settings."
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
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <span>Effective Date: September 13, 2025</span>
                <span>•</span>
                <span>Last Updated: September 13, 2025</span>
              </div>
            </div>
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
              {sections.map((section, index) => (
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
                  Questions About This Policy?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  If you have any questions about this Privacy Policy or how we handle your data, 
                  please don't hesitate to contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="hover-scale" onClick={() => window.location.href = '/contact'}>
                    Contact Privacy Team
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

export default PrivacyPolicy;