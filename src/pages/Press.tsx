import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Image, 
  FileText, 
  Video, 
  ExternalLink,
  Calendar,
  Award,
  Users,
  Globe
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Press = () => {
  const pressReleases = [
    {
      date: "2025-01-15",
      title: "HorizonPlays Reaches 2 Million Educational Games Created Milestone",
      excerpt: "Platform celebrates significant growth in educator adoption across 120+ countries",
      category: "Company News"
    },
    {
      date: "2024-11-20", 
      title: "HorizonPlays Wins 'Best EdTech Innovation' at Global Education Awards 2024",
      excerpt: "AI-powered game creation platform recognized for transforming classroom engagement",
      category: "Awards"
    },
    {
      date: "2024-09-10",
      title: "New AI Assistant 'Ray' Revolutionizes Educational Game Creation",
      excerpt: "Breakthrough technology enables educators to create interactive learning games in under 30 seconds",
      category: "Product"
    },
    {
      date: "2024-06-05",
      title: "HorizonPlays Expands to 120+ Countries with Multilingual Support",
      excerpt: "Global expansion includes support for 25 languages to serve diverse educational communities",
      category: "Company News"
    }
  ];

  const mediaKit = [
    {
      title: "Company Logo Package",
      description: "High-resolution logos in various formats (PNG, SVG, EPS)",
      type: "Images",
      icon: Image,
      size: "2.5 MB"
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics, milestones, and company information",
      type: "PDF",
      icon: FileText,
      size: "245 KB"
    },
    {
      title: "Leadership Photos",
      description: "Professional headshots of executive team members",
      type: "Images", 
      icon: Image,
      size: "8.2 MB"
    },
    {
      title: "Product Screenshots",
      description: "High-resolution platform interface and feature screenshots",
      type: "Images",
      icon: Image,
      size: "12.4 MB"
    },
    {
      title: "Demo Video", 
      description: "3-minute product demonstration video for media use",
      type: "Video",
      icon: Video,
      size: "45.2 MB"
    },
    {
      title: "Brand Guidelines",
      description: "Complete brand usage guidelines and style guide", 
      type: "PDF",
      icon: FileText,
      size: "1.8 MB"
    }
  ];

  const awards = [
    {
      year: "2024",
      title: "Best EdTech Innovation",
      organization: "Global Education Awards",
      description: "Recognized for AI-powered educational game creation technology"
    },
    {
      year: "2024", 
      title: "Top 50 EdTech Companies to Watch",
      organization: "EdTech Digest",
      description: "Listed among the most promising educational technology companies"
    },
    {
      year: "2024",
      title: "Innovation in Learning Award",
      organization: "Learning Technologies Conference",
      description: "Honored for advancing interactive learning methodologies"
    }
  ];

  const keyStats = [
    { number: "50K+", label: "Active Educators", icon: Users },
    { number: "2M+", label: "Games Created", icon: FileText },
    { number: "15M+", label: "Students Engaged", icon: Users },
    { number: "120+", label: "Countries", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-gradient-to-br from-background via-background to-muted/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-5xl font-bold mb-6">
              Press & Media
              <span className="gradient-text block">Resources for Journalists & Media</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get the latest news, company information, and media assets for HorizonPlays. 
              For press inquiries, please contact our media relations team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero">Contact Media Relations</Button>
              <Button variant="outline" className="btn-hero-outline">Download Media Kit</Button>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {keyStats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Press Releases */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12">Latest Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="secondary">{release.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(release.date).toLocaleDateString('en-GB', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                      <p className="text-muted-foreground">{release.excerpt}</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-6">
                      Read More
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Media Kit */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12">Media Kit & Assets</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaKit.map((item, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {item.type} • {item.size}
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12">Awards & Recognition</h2>
            <div className="space-y-6">
              {awards.map((award, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <Badge variant="secondary">{award.year}</Badge>
                        <h3 className="text-xl font-semibold">{award.title}</h3>
                      </div>
                      <p className="text-primary font-medium mb-1">{award.organization}</p>
                      <p className="text-sm text-muted-foreground">{award.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Company Information */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">About HorizonPlays</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  HorizonPlays is a leading educational technology company that empowers educators 
                  to create engaging, interactive learning experiences through AI-powered game creation tools.
                </p>
                <p>
                  Founded in 2023, the company serves over 50,000 active educators across 120+ countries, 
                  facilitating the creation of more than 2 million educational games that have engaged 
                  over 15 million students worldwide.
                </p>
                <p>
                  The platform's revolutionary AI assistant, Ray, enables educators to create 
                  professional-quality educational games in under 30 seconds, democratizing 
                  access to interactive learning tools.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Media Contact</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Press Inquiries</h3>
                  <p className="text-muted-foreground">press@horizonplays.com</p>
                </div>
                <div>
                  <h3 className="font-semibold">Media Relations Manager</h3>
                  <p className="text-muted-foreground">Sarah Johnson</p>
                  <p className="text-muted-foreground">+44 20 1234 5678</p>
                </div>
                <div>
                  <h3 className="font-semibold">General Inquiries</h3>
                  <p className="text-muted-foreground">director@horizonplays.com</p>
                </div>
                <div>
                  <h3 className="font-semibold">Company Address</h3>
                  <p className="text-muted-foreground">
                    105 Southwood Rd<br />
                    London SE9 3QH<br />
                    United Kingdom
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Media Inquiry Form */}
          <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/10">
            <h2 className="text-3xl font-bold mb-4">Media Inquiry</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Are you a journalist or media professional looking for more information? 
              We're here to help with your story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero">Submit Media Inquiry</Button>
              <Button variant="outline" className="btn-hero-outline">Schedule Interview</Button>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Press;