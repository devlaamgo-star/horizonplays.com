import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-education.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Game Creation</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Create Educational
              <span className="gradient-text block">Games in 30 Seconds</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Build engaging quizzes, crosswords, word games, and 19+ educational game types with our AI assistant Ray. 
              No coding required – just your creativity.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="stats-counter">19+</div>
                <p className="text-sm text-muted-foreground font-medium">Game Types</p>
              </div>
              <div className="text-center">
                <div className="stats-counter flex items-center justify-center">
                  <Clock className="w-8 h-8 mr-2" />
                  30s
                </div>
                <p className="text-sm text-muted-foreground font-medium">Creation Time</p>
              </div>
              <div className="text-center">
                <div className="stats-counter flex items-center justify-center">
                  <Users className="w-8 h-8 mr-2" />
                  1M+
                </div>
                <p className="text-sm text-muted-foreground font-medium">Students</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="btn-hero group" asChild>
                <Link to="/signup">
                  Start Creating Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-muted-foreground">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Free to start
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                No credit card required
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                GDPR compliant
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:order-first xl:order-last">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl float-animation">
              <img
                src={heroImage}
                alt="Educational game creation platform"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-success text-white rounded-2xl p-4 shadow-lg pulse-glow">
              <div className="text-2xl font-bold">AI</div>
              <div className="text-xs">Assistant</div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-warning text-white rounded-2xl p-4 shadow-lg pulse-glow" style={{ animationDelay: '1s' }}>
              <div className="text-2xl font-bold">19+</div>
              <div className="text-xs">Game Types</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;