import { motion } from "framer-motion";
import { UserPlus, PenLine, Ticket, Heart } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Subscribe",
    desc: "Choose a monthly or yearly plan. A portion of your fee goes directly to your chosen charity.",
  },
  {
    icon: PenLine,
    title: "Log Your Scores",
    desc: "Enter your latest 5 Stableford scores. Your rolling history powers your draw entries.",
  },
  {
    icon: Ticket,
    title: "Enter the Draw",
    desc: "Each month, your scores become your ticket numbers. Match 3, 4, or all 5 to win.",
  },
  {
    icon: Heart,
    title: "Make an Impact",
    desc: "Win or not, every subscription fuels charitable giving. Track your impact in real-time.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-surface-cool">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">How It Works</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-3">
            Four steps to play, win & give
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-card rounded-xl p-6 shadow-card text-center group hover:shadow-glow transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary/25 transition-colors">
                <step.icon className="w-6 h-6 text-secondary" />
              </div>
              <span className="absolute top-4 right-4 text-xs font-display font-bold text-muted-foreground/40">
                0{i + 1}
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
