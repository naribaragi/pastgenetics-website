import { Search, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-coral flex items-center justify-center">
            <span className="text-lg font-bold text-white">P</span>
          </div>
          <span className="text-xl font-bold">PromptBase</span>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                Categories <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>Midjourney</DropdownMenuItem>
              <DropdownMenuItem>ChatGPT</DropdownMenuItem>
              <DropdownMenuItem>DALL-E</DropdownMenuItem>
              <DropdownMenuItem>Stable Diffusion</DropdownMenuItem>
              <DropdownMenuItem>GPT-4</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search Bar */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search prompts"
              className="pl-10 bg-muted/50 border-border/50 focus:bg-background"
            />
          </div>

          <Button variant="ghost" size="sm">
            Hire
          </Button>
          <Button variant="ghost" size="sm">
            Create
          </Button>
          <Button variant="default" size="sm" className="bg-coral hover:bg-coral-hover">
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