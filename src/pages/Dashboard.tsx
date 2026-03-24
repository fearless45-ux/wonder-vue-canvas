import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  CreditCard, PenLine, Heart, Trophy, Calendar, TrendingUp, LogOut, User, Settings,
} from "lucide-react";

const mockScores = [
  { id: 1, score: 38, date: "2026-03-20" },
  { id: 2, score: 32, date: "2026-03-14" },
  { id: 3, score: 41, date: "2026-03-07" },
  { id: 4, score: 29, date: "2026-02-28" },
  { id: 5, score: 35, date: "2026-02-21" },
];

const Dashboard = () => {
  const [scores, setScores] = useState(mockScores);
  const [newScore, setNewScore] = useState("");
  const [newDate, setNewDate] = useState("");

  const handleAddScore = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(newScore);
    if (val < 1 || val > 45 || !newDate) return;
    const updated = [{ id: Date.now(), score: val, date: newDate }, ...scores.slice(0, 4)];
    setScores(updated);
    setNewScore("");
    setNewDate("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-primary h-16 flex items-center px-4 sticky top-0 z-40">
        <Link to="/" className="font-display text-xl font-bold text-primary-foreground tracking-tight">
          Birdie<span className="text-secondary">Fund</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link to="/admin" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80">Admin</Link>
          <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Settings size={16} />
          </Button>
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut size={16} />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">Welcome back, John</h1>
          <p className="text-muted-foreground text-sm mb-8">Here's your golf & giving overview.</p>
        </motion.div>

        {/* Status cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: CreditCard, label: "Subscription", value: "Active", sub: "Renews Apr 20, 2026", color: "text-secondary" },
            { icon: TrendingUp, label: "Average Score", value: "35", sub: "Last 5 rounds", color: "text-accent" },
            { icon: Trophy, label: "Total Winnings", value: "£250", sub: "2 draws won", color: "text-secondary" },
            { icon: Heart, label: "Charity Given", value: "£48.50", sub: "Swing for Hope", color: "text-accent" },
          ].map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <card.icon className={`w-5 h-5 ${card.color}`} />
                    </div>
                    <span className="text-sm text-muted-foreground">{card.label}</span>
                  </div>
                  <div className="font-display text-2xl font-bold text-foreground">{card.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{card.sub}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Score entry */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <PenLine className="w-5 h-5 text-secondary" /> Your Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddScore} className="flex gap-3 mb-6">
                  <Input
                    type="number"
                    placeholder="Score (1-45)"
                    min={1}
                    max={45}
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                    className="max-w-[140px]"
                  />
                  <Input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="max-w-[180px]"
                  />
                  <Button type="submit" variant="hero" size="default">Add Score</Button>
                </form>
                <div className="space-y-3">
                  {scores.map((s, i) => (
                    <div key={s.id} className="flex items-center justify-between py-3 px-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-lg font-bold text-foreground w-8">{s.score}</span>
                        <span className="text-xs text-muted-foreground">Stableford</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(s.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                      {i === 0 && <Badge variant="secondary" className="bg-secondary/15 text-secondary border-0">Latest</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming draw */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2 text-base">
                  <Trophy className="w-5 h-5 text-secondary" /> Next Draw
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-foreground mb-1">Apr 1, 2026</div>
                  <p className="text-sm text-muted-foreground mb-4">Prize pool: <span className="font-semibold text-secondary">£5,200</span></p>
                  <div className="flex justify-center gap-2">
                    {scores.slice(0, 5).map((s) => (
                      <div key={s.id} className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-display font-bold text-primary-foreground text-sm">
                        {s.score}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Your draw numbers are your latest scores</p>
                </div>
              </CardContent>
            </Card>

            {/* Charity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2 text-base">
                  <Heart className="w-5 h-5 text-accent" /> Your Charity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground">Swing for Hope</h4>
                  <p className="text-sm text-muted-foreground mt-1">Youth Development</p>
                  <div className="mt-4 p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">Your contribution</div>
                    <div className="font-display text-lg font-bold text-foreground">15%</div>
                    <div className="text-xs text-muted-foreground">of each subscription</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
