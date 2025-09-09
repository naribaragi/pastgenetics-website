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
        {/* Tier A: Simplified Footer */}
        <div className="footer-mega">
          <div className="footer-grid-simplified">
            {/* Column 1: Brand + Newsletter + Social */}
            <FooterSection 
              id="brand" 
              title="PromptBase" 
              isExpanded={expandedSections.includes('brand')}
            >
              <div className="space-y-5">
                <p className="text-[#C9CFDC] text-sm leading-relaxed">
                  The world's largest marketplace for AI prompts. Create, sell, and discover high-quality prompts for all major AI models.
                </p>
                
                {/* Newsletter */}
                <div>
                  <h4 className="text-[#E7EAF2] text-sm font-semibold mb-2">Stay Updated</h4>
                  {!emailSubscribed ? (
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-background/50 border-border/50 text-sm rounded-lg"
                        required
                      />
                      <Button 
                        type="submit"
                        size="sm"
                        className="bg-coral text-background hover:bg-coral/90 rounded-lg px-4"
                      >
                        Subscribe
                      </Button>
                    </form>
                  ) : (
                    <div className="text-coral text-sm font-medium">
                      Thanks—check your inbox!
                    </div>
                  )}
                </div>
                
                {/* Social Icons */}
                <div>
                  <h4 className="text-[#E7EAF2] text-sm font-semibold mb-3">Follow Us</h4>
                  <div className="flex gap-3">
                    {[
                      { name: 'Discord', href: '#', icon: '💬' },
                      { name: 'X/Twitter', href: '#', icon: '𝕏' },
                      { name: 'Instagram', href: '#', icon: '📷' },
                      { name: 'YouTube', href: '#', icon: '📺' },
                      { name: 'Reddit', href: '#', icon: '🔴' },
                      { name: 'Threads', href: '#', icon: '@' }
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
                    { text: 'Affiliates', href: '/affiliates', track: 'footer_company_affiliates' }
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

            {/* Column 3: Resources & Browse */}
            <FooterSection 
              id="resources" 
              title="Resources" 
              isExpanded={expandedSections.includes('resources')}
            >
              <nav aria-label="Resource links">
                <ul className="footer-links">
                  {[
                    { text: 'FAQ & Help', href: '/faq', track: 'footer_resources_faq' },
                    { text: 'Blog', href: '/blog', track: 'footer_resources_blog' },
                    { text: 'Seller Guide', href: '/seller-guide', track: 'footer_resources_seller_guide' },
                    { text: 'Quality Guidelines', href: '/guidelines', track: 'footer_resources_guidelines' },
                    { text: 'API Docs', href: '/api', track: 'footer_resources_api' },
                    { text: 'Changelog', href: '/changelog', track: 'footer_resources_changelog' },
                    { text: 'Leaderboard', href: '/leaderboard', track: 'footer_resources_leaderboard' }
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

            {/* Column 4: Browse (Simplified Categories) */}
            <FooterSection 
              id="browse" 
              title="Browse" 
              isExpanded={expandedSections.includes('browse')}
            >
              <nav aria-label="Browse prompts">
                <ul className="footer-links">
                  {[
                    { text: 'Image Prompts', href: '/image-prompts', track: 'footer_browse_image' },
                    { text: 'Text Prompts', href: '/text-prompts', track: 'footer_browse_text' },
                    { text: 'Video Prompts', href: '/video-prompts', track: 'footer_browse_video' },
                    { text: 'Free Prompts', href: '/free', track: 'footer_browse_free' },
                    { text: 'Trending', href: '/trending', track: 'footer_browse_trending' },
                    { text: 'Popular Models', href: '/models', track: 'footer_browse_models' }
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