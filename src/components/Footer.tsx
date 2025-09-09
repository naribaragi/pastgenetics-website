import { memo } from "react";

const utilityLinks = [
  { text: "FAQ", href: "/faq" },
  { text: "Contact", href: "/contact" },
  { text: "Changelog", href: "/changelog" },
  { text: "Blog", href: "/blog" },
  { text: "Privacy", href: "/privacy" },
  { text: "Terms", href: "/terms" },
  { text: "Leaderboard", href: "/leaderboard" },
  { text: "Affiliates", href: "/affiliates" },
];

const socialLinks = [
  { name: "Instagram", href: "#", icon: "📷" },
  { name: "Threads", href: "#", icon: "@" },
  { name: "X/Twitter", href: "#", icon: "𝕏" },
  { name: "Reddit", href: "#", icon: "🔴" },
  { name: "Discord", href: "#", icon: "💬" },
];

const categoryLinks = [
  { text: "Best AI prompts", href: "/best" },
  { text: "Art & Illustration prompts", href: "/art-illustration" },
  { text: "Logo & Icon prompts", href: "/logo-icon" },
  { text: "Graphic & Design prompts", href: "/graphic-design" },
  { text: "Productivity & Writing prompts", href: "/productivity-writing" },
  { text: "Marketing & Business prompts", href: "/marketing-business" },
  { text: "Photography prompts", href: "/photography" },
  { text: "Games & 3D prompts", href: "/games-3d" },
  { text: "Sitemap", href: "/sitemap" },
];

const modelLinks = [
  { text: "Image prompts", href: "/image-prompts" },
  { text: "Text prompts", href: "/text-prompts" },
  { text: "Video prompts", href: "/video-prompts" },
  { text: "Free prompts", href: "/free-prompts" },
  { text: "Midjourney prompts", href: "/midjourney" },
  { text: "Sora prompts", href: "/sora" },
  { text: "FLUX prompts", href: "/flux" },
  { text: "DALL·E prompts", href: "/dalle" },
  { text: "ChatGPT Image prompts", href: "/chatgpt-image" },
  { text: "Gemini Image prompts", href: "/gemini-image" },
  { text: "KLING AI prompts", href: "/kling-ai" },
  { text: "Hailuo AI prompts", href: "/hailuo-ai" },
  { text: "Google Imagen prompts", href: "/google-imagen" },
  { text: "Stable Diffusion prompts", href: "/stable-diffusion" },
  { text: "DeepSeek prompts", href: "/deepseek" },
  { text: "ChatGPT prompts", href: "/chatgpt" },
  { text: "Leonardo Ai prompts", href: "/leonardo-ai" },
  { text: "Llama prompts", href: "/llama" },
  { text: "Claude prompts", href: "/claude" },
  { text: "Ideogram prompts", href: "/ideogram" },
  { text: "Gemini prompts", href: "/gemini" },
  { text: "Grok prompts", href: "/grok" },
  { text: "Grok Image prompts", href: "/grok-image" },
];

const Footer = memo(() => {
  return (
    <footer id="site-footer" role="contentinfo" className="new-footer-wrapper">
      <div className="new-footer-container">
        {/* Tier 1: Centered Rows */}
        <div className="new-footer-tier-1">
          {/* Copyright */}
          <div className="new-footer-copyright">© PastGenetics 2025</div>

          {/* Utility Nav */}
          <nav aria-label="Footer utility links" className="new-footer-utility-nav">
            {utilityLinks.map((link, index) => (
              <span key={link.text}>
                <a
                  href={link.href}
                  className="new-footer-utility-link"
                  data-track={`footer_utility_${link.text.toLowerCase()}`}
                >
                  {link.text}
                </a>
                {index < utilityLinks.length - 1 && (
                  <span className="new-footer-separator"> • </span>
                )}
              </span>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="new-footer-social-row">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={`Follow us on ${social.name}`}
                className="new-footer-social-icon"
                data-track={`footer_social_${social.name.toLowerCase()}`}
              >
                <span>{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="new-footer-divider" />

        {/* Tier 2: Two Link Columns */}
        <div className="new-footer-tier-2">
          {/* Categories Column */}
          <div className="new-footer-column">
            <h3 className="new-footer-column-title">CATEGORIES</h3>
            <nav aria-label="Categories">
              <ul className="new-footer-column-links">
                {categoryLinks.map((link) => (
                  <li key={link.text}>
                    <a href={link.href} className="new-footer-column-link">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Models Column */}
          <div className="new-footer-column">
            <h3 className="new-footer-column-title">MODELS</h3>
            <nav aria-label="AI Models">
              <ul className="new-footer-column-links">
                {modelLinks.map((link) => (
                  <li key={link.text}>
                    <a href={link.href} className="new-footer-column-link">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
