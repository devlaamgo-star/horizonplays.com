import { ArrowLeft, Shield, Users, FileText, Download, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GDPRCompliance = () => {
  const gdprRights = [
    {
      id: "access",
      title: "Right to Access",
      icon: Eye,
      description: "Request access to your personal data and information about how it's processed.",
      action: "Request Data Export",
      timeframe: "Response within 30 days"
    },
    {
      id: "rectification",
      title: "Right to Rectification",
      icon: FileText,
      description: "Request correction of inaccurate or incomplete personal data.",
      action: "Update Information",
      timeframe: "Response within 30 days"
    },
    {
      id: "erasure",
      title: "Right to Erasure",
      icon: Trash2,
      description: "Request deletion of your personal data under certain circumstances.",
      action: "Delete Account",
      timeframe: "Response within 30 days"
    },
    {
      id: "portability",
      title: "Right to Data Portability",
      icon: Download,
      description: "Receive your personal data in a structured, machine-readable format.",
      action: "Download Data",
      timeframe: "Response within 30 days"
    },
    {
      id: "restriction",
      title: "Right to Restriction",
      icon: Shield,
      description: "Request restriction of processing of your personal data.",
      action: "Restrict Processing",
      timeframe: "Response within 30 days"
    },
    {
      id: "objection",
      title: "Right to Object",
      icon: Users,
      description: "Object to processing of your personal data for specific purposes.",
      action: "Object to Processing",
      timeframe: "Response within 30 days"
    }
  ];

  const complianceAreas = [
    {
      title: "Data Protection Officer",
      content: "We have appointed a qualified Data Protection Officer (DPO) to oversee GDPR compliance and handle data protection matters."
    },
    {
      title: "Privacy by Design",
      content: "Our platform is built with privacy considerations from the ground up, implementing data protection measures at every stage of development."
    },
    {
      title: "Data Processing Records",
      content: "We maintain comprehensive records of all data processing activities, including purposes, categories of data, and retention periods."
    },
    {
      title: "Impact Assessments",
      content: "We conduct Data Protection Impact Assessments (DPIAs) for high-risk processing activities to identify and mitigate privacy risks."
    },
    {
      title: "Breach Notification",
      content: "We have procedures in place to detect, report, and investigate personal data breaches within the required 72-hour timeframe."
    },
    {
      title: "Third-Party Compliance",
      content: "All our partners and service providers are contractually required to comply with GDPR and maintain appropriate data protection standards."
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
                GDPR Compliance
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Learn about your data protection rights under the General Data Protection Regulation and how we ensure compliance.
              </p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Shield className="w-3 h-3 mr-1" />
                  GDPR Compliant
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  EU Data Protection
                </Badge>
              </div>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <span>Effective Date: May 25, 2018</span>
                <span>•</span>
                <span>Last Updated: September 13, 2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* Your Rights Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Your Data Protection Rights
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {gdprRights.map((right) => (
                <Card key={right.id} className="animate-fade-in hover-scale">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <right.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">
                          {right.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {right.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Button size="sm" variant="outline" className="hover-scale">
                            {right.action}
                          </Button>
                          <span className="text-xs text-muted-foreground">
                            {right.timeframe}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How We Ensure Compliance */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              How We Ensure GDPR Compliance
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {complianceAreas.map((area, index) => (
                <Card key={index} className="animate-fade-in hover-scale">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      {area.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {area.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Basis */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="animate-fade-in">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Legal Basis for Processing
                </h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Contract Performance</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        We process your data to provide our educational platform services as outlined in our Terms of Service.
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• Account creation and management</li>
                        <li>• Service delivery and support</li>
                        <li>• Payment processing</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Legitimate Interest</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        We process data for legitimate business interests while respecting your rights and freedoms.
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• Platform security and fraud prevention</li>
                        <li>• Service improvement and analytics</li>
                        <li>• Business communications</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Consent</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        For certain processing activities, we rely on your explicit consent, which you can withdraw at any time.
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• Marketing communications</li>
                        <li>• Optional cookies and tracking</li>
                        <li>• Newsletter subscriptions</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Legal Obligation</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        We process data when required by law or to comply with legal obligations.
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• Tax and accounting requirements</li>
                        <li>• Regulatory compliance</li>
                        <li>• Legal proceedings</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact DPO */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="animate-fade-in">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Contact Our Data Protection Officer
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  If you have any questions about GDPR compliance, want to exercise your rights, 
                  or need to report a data protection concern, contact our DPO.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="hover-scale" onClick={() => window.location.href = '/contact'}>
                    <Shield className="w-4 h-4 mr-2" />
                    Contact DPO
                  </Button>
                  <Button variant="outline" className="hover-scale" onClick={() => window.location.href = '/'}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>Email: dpo@horizonplays.com</p>
                  <p>Response time: Within 30 days as required by GDPR</p>
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

export default GDPRCompliance;