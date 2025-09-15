import { 
  Brain, 
  Grid3X3, 
  Search, 
  Shuffle, 
  RotateCcw, 
  Mic, 
  MapPin, 
  Play,
  MessageSquare,
  List,
  HelpCircle,
  Navigation
} from "lucide-react";

const GameTypesSection = () => {
  const gameTypes = [
    {
      icon: Brain,
      title: "Quiz Games",
      description: "Multiple choice, true/false, and drag & drop questions",
      examples: "Perfect for assessments and knowledge testing",
      color: "text-primary",
      bgColor: "bg-primary/10",
      popular: true
    },
    {
      icon: Grid3X3,
      title: "Crossword Puzzles",
      description: "Auto-generating intersecting word puzzles",
      examples: "Great for vocabulary and concept reinforcement",
      color: "text-success",
      bgColor: "bg-success/10",
      popular: true
    },
    {
      icon: Search,
      title: "Word Search",
      description: "Customizable word grids with themes",
      examples: "Ideal for language learning and terminology",
      color: "text-warning",
      bgColor: "bg-warning/10",
      popular: true
    },
    {
      icon: Shuffle,
      title: "Matching Games",
      description: "Group cards by categories (2-10 groups)",
      examples: "Classification and association activities",
      color: "text-primary-light",
      bgColor: "bg-primary-light/10",
      popular: false
    },
    {
      icon: RotateCcw,
      title: "Memory Games",
      description: "Flip cards to find matching pairs",
      examples: "Memory training and paired learning",
      color: "text-success",
      bgColor: "bg-success/10",
      popular: false
    },
    {
      icon: Mic,
      title: "Dictation Games",
      description: "Audio-based typing exercises",
      examples: "Listening skills and spelling practice",
      color: "text-warning",
      bgColor: "bg-warning/10",
      popular: false
    },
    {
      icon: MapPin,
      title: "Map Quizzes",
      description: "Interactive geography and diagram labeling",
      examples: "Geography, anatomy, and visual learning",
      color: "text-primary",
      bgColor: "bg-primary/10",
      popular: false
    },
    {
      icon: Play,
      title: "Video Quizzes",
      description: "Embedded video with timed questions",
      examples: "Interactive video lessons and assessments",
      color: "text-success",
      bgColor: "bg-success/10",
      popular: false
    },
    {
      icon: MessageSquare,
      title: "Dialogue Games",
      description: "Conversation practice simulations",
      examples: "Language learning and communication skills",
      color: "text-warning",
      bgColor: "bg-warning/10",
      popular: false
    },
    {
      icon: List,
      title: "Line Ups",
      description: "Sequence ordering activities",
      examples: "Timeline events and process ordering",
      color: "text-primary-light",
      bgColor: "bg-primary-light/10",
      popular: false
    },
    {
      icon: HelpCircle,
      title: "Riddles",
      description: "Text-based puzzle games",
      examples: "Critical thinking and problem solving",
      color: "text-primary",
      bgColor: "bg-primary/10",
      popular: false
    },
    {
      icon: Navigation,
      title: "Froggy Jumps",
      description: "Animated progression games",
      examples: "Gamified learning with progress rewards",
      color: "text-success",
      bgColor: "bg-success/10",
      popular: false
    }
  ];

  return (
    <section id="games" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            19+ Educational Game Types
            <span className="gradient-text block">for Every Learning Style</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From simple quizzes to complex interactive experiences, our platform supports every type of educational game 
            you can imagine. All powered by AI for instant creation.
          </p>
        </div>

        {/* Popular Games Highlight */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <span className="bg-gradient-to-r from-primary to-primary-light text-white text-xs px-2 py-1 rounded-full mr-3">
              MOST POPULAR
            </span>
            Quick Start Game Types
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {gameTypes.filter(game => game.popular).map((game, index) => (
              <div
                key={game.title}
                className="group game-card border-primary/20 hover:border-primary/40"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`feature-icon ${game.bgColor} flex-shrink-0`}>
                    <game.icon className={`w-6 h-6 ${game.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">{game.title}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{game.description}</p>
                    <p className="text-xs text-muted-foreground italic">{game.examples}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Game Types */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6">All Game Types Available</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameTypes.filter(game => !game.popular).map((game, index) => (
              <div
                key={game.title}
                className="group game-card"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`feature-icon ${game.bgColor} flex-shrink-0`}>
                    <game.icon className={`w-5 h-5 ${game.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{game.title}</h4>
                    <p className="text-muted-foreground text-sm mb-1">{game.description}</p>
                    <p className="text-xs text-muted-foreground italic">{game.examples}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Creation Highlight */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-3xl p-8 border border-primary/10">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              AI Assistant Ray Creates Any Game Type
            </h3>
            <p className="text-muted-foreground mb-6">
              Simply describe your topic or upload content, and Ray will automatically select the best game type, 
              generate questions, answers, and even suggest improvements. No game design experience needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Auto-generates content
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Suggests best game type
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Creates in 30 seconds
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameTypesSection;