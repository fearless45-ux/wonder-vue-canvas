import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display text-xl font-bold text-primary-foreground tracking-tight">
          Birdie<span className="text-secondary">Fund</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">How It Works</a>
          <a href="#charities" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Charities</a>
          <a href="#pricing" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Pricing</a>
          <Link to="/login">
            <Button variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="hero" size="lg">Get Started</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-primary border-t border-primary/20 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              <a href="#how-it-works" className="text-primary-foreground/70 hover:text-primary-foreground" onClick={() => setMobileOpen(false)}>How It Works</a>
              <a href="#charities" className="text-primary-foreground/70 hover:text-primary-foreground" onClick={() => setMobileOpen(false)}>Charities</a>
              <a href="#pricing" className="text-primary-foreground/70 hover:text-primary-foreground" onClick={() => setMobileOpen(false)}>Pricing</a>
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full text-primary-foreground/80 hover:bg-primary-foreground/10">Log In</Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                <Button variant="hero" className="w-full">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
