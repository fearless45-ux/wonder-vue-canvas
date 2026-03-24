import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="font-display text-xl font-bold text-primary-foreground tracking-tight">
              Birdie<span className="text-secondary">Fund</span>
            </Link>
            <p className="text-sm text-primary-foreground/50 mt-3 leading-relaxed">
              Play golf. Win prizes. Fund change.
            </p>
          </div>
          {[
            { title: "Platform", links: ["How It Works", "Pricing", "Charities", "Draw Results"] },
            { title: "Account", links: ["Log In", "Sign Up", "Dashboard", "Settings"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-primary-foreground text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">© 2026 BirdieFund. All rights reserved.</p>
          <p className="text-xs text-primary-foreground/40 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-accent" /> for charity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
