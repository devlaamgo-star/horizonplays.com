import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import GameTypesSection from "@/components/GameTypesSection";
import PricingSection from "@/components/PricingSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Horizon Plays - Create Educational Games in 30 Seconds with AI"
        description="Transform learning with AI-powered educational game creation. Build interactive quizzes, flashcards, and 19+ game types instantly. Trusted by educators worldwide. Start free today!"
        keywords="educational games, AI game creator, interactive learning, classroom games, quiz maker, educational technology, teaching tools, student engagement, learning platform, game-based learning"
        canonical="/"
      />
      <Header />
      <HeroSection />
      <GameTypesSection />
      <FeaturesSection />
      <PricingSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
