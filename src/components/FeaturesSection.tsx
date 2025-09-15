import { Brain, Gamepad2, Share, BarChart3, Palette, Zap, Users, Shield } from "lucide-react";
import gameTypesImage from "@/assets/game-types-illustration.jpg";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Assistant Ray",
      description: "Generate complete games from just a topic or upload content. Ray creates questions, answers, and designs automatically.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Gamepad2,
      title: "19+ Game Types",
      description: "Quizzes, crosswords, word search, matching games, memory games, and more. Perfect for any subject or age group.",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Share,
      title: "Easy Sharing",
      description: "Share via direct links, QR codes, embed codes, or integrate with Google Classroom and LMS platforms.",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      icon: BarChart3,
      title: "Learning Analytics",
      description: "Track student progress, view detailed reports, and export data. Monitor learning outcomes in real-time.",
      color: "text-primary-light",
      bgColor: "bg-primary-light/10"
    },
    {
      icon: Palette,
      title: "Full Customization",
      description: "Custom themes, backgrounds, time limits, scoring systems, and branding options for premium users.",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Zap,
      title: "30-Second Creation",
      description: "From idea to playable game in under 30 seconds. No technical skills required – just your creativity.",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      icon: Users,
      title: "Multi-language Support",
      description: "Support for 23+ languages including English, Spanish, French, German, Japanese, Chinese, and more.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "Enterprise-grade security, data protection, and privacy compliance. Safe for schools and organizations.",
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Everything You Need to Create
            <span className="gradient-text block">Amazing Educational Games</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful features designed for educators, trainers, and content creators who want to make learning engaging and interactive.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group game-card text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`feature-icon ${feature.bgColor} mx-auto mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">
              From Simple Quizzes to Complex Learning Adventures
            </h3>
            <p className="text-muted-foreground">
              Our platform supports every type of educational game you can imagine. Whether you're creating a quick vocabulary quiz 
              or an elaborate crossword puzzle, our AI assistant Ray helps you build it in seconds.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Quick Creation</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Multiple choice quizzes</li>
                  <li>• True/false questions</li>
                  <li>• Fill in the blanks</li>
                  <li>• Word scrambles</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-success">Advanced Games</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Interactive crosswords</li>
                  <li>• Memory matching</li>
                  <li>• Map-based quizzes</li>
                  <li>• Video Q&A games</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={gameTypesImage}
                alt="Different educational game types showcase"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-white rounded-xl p-3 shadow-lg">
              <div className="text-lg font-bold">19+</div>
              <div className="text-xs">Game Types</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;