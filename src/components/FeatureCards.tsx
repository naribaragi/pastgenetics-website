import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Smartphone, MessageCircle, Search } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Hire an AI Creator",
    description: "Discover world class AI experts",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop&crop=faces",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    icon: Smartphone,
    title: "Build an AI App", 
    description: "Create AI apps using prompts",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop",
    color: "from-green-500/20 to-cyan-500/20"
  },
  {
    icon: MessageCircle,
    title: "Join a Community",
    description: "Chat with other AI creators",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    icon: Search,
    title: "Explore the Marketplace",
    description: "Browse 210k+ quality prompts",
    image: "https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?w=400&h=200&fit=crop",
    color: "from-purple-500/20 to-pink-500/20"
  }
];

const FeatureCards = () => {
  return (
    <section className="py-16 container px-4 max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-60">
              <img 
                src={feature.image} 
                alt={feature.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color}`} />
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-6 h-48 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-coral transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  {feature.description}
                </p>
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;