import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Building2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";

const PricingSection = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  
  const plans = [
    {
      name: "Basic",
      price: "Free",
      usdPrice: 0,
      period: "forever",
      description: "Perfect for teachers getting started",
      icon: Zap,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      popular: false,
      features: [
        "Create unlimited games",
        "Public games only",
        "Basic game types",
        "Standard sharing options",
        "Basic analytics",
        "Community support",
        "Ad-supported experience"
      ]
    },
    {
      name: "Advanced",
      price: null,
      usdPrice: 9.99,
      period: "per month",
      description: "For serious educators and trainers",
      icon: Crown,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      popular: true,
      features: [
        "Everything in Basic",
        "Private games",
        "Remove all advertisements",
        "Enhanced customization",
        "Advanced analytics",
        "Require player identification",
        "Priority email support",
        "Game templates library"
      ]
    },
    {
      name: "Academic",
      price: null,
      usdPrice: 19.99,
      period: "per month",
      description: "Perfect for schools and institutions",
      icon: Building2,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      popular: false,
      features: [
        "Everything in Advanced",
        "LMS integration (Google Classroom, Teams)",
        "SCORM export",
        "Bulk game management",
        "Student progress tracking",
        "Advanced reporting",
        "White-label options",
        "Phone support"
      ]
    },
    {
      name: "Commercial",
      price: null,
      usdPrice: 49.99,
      period: "per month",
      description: "For businesses and large organizations",
      icon: Sparkles,
      color: "text-primary-light",
      bgColor: "bg-primary-light/10",
      borderColor: "border-primary-light/20",
      popular: false,
      features: [
        "Everything in Academic",
        "Custom branding/logos",
        "Corporate color schemes",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "99.9% uptime SLA",
        "24/7 priority support"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Simple, Transparent Pricing
            <span className="gradient-text block">for Every Educator</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Start free and upgrade as you grow. All plans include our AI assistant Ray and unlimited game creation.
          </p>
          
          {/* Annual Discount Banner */}
          <div className="inline-flex items-center space-x-2 bg-success/10 border border-success/20 rounded-full px-4 py-2 text-sm font-medium text-success mt-6">
            <Sparkles className="w-4 h-4" />
            <span>Save 20% with annual billing</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative game-card ${plan.popular ? `${plan.borderColor} ring-2 ring-primary/20` : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-primary-light text-white text-xs font-semibold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="text-center">
                {/* Icon */}
                <div className={`feature-icon ${plan.bgColor} mx-auto mb-4`}>
                  <plan.icon className={`w-6 h-6 ${plan.color}`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                
                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl font-bold">
                    {plan.price || formatPrice(plan.usdPrice)}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                {/* CTA Button */}
                <Button 
                  className={`w-full mb-6 ${plan.popular ? 'btn-hero' : 'btn-hero-outline'}`}
                  onClick={() => navigate(`/checkout?plan=${plan.name.toLowerCase()}`)}
                >
                  {plan.name === "Basic" ? "Start Free" : "Choose Plan"}
                </Button>

                {/* Features */}
                <div className="space-y-3 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-3xl p-8 border border-primary/10">
          <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We offer custom enterprise solutions with dedicated support, custom integrations, 
            and tailored features for large organizations and educational institutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="btn-hero-outline"
              onClick={() => navigate('/contact')}
            >
              Contact Sales
            </Button>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Check className="w-4 h-4 text-success mr-1" />
                Custom pricing
              </span>
              <span className="flex items-center">
                <Check className="w-4 h-4 text-success mr-1" />
                Dedicated support
              </span>
              <span className="flex items-center">
                <Check className="w-4 h-4 text-success mr-1" />
                SLA guarantee
              </span>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Questions about pricing? 
            <a href="#faq" className="text-primary hover:underline ml-1">
              Check our FAQ
            </a>
            {" "}or{" "}
            <a href="mailto:director@horizonplays.com" className="text-primary hover:underline">
              contact us directly
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
