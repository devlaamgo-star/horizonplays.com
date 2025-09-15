import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, BookOpen, CreditCard, Users, Settings, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "general", name: "General", icon: HelpCircle, color: "bg-blue-100 text-blue-700" },
    { id: "getting-started", name: "Getting Started", icon: BookOpen, color: "bg-green-100 text-green-700" },
    { id: "pricing", name: "Pricing & Billing", icon: CreditCard, color: "bg-purple-100 text-purple-700" },
    { id: "account", name: "Account & Settings", icon: Settings, color: "bg-orange-100 text-orange-700" },
    { id: "collaboration", name: "Collaboration", icon: Users, color: "bg-pink-100 text-pink-700" },
  ];

  const faqs = [
    {
      category: "general",
      question: "What is HorizonPlays?",
      answer: "HorizonPlays is an innovative educational platform that allows teachers and educators to create interactive, gamified learning experiences. Our platform uses AI to help you design engaging games and activities that make learning fun and effective."
    },
    {
      category: "general",
      question: "How does the AI assistant Ray work?",
      answer: "Ray is our intelligent AI assistant that helps you create games faster and more efficiently. Ray can suggest game mechanics, generate content, provide design recommendations, and help optimize your games for better learning outcomes."
    },
    {
      category: "getting-started",
      question: "How do I create my first game?",
      answer: "Getting started is easy! After signing up, click 'Create New Game' from your dashboard. Choose a game type, set your learning objectives, and follow our guided setup process. Ray will assist you throughout the creation process."
    },
    {
      category: "getting-started",
      question: "What types of games can I create?",
      answer: "You can create various types of educational games including quizzes, memory games, word puzzles, drag-and-drop activities, timeline exercises, virtual labs, and more. Each game type is designed to support different learning styles and subjects."
    },
    {
      category: "getting-started",
      question: "Do I need technical skills to use HorizonPlays?",
      answer: "No technical skills required! Our platform is designed to be user-friendly for educators of all technical levels. The intuitive interface and AI assistance make it easy to create professional-quality educational games."
    },
    {
      category: "pricing",
      question: "Is there a free plan available?",
      answer: "Yes! Our Basic plan is completely free and includes unlimited game creation, basic game types, and access to Ray. You can create and share public games without any cost."
    },
    {
      category: "pricing",
      question: "What's the difference between plans?",
      answer: "The Basic plan includes core features with ads. Advanced plan (£9.99/month) removes ads and adds private games, enhanced customization, and priority support. Academic plan (£19.99/month) includes LMS integration and advanced reporting. Commercial plan (£49.99/month) offers custom branding and enterprise features."
    },
    {
      category: "pricing",
      question: "Can I change my plan anytime?",
      answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated accordingly."
    },
    {
      category: "pricing",
      question: "Do you offer discounts for educational institutions?",
      answer: "Yes, we offer special pricing for educational institutions, schools, and non-profit organizations. Contact our sales team for custom pricing and volume discounts."
    },
    {
      category: "account",
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
    },
    {
      category: "account",
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account from your account settings. Please note that this action is permanent and will delete all your games and data. We recommend exporting your games before deletion."
    },
    {
      category: "account",
      question: "How do I change my email address?",
      answer: "You can update your email address in your account settings. We'll send a verification email to your new address to confirm the change."
    },
    {
      category: "collaboration",
      question: "Can I share games with other teachers?",
      answer: "Yes! You can share games publicly or privately with other educators. Advanced plan users can create private games and control access permissions."
    },
    {
      category: "collaboration",
      question: "How does LMS integration work?",
      answer: "Our Academic and Commercial plans include seamless integration with popular Learning Management Systems like Google Classroom, Microsoft Teams, Canvas, and Moodle. Games can be embedded directly into your LMS courses."
    },
    {
      category: "collaboration",
      question: "Can students collaborate on games?",
      answer: "Yes, many of our game types support collaborative features where students can work together, compete in teams, or contribute to shared learning experiences."
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFAQsByCategory = (categoryId: string) => {
    return filteredFAQs.filter(faq => faq.category === categoryId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-gradient-to-br from-background via-background to-muted/20 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-6">
              Frequently Asked Questions
              <span className="gradient-text block">Get the Help You Need</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions about HorizonPlays. Can't find what you're looking for? Contact our support team.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Badge key={category.id} variant="secondary" className={`px-4 py-2 ${category.color}`}>
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </Badge>
            ))}
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {categories.map((category) => {
              const categoryFAQs = getFAQsByCategory(category.id);
              if (categoryFAQs.length === 0) return null;

              return (
                <Card key={category.id} className="p-6">
                  <div className="flex items-center mb-6">
                    <category.icon className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-2xl font-semibold">{category.name}</h2>
                    <Badge variant="outline" className="ml-3">
                      {categoryFAQs.length} questions
                    </Badge>
                  </div>

                  <Accordion type="single" collapsible className="space-y-2">
                    {categoryFAQs.map((faq, index) => (
                      <AccordionItem key={`${category.id}-${index}`} value={`${category.id}-${index}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left font-medium hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-2 pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              );
            })}
          </div>

          {/* No Results */}
          {searchQuery && filteredFAQs.length === 0 && (
            <Card className="p-12 text-center">
              <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any questions matching "{searchQuery}". Try different keywords or contact support.
              </p>
              <Button 
                className="btn-hero-outline"
                onClick={() => navigate('/support')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </Card>
          )}

          {/* Contact Support */}
          <Card className="p-8 text-center mt-12 bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/10">
            <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our support team is here to help you succeed. Get personalized assistance with your account, games, or technical questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-hero"
                onClick={() => navigate('/support')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;