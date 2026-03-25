import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import supabase from "@/lib/supabase";

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // 🔥 ROLE-BASED REDIRECT
    if (data.user?.email === "admin@gmail.com") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4 relative">
      
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card rounded-2xl p-8 shadow-card"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <div className="space-y-5">

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <Button className="w-full" onClick={handleLogin}>
            Log In
          </Button>
        </div>

        {/* Signup Link */}
        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login; 