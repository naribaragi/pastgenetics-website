import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Smartphone, MessageCircle, Search } from "lucide-react";
const features = [{
  icon: Users,
  title: "Hire an AI Creator",
  description: "Discover world class AI experts",
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop&crop=faces",
  color: "from-blue-500/20 to-purple-500/20"
}, {
  icon: Smartphone,
  title: "Build an AI App",
  description: "Create AI apps using prompts",
  image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop",
  color: "from-green-500/20 to-cyan-500/20"
}, {
  icon: MessageCircle,
  title: "Join a Community",
  description: "Chat with other AI creators",
  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
  color: "from-orange-500/20 to-red-500/20"
}, {
  icon: Search,
  title: "Explore the Marketplace",
  description: "Browse 210k+ quality prompts",
  image: "https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?w=400&h=200&fit=crop",
  color: "from-purple-500/20 to-pink-500/20"
}];
const FeatureCards = () => {
  return (
    <div className="container px-4 max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="group overflow-hidden bg-card/50 hover:bg-card/80 border-border/50 transition-all duration-300 hover:scale-105">
              <div className={`relative h-32 bg-gradient-to-br ${feature.color}`}>
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default FeatureCards;