import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['brand']);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setEmailSubscribed(true);
      setTimeout(() => {
        setEmailSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const FooterSection = ({ 
    id, 
    title, 
    children, 
    isExpanded 
  }: { 
    id: string; 
    title: string; 
    children: React.ReactNode; 
    isExpanded: boolean; 
  }) => (
    <div className="footer-column">
      <button
        className="footer-section-toggle md:hidden w-full flex justify-between items-center py-3 text-left focus:outline-none focus:ring-2 focus:ring-[#6CA8FF] rounded"
        onClick={() => toggleSection(id)}
        aria-expanded={isExpanded}
      >
        <h3 className="footer-heading text-[#E7EAF2] uppercase text-sm font-semibold tracking-wide">
          {title}
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-[#C9CFDC]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#C9CFDC]" />
        )}
      </button>
      
      <h3 className="footer-heading hidden md:block text-[#E7EAF2] uppercase text-sm font-semibold tracking-wide mb-3">
        {title}
      </h3>
      
      <div className={`footer-section-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {children}
      </div>
    </div>
  );

  return (
    <footer id="site-footer" role="contentinfo" className="footer-wrapper">
      <div className="footer-separator" />
      
      <div className="footer-container">
        {/* Tier A: Mega Footer */}
        <div className="footer-mega">
          <div className="footer-grid">
            {/* Column 1: Brand */}
            <FooterSection 
              id="brand" 
              title="PromptBase" 
              isExpanded={expandedSections.includes('brand')}
            >
              <div className="space-y-4">
                <p className="text-[#C9CFDC] text-sm leading-relaxed">
                  The world's largest marketplace for AI prompts. Create, sell, and discover high-quality prompts for all major AI models.
                </p>
                
                {/* Newsletter */}
                {!emailSubscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-background/50 border-border/50 text-sm"
                      required
                    />
                    <Button 
                      type="submit"
                      size="sm"
                      className="bg-coral text-background hover:bg-coral/90"
                    >
                      Subscribe
                    </Button>
                  </form>
                ) : (
                  <div className="text-coral text-sm font-medium">
                    Thanks—check your inbox!
                  </div>
                )}
                
                {/* Social Icons */}
                <div className="flex gap-3">
                  {[
                    { name: 'X/Twitter', href: '#', icon: '𝕏' },
                    { name: 'Instagram', href: '#', icon: '📷' },
                    { name: 'YouTube', href: '#', icon: '📺' },
                    { name: 'GitHub', href: '#', icon: '⚡' },
                    { name: 'Discord', href: '#', icon: '💬' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      aria-label={`Follow us on ${social.name}`}
                      className="footer-social-icon"
                      data-track={`footer_social_${social.name.toLowerCase()}`}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </FooterSection>

            {/* Column 2: Company */}
            <FooterSection 
              id="company" 
              title="Company" 
              isExpanded={expandedSections.includes('company')}
            >
              <nav aria-label="Company links">
                <ul className="footer-links">
                  {[
                    { text: 'About', href: '/about', track: 'footer_company_about' },
                    { text: 'Contact', href: '/contact', track: 'footer_company_contact' },
                    { text: 'Careers', href: '/careers', track: 'footer_company_careers' },
                    { text: 'Press Kit', href: '/press', track: 'footer_company_press' },
                    { text: 'Partners', href: '/partners', track: 'footer_company_partners' },
                    { text: 'Changelog', href: '/changelog', track: 'footer_company_changelog' },
                    { text: 'Leaderboard', href: '/leaderboard', track: 'footer_company_leaderboard' }
                  ].map((link) => (
                    <li key={link.track}>
                      <a 
                        href={link.href} 
                        className="footer-link"
                        data-track={link.track}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </FooterSection>

            {/* Column 3: Resources */}
            <FooterSection 
              id="resources" 
              title="Resources" 
              isExpanded={expandedSections.includes('resources')}
            >
              <nav aria-label="Resource links">
                <ul className="footer-links">
                  {[
                    { text: 'Blog', href: '/blog', track: 'footer_resources_blog' },
                    { text: 'FAQ / Help Center', href: '/faq', track: 'footer_resources_faq' },
                    { text: 'Seller Guide', href: '/seller-guide', track: 'footer_resources_seller_guide' },
                    { text: 'Prompt Quality Guidelines', href: '/guidelines', track: 'footer_resources_guidelines' },
                    { text: 'Pricing', href: '/pricing', track: 'footer_resources_pricing' },
                    { text: 'API / Integrations', href: '/api', track: 'footer_resources_api' },
                    { text: 'Sitemap', href: '/sitemap', track: 'footer_resources_sitemap' }
                  ].map((link) => (
                    <li key={link.track}>
                      <a 
                        href={link.href} 
                        className="footer-link"
                        data-track={link.track}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </FooterSection>

            {/* Column 4: Categories */}
            <FooterSection 
              id="categories" 
              title="Categories" 
              isExpanded={expandedSections.includes('categories')}
            >
              <nav aria-label="Category links">
                <ul className="footer-links">
                  {[
                    { text: 'Best AI prompts', href: '/best', track: 'footer_categories_best' },
                    { text: 'Art & Illustration', href: '/art', track: 'footer_categories_art' },
                    { text: 'Logo & Icons', href: '/logos', track: 'footer_categories_logos' },
                    { text: 'Graphic & Design', href: '/design', track: 'footer_categories_design' },
                    { text: 'Productivity & Writing', href: '/productivity', track: 'footer_categories_productivity' },
                    { text: 'Marketing & Business', href: '/marketing', track: 'footer_categories_marketing' },
                    { text: 'Photography', href: '/photography', track: 'footer_categories_photography' },
                    { text: 'Games & 3D', href: '/games', track: 'footer_categories_games' }
                  ].map((link) => (
                    <li key={link.track}>
                      <a 
                        href={link.href} 
                        className="footer-link"
                        data-track={link.track}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a 
                      href="/categories" 
                      className="footer-link footer-view-all"
                      data-track="footer_categories_view_all"
                    >
                      View all →
                    </a>
                  </li>
                </ul>
              </nav>
            </FooterSection>

            {/* Column 5: Models */}
            <FooterSection 
              id="models" 
              title="Models" 
              isExpanded={expandedSections.includes('models')}
            >
              <nav aria-label="Model links">
                <ul className="footer-links">
                  {[
                    { text: 'Midjourney', href: '/midjourney', track: 'footer_models_midjourney' },
                    { text: 'ChatGPT Image', href: '/chatgpt', track: 'footer_models_chatgpt' },
                    { text: 'Sora', href: '/sora', track: 'footer_models_sora' },
                    { text: 'DALL·E', href: '/dalle', track: 'footer_models_dalle' },
                    { text: 'Gemini Image', href: '/gemini', track: 'footer_models_gemini' },
                    { text: 'Stable Diffusion', href: '/stable-diffusion', track: 'footer_models_sd' },
                    { text: 'Ideogram', href: '/ideogram', track: 'footer_models_ideogram' },
                    { text: 'DeepSeek', href: '/deepseek', track: 'footer_models_deepseek' }
                  ].map((link) => (
                    <li key={link.track}>
                      <a 
                        href={link.href} 
                        className="footer-link"
                        data-track={link.track}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a 
                      href="/models" 
                      className="footer-link footer-view-all"
                      data-track="footer_models_view_all"
                    >
                      View all →
                    </a>
                  </li>
                </ul>
              </nav>
            </FooterSection>
          </div>
        </div>

        {/* Tier B: Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © PromptBase 2025
            </div>
            
            <nav aria-label="Footer utility links" className="footer-utility-nav">
              {[
                { text: 'FAQ', href: '/faq' },
                { text: 'Contact', href: '/contact' },
                { text: 'Blog', href: '/blog' },
                { text: 'Privacy', href: '/privacy' },
                { text: 'Terms', href: '/terms' },
                { text: 'Changelog', href: '/changelog' },
                { text: 'Leaderboard', href: '/leaderboard' },
                { text: 'Affiliates', href: '/affiliates' }
              ].map((link, index, array) => (
                <span key={link.text}>
                  <a 
                    href={link.href} 
                    className="footer-utility-link"
                    data-track={`footer_utility_${link.text.toLowerCase()}`}
                  >
                    {link.text}
                  </a>
                  {index < array.length - 1 && <span className="footer-separator"> • </span>}
                </span>
              ))}
            </nav>
            
            <div className="footer-social-compact">
              {[
                { name: 'X/Twitter', href: '#', icon: '𝕏' },
                { name: 'Instagram', href: '#', icon: '📷' },
                { name: 'YouTube', href: '#', icon: '📺' },
                { name: 'GitHub', href: '#', icon: '⚡' },
                { name: 'Discord', href: '#', icon: '💬' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={`Follow us on ${social.name}`}
                  className="footer-social-compact-icon"
                  data-track={`footer_bottom_social_${social.name.toLowerCase()}`}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;