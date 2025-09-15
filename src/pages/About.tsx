import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Heart, 
  Award, 
  Globe, 
  Lightbulb,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const stats = [
    { number: "50K+", label: "Active Educators", icon: Users },
    { number: "2M+", label: "Games Created", icon: Target },
    { number: "15M+", label: "Students Engaged", icon: Heart },
    { number: "120+", label: "Countries", icon: Globe },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously push the boundaries of educational technology to create breakthrough learning experiences."
    },
    {
      icon: Heart,
      title: "Accessibility",
      description: "We believe quality education should be accessible to everyone, regardless of their background or resources."
    },
    {
      icon: Users,
      title: "Community",
      description: "We foster a global community of educators who support and learn from each other."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our platform to our customer support."
    }
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      role: "CEO & Co-Founder",
      background: "Former Head of Digital Learning at Cambridge University",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b742?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Dr. James Chen",
      role: "CTO & Co-Founder", 
      background: "AI Research Scientist, Former Google Education",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Education",
      background: "20+ years in K-12 education, Former Principal",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const milestones = [
    { year: "2023", title: "Company Founded", description: "HorizonPlays was founded with a vision to revolutionize education through AI-powered gaming." },
    { year: "2024", title: "AI Assistant Ray", description: "Launched our revolutionary AI assistant that helps educators create games in seconds." },
    { year: "2024", title: "Global Expansion", description: "Expanded to over 120 countries with multilingual support." },
    { year: "2025", title: "2M Games Milestone", description: "Reached 2 million games created by our educator community." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-gradient-to-br from-background via-background to-muted/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-5xl font-bold mb-6">
              About HorizonPlays
              <span className="gradient-text block">Transforming Education Through Gaming</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're on a mission to make learning engaging, accessible, and effective for every student around the world. 
              Our AI-powered platform empowers educators to create interactive learning experiences that inspire and educate.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To democratize quality education by providing educators with powerful, 
                AI-driven tools that make learning interactive, engaging, and effective. 
                We believe that every student deserves access to world-class educational 
                experiences, regardless of their location or circumstances.
              </p>
            </Card>
            
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A world where learning is joyful, accessible, and transformative. 
                Where educators are empowered with cutting-edge technology to create 
                personalized learning experiences that inspire curiosity, critical thinking, 
                and lifelong learning in every student.
              </p>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Leadership Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="p-6 text-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.background}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <Card className="flex-1 p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant="secondary">{milestone.year}</Badge>
                      <h3 className="text-xl font-semibold">{milestone.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;