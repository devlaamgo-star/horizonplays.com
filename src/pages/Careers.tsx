import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Users, 
  Briefcase, 
  Heart, 
  Globe,
  TrendingUp,
  Coffee,
  Lightbulb,
  Award,
  ArrowRight,
  Send
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const benefits = [
    {
      icon: Heart,
      title: "Comprehensive Health Benefits",
      description: "Full medical, dental, and vision coverage for you and your family"
    },
    {
      icon: Globe,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours and async communication"
    },
    {
      icon: TrendingUp,
      title: "Professional Development",
      description: "Annual learning budget, conference attendance, and mentorship programs"
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Unlimited PTO, sabbatical opportunities, and mental health support"
    },
    {
      icon: Users,
      title: "Collaborative Environment",
      description: "Work with passionate educators and technologists changing the world"
    },
    {
      icon: Award,
      title: "Competitive Compensation",
      description: "Equity participation, performance bonuses, and transparent salary bands"
    }
  ];

  const openPositions = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote / London",
      type: "Full-time",
      description: "Join our engineering team to build next-generation educational tools that impact millions of students worldwide."
    },
    {
      title: "Education Technology Specialist",
      department: "Product",
      location: "Remote / London",
      type: "Full-time", 
      description: "Work directly with educators to understand their needs and help shape our product roadmap."
    },
    {
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Remote / London",
      type: "Full-time",
      description: "Help improve our AI assistant Ray and develop new machine learning capabilities for personalized learning."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / London",
      type: "Full-time",
      description: "Build relationships with educational institutions and help them succeed with our platform."
    },
    {
      title: "Content Marketing Manager",
      department: "Marketing",
      location: "Remote / London", 
      type: "Full-time",
      description: "Create compelling content that resonates with educators and showcases the impact of our platform."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote / London",
      type: "Full-time",
      description: "Design intuitive user experiences that make educational game creation accessible to all educators."
    }
  ];

  const values = [
    {
      title: "Student-Centric",
      description: "Every decision we make is guided by what's best for students and their learning outcomes."
    },
    {
      title: "Educator Empowerment", 
      description: "We believe teachers are heroes, and we're here to give them superpowers."
    },
    {
      title: "Inclusive Innovation",
      description: "We build for everyone, ensuring our platform is accessible and culturally responsive."
    },
    {
      title: "Continuous Learning",
      description: "We practice what we preach by constantly learning, growing, and improving."
    }
  ];

  const departments = ["Engineering", "Product", "Design", "Marketing", "Customer Success", "Operations"];
  
  const filteredPositions = selectedDepartment 
    ? openPositions.filter(position => position.department === selectedDepartment)
    : openPositions;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-gradient-to-br from-background via-background to-muted/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-5xl font-bold mb-6">
              Careers at HorizonPlays
              <span className="gradient-text block">Join Our Mission to Transform Education</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're building the future of education, and we need passionate people to join us. 
              Work with a team that's dedicated to making learning engaging, accessible, and effective for everyone.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-primary" />
                <span>50+ Team Members</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-primary" />
                <span>Remote-First</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>London HQ</span>
              </div>
            </div>
          </div>

          {/* Company Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join HorizonPlays?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
            
            {/* Department Filter */}
            <div className="flex justify-center mb-8">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedDepartment === "" ? "default" : "outline"}
                  onClick={() => setSelectedDepartment("")}
                  size="sm"
                >
                  All Departments
                </Button>
                {departments.map((dept) => (
                  <Button
                    key={dept}
                    variant={selectedDepartment === dept ? "default" : "outline"}
                    onClick={() => setSelectedDepartment(dept)}
                    size="sm"
                  >
                    {dept}
                  </Button>
                ))}
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-6">
              {filteredPositions.map((position, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{position.title}</h3>
                        <Badge variant="secondary">{position.department}</Badge>
                        <Badge variant="outline">{position.type}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {position.location}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {position.type}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{position.description}</p>
                    </div>
                    <Button className="btn-hero ml-6">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <Card className="p-8 mb-20">
            <h2 className="text-2xl font-bold mb-6">Don't See Your Role? Get in Touch!</h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals who share our passion for education. 
              Send us your details and let us know how you'd like to contribute to our mission.
            </p>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required placeholder="Doe" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Interested Role/Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
                      ))}
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Tell us about yourself and why you want to join HorizonPlays</Label>
                <Textarea 
                  id="message" 
                  required 
                  placeholder="Share your background, interests, and what excites you about our mission..."
                  className="min-h-[120px]"
                />
              </div>

              <Button type="submit" className="btn-hero">
                <Send className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            </form>
          </Card>

          {/* Culture Section */}
          <Card className="p-12 text-center bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/10">
            <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join a team that's passionate about transforming education and making a real difference 
              in the lives of millions of students around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero">
                View All Open Positions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="btn-hero-outline">
                Learn About Our Culture
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;