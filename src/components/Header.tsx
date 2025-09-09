import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoriesMegaMenu } from "@/components/CategoriesMegaMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Left Cluster: Logo + Categories + Search */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/09480dff-13c6-4546-8882-56167b51a23a.png" 
              alt="PastGenetics" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-foreground">PastGenetics</span>
          </a>

          {/* Categories Mega Menu */}
          <CategoriesMegaMenu />

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex">
            <div className="flex items-center bg-slate-700/80 rounded-full h-12 min-w-80">
              <input 
                type="text" 
                placeholder="Search prompts..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground px-6 py-3 outline-none"
              />
              <button 
                className="search-gradient-button h-12 w-16 rounded-full flex items-center justify-center hover:brightness-105 active:scale-98 focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 transition-all"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-slate-800" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Cluster: Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="primary" size="sm">
            Sell
          </Button>
          <Button variant="outline" size="sm">
            Login
          </Button>
        </nav>

        {/* Mobile menu */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;