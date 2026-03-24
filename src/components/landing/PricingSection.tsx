import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Monthly",
    price: "£9.99",
    period: "/month",
    features: [
      "Enter monthly prize draws",
      "Log & track your scores",
      "Choose your charity",
      "Full dashboard access",
      "Winner verification support",
    ],
    featured: false,
  },
  {
    name: "Yearly",
    price: "£89.99",
    period: "/year",
    badge: "Save 25%",
    features: [
      "Everything in Monthly",
      "Priority draw entry",
      "Extended score history",
      "Exclusive charity events",
      "Early access to features",
    ],
    featured: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Pricing</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-3">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Every plan includes charity contributions, draw entries, and full platform access.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl p-8 ${
                plan.featured
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-card shadow-card border border-border"
              }`}
            >
              {plan.badge && (
                <span className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="font-display text-4xl font-bold">{plan.price}</span>
                <span className={`text-sm ${plan.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.featured ? "text-secondary" : "text-secondary"}`} />
                    <span className={plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button
                  variant={plan.featured ? "hero" : "default"}
                  size="lg"
                  className="w-full"
                >
                  Subscribe Now
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
