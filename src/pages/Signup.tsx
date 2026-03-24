import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card rounded-2xl p-8 shadow-card"
      >
        <Link to="/" className="font-display text-2xl font-bold text-foreground tracking-tight block text-center mb-2">
          Birdie<span className="text-secondary">Fund</span>
        </Link>
        <p className="text-sm text-muted-foreground text-center mb-8">Create your account and start making an impact.</p>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first">First Name</Label>
              <Input id="first" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last">Last Name</Label>
              <Input id="last" placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type={showPw ? "text" : "password"} placeholder="Min 8 characters" />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <Button variant="hero" size="lg" className="w-full">Create Account</Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary font-semibold hover:underline">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
