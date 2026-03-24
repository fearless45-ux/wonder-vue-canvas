import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const charities = [
  { name: "Swing for Hope", category: "Youth Development", raised: "£12,400", color: "bg-secondary/15" },
  { name: "Green Fairways Trust", category: "Environment", raised: "£8,750", color: "bg-accent/15" },
  { name: "Par for the Course", category: "Mental Health", raised: "£15,200", color: "bg-primary/10" },
];

const CharitySpotlight = () => {
  return (
    <section id="charities" className="py-24 bg-surface-warm">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Charity Impact</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-5">
              Every subscription makes a <span className="text-gradient-amber">real difference</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Choose from our curated directory of charities. A minimum of 10% of your subscription goes directly to your selected cause — and you can give even more if you wish.
            </p>
            <Button variant="default" size="lg" className="group">
              Explore All Charities
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <div className="space-y-4">
            {charities.map((charity, i) => (
              <motion.div
                key={charity.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-5 shadow-card flex items-center gap-5 hover:shadow-glow transition-shadow duration-300"
              >
                <div className={`w-12 h-12 rounded-lg ${charity.color} flex items-center justify-center flex-shrink-0`}>
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-semibold text-foreground">{charity.name}</h4>
                  <p className="text-sm text-muted-foreground">{charity.category}</p>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-secondary">{charity.raised}</div>
                  <div className="text-xs text-muted-foreground">raised</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharitySpotlight;
