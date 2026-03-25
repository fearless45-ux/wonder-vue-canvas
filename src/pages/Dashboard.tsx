import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LogOut, Settings } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [scores, setScores] = useState<any[]>([]);
  const [newScore, setNewScore] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [drawNumbers, setDrawNumbers] = useState<number[]>([]);
  const [result, setResult] = useState("");

  // ✅ Fetch scores
  const fetchScores = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false })
      .limit(5);

    setScores(data || []);
  };

  // ✅ Fetch last draw
  const fetchLastDraw = async () => {
    const { data } = await supabase
      .from("draws")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      setDrawNumbers(data[0].numbers);
    }
  };

  // ✅ INIT
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      const sub = localStorage.getItem("subscribed");
      setIsSubscribed(sub === "true");

      await fetchScores();
      await fetchLastDraw();
    };

    init();
  }, []);

  // ✅ Add score
  const handleAddScore = async (e: any) => {
    e.preventDefault();
    const val = parseInt(newScore);

    if (isNaN(val) || val < 1 || val > 45) return;

    const { data: userData } = await supabase.auth.getUser();

    await supabase.from("scores").insert({
      user_id: userData.user.id,
      score: val,
      date: newDate,
    });

    setNewScore("");
    await fetchScores();
  };

  // ✅ Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  // ✅ Draw logic
  const generateDraw = () => {
    const nums = new Set<number>();
    while (nums.size < 5) {
      nums.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(nums);
  };

  const calculateMatches = (userScores: number[], draw: number[]) => {
    return userScores.filter((n) => draw.includes(n)).length;
  };

  const getResult = (matches: number) => {
    if (matches === 5) return "JACKPOT 🏆";
    if (matches === 4) return "HIGH REWARD 💰";
    if (matches === 3) return "SMALL WIN 🎯";
    return "No win";
  };

  // ✅ RUN DRAW (with subscription check)
  const runDraw = async () => {
    if (!isSubscribed) {
      alert("Please subscribe to access draws");
      return;
    }

    const draw = generateDraw();
    setDrawNumbers(draw);

    await supabase.from("draws").insert({ numbers: draw });

    const userNumbers = scores.map((s) => s.score);
    const matches = calculateMatches(userNumbers, draw);
    setResult(getResult(matches));
  };

  // ✅ Avg score
  const avgScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length)
      : 0;

  return (
    <div className="min-h-screen bg-background">

      {/* 🔥 HEADER */}
      <header className="bg-primary h-16 flex items-center px-6">
        <Link to="/" className="text-xl font-bold text-white">
          Birdie<span className="text-secondary">Fund</span>
        </Link>

        <div className="ml-6 flex gap-4">
          <Link to="/leaderboard">
            <Button variant="ghost" className="text-white">
              Leaderboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="text-white">
              Home
            </Button>
          </Link>
        </div>

        <div className="ml-auto flex gap-4">
          <Button variant="ghost" size="sm" className="text-white">
            <Settings size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white">
            <LogOut size={16} />
          </Button>
        </div>
      </header>

      {/* 🔥 MAIN */}
      <main className="container mx-auto px-4 py-8">

        <h1 className="text-2xl font-bold mb-2">
          Welcome {user?.email}
        </h1>

        {/* 🔥 STATS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Subscription</p>
              <h2 className="text-xl font-bold">
                {isSubscribed ? "Active" : "Not Subscribed"}
              </h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Avg Score</p>
              <h2 className="text-xl font-bold">{avgScore}</h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Winnings</p>
              <h2 className="text-xl font-bold">£0</h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Charity</p>
              <h2 className="text-xl font-bold">£0</h2>
            </CardContent>
          </Card>
        </div>

        {/* 🔥 CONTENT */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* SCORES */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">

                <h2 className="text-lg font-bold mb-4">Your Scores</h2>

                <form onSubmit={handleAddScore} className="flex gap-2 mb-4">
                  <Input
                    placeholder="Score (1-45)"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                  />
                  <Input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                  <Button type="submit">Add</Button>
                </form>

                {scores.map((s, i) => (
                  <div key={i} className="flex justify-between p-3 border rounded mb-2">
                    <span>{s.score}</span>
                    <span>{new Date(s.date).toLocaleDateString()}</span>
                  </div>
                ))}

              </CardContent>
            </Card>
          </div>

          {/* DRAW */}
          <div>
            <Card>
              <CardContent className="p-6">

                <h2 className="text-lg font-bold mb-4">Next Draw</h2>

                <Button
                  onClick={runDraw}
                  disabled={!isSubscribed}
                  className="mb-4"
                >
                  Run Draw
                </Button>

                <div className="flex gap-2 flex-wrap mb-4">
                  {drawNumbers.map((n) => (
                    <Badge key={n}>{n}</Badge>
                  ))}
                </div>

                <p className="font-medium">{result}</p>

              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;