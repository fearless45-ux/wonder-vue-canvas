import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Trophy, Target } from "lucide-react";
import heroGlow from "@/assets/hero-glow.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-hero overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-30">
        <img src={heroGlow} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary" />

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6">
              Play · Win · Give Back
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Your Golf Scores.{" "}
            <span className="text-gradient-amber">Real Impact.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10"
          >
            Subscribe, log your scores, and enter monthly draws — all while funding the charities you care about most.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/signup">
              <Button variant="hero" size="lg" className="text-base px-8 py-6">
                Start Your Journey
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="hero-outline" size="lg" className="text-base px-8 py-6">
                See How It Works
              </Button>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { icon: Heart, label: "Charities Supported", value: "24+" },
              { icon: Trophy, label: "Monthly Prize Pool", value: "£5K+" },
              { icon: Target, label: "Active Members", value: "1.2K" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-5 h-5 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-xs text-primary-foreground/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
