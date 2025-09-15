import { 
  Target, 
  Heart, 
  Award, 
  Users, 
  Globe, 
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const AboutSection = () => {
  const companyInfo = {
    name: "HORIZON PLAYS LTD",
    registration: "16701497",
    founded: "8 September 2025",
    phone: "+447537167050",
    email: "director@horizonplays.com",
    address: "105 Southwood Rd, London SE9 3QH, United Kingdom"
  };

  const stats = [
    {
      icon: Users,
      value: "1M+",
      label: "Students Engaged",
      description: "Active learners using our platform globally"
    },
    {
      icon: Globe,
      value: "23+",
      label: "Languages Supported",
      description: "Making education accessible worldwide"
    },
    {
      icon: TrendingUp,
      value: "500K+",
      label: "Games Created",
      description: "Educational games built by our community"
    },
    {
      icon: Award,
      value: "99.9%",
      label: "Uptime",
      description: "Reliable platform you can count on"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Innovation-Driven",
      description: "We leverage cutting-edge AI technology to revolutionize how educational content is created and delivered."
    },
    {
      icon: Heart,
      title: "Education-Focused",
      description: "Every feature we build is designed with educators and learners in mind, making learning engaging and effective."
    },
    {
      icon: Users,
      title: "Community-Centered",
      description: "We believe in building a supportive community where educators can share, learn, and grow together."
    },
    {
      icon: Globe,
      title: "Globally Accessible",
      description: "Education knows no borders. We're committed to making our platform available and affordable worldwide."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            About Horizon Plays
            <span className="gradient-text block">Revolutionizing Educational Gaming</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Founded in 2025, we're on a mission to make educational content creation effortless and engaging 
            for educators worldwide through the power of artificial intelligence.
          </p>
        </div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Our Story</h3>
            <p className="text-muted-foreground leading-relaxed">
              Horizon Plays was born from a simple observation: creating engaging educational content 
              shouldn't take hours of technical work. Founded in London in 2025, we set out to democratize 
              educational game creation through artificial intelligence.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our AI assistant Ray can generate complete educational games in just 30 seconds, 
              transforming how teachers, trainers, and content creators approach interactive learning. 
              From simple quizzes to complex crossword puzzles, we make it possible for anyone to 
              create professional-quality educational games.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we proudly serve over 1 million students across 23+ countries, supporting 
              educators with tools that make learning more engaging, accessible, and effective.
            </p>
          </div>

          <div className="space-y-6">
            <div className="game-card">
              <h4 className="font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 text-primary mr-2" />
                Our Mission
              </h4>
              <p className="text-muted-foreground">
                To empower educators worldwide with AI-powered tools that make creating 
                engaging educational content effortless, accessible, and impactful.
              </p>
            </div>
            
            <div className="game-card">
              <h4 className="font-semibold mb-4 flex items-center">
                <Heart className="w-5 h-5 text-success mr-2" />
                Our Vision
              </h4>
              <p className="text-muted-foreground">
                A world where every educator has the tools to create compelling, 
                interactive learning experiences that inspire and engage students globally.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center game-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon bg-primary/10 mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="stats-counter mb-2">{stat.value}</div>
              <h4 className="font-semibold mb-2">{stat.label}</h4>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Our Values</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do, from product development to customer support.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="game-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="feature-icon bg-primary/10 flex-shrink-0">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3">{value.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-3xl p-8 border border-primary/10">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Company Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-medium">Founded:</span>
                    <span className="text-muted-foreground ml-2">{companyInfo.founded}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-medium">Registration:</span>
                    <span className="text-muted-foreground ml-2">{companyInfo.registration}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <span className="font-medium block">Headquarters:</span>
                    <span className="text-muted-foreground">{companyInfo.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-medium">Email:</span>
                    <a 
                      href={`mailto:${companyInfo.email}`} 
                      className="text-primary hover:underline ml-2"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-medium">Phone:</span>
                    <a 
                      href={`tel:${companyInfo.phone}`} 
                      className="text-primary hover:underline ml-2"
                    >
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    We're always happy to hear from educators, students, and partners. 
                    Reach out to learn more about how Horizon Plays can transform your educational content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;