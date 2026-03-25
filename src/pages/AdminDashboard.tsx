import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Users, Trophy, Heart, BarChart3, Settings, LogOut, Search, Check, X, Dice5, ChevronRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ---------- MOCK DATA ---------- */

const mockUsers = [
  { id: 1, name: "John Smith", email: "john@test.com", plan: "Yearly", status: "Active", scores: [38, 32, 41, 29, 35] },
  { id: 2, name: "Sarah Jones", email: "sarah@test.com", plan: "Monthly", status: "Active", scores: [42, 36, 28, 33, 40] },
  { id: 3, name: "Mike Brown", email: "mike@test.com", plan: "Monthly", status: "Lapsed", scores: [25, 31, 37, 44, 30] },
];

const mockWinners = [
  { id: 1, name: "John Smith", match: "4-Number", prize: "£450", status: "Pending", month: "March 2026" },
  { id: 2, name: "Sarah Jones", match: "3-Number", prize: "£125", status: "Paid", month: "March 2026" },
];

const mockCharities = [
  { id: 1, name: "Swing for Hope", category: "Youth Development", subscribers: 142, raised: "£12,400" },
  { id: 2, name: "Green Fairways Trust", category: "Environment", subscribers: 89, raised: "£8,750" },
  { id: 3, name: "Par for the Course", category: "Mental Health", subscribers: 203, raised: "£15,200" },
];

/* ---------- COMPONENT ---------- */

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<any>(null);

  // 🔐 Fetch logged-in user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  // 🔥 ADMIN PROTECTION
  if (!user) {
    return <p className="p-10 text-lg">Loading...</p>;
  }

  if (user.email !== "admin@gmail.com") {
    return <p className="p-10 text-xl">Access Denied</p>;
  }

  return (
    <div className="min-h-screen bg-background">

      {/* ---------- SIDEBAR ---------- */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-primary hidden lg:flex flex-col z-50">
        <div className="p-6">
          <Link to="/" className="font-display text-xl font-bold text-primary-foreground tracking-tight">
            Birdie<span className="text-secondary">Fund</span>
          </Link>
          <Badge className="ml-2 bg-secondary/20 text-secondary border-0 text-[10px]">
            Admin
          </Badge>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {[
            { icon: BarChart3, label: "Overview", active: true },
            { icon: Users, label: "Users" },
            { icon: Dice5, label: "Draws" },
            { icon: Heart, label: "Charities" },
            { icon: Trophy, label: "Winners" },
            { icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-primary-foreground/50 hover:text-primary-foreground/80 hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* 🔥 FIXED LOGOUT */}
        <div className="p-4 border-t border-primary-foreground/10">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary-foreground/10"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* ---------- MAIN ---------- */}
      <main className="lg:ml-64 p-6 lg:p-8">

        {/* Mobile header */}
        <div className="lg:hidden mb-6">
          <Link to="/" className="font-display text-xl font-bold text-foreground tracking-tight">
            Birdie<span className="text-secondary">Fund</span>
          </Link>
          <Badge className="ml-2 bg-secondary/15 text-secondary border-0 text-[10px]">
            Admin
          </Badge>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            Admin Overview
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Manage users, draws, charities & payouts.
          </p>
        </motion.div>

        {/* ---------- STATS ---------- */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Users", value: "1,247", change: "+12%" },
            { icon: Trophy, label: "Prize Pool", value: "£5,200", change: "This month" },
            { icon: Heart, label: "Charity Total", value: "£36,350", change: "All time" },
            { icon: Dice5, label: "Next Draw", value: "Apr 1", change: "In 8 days" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <stat.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="font-display text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ---------- TABS ---------- */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="draws">Draws</TabsTrigger>
            <TabsTrigger value="charities">Charities</TabsTrigger>
            <TabsTrigger value="winners">Winners</TabsTrigger>
          </TabsList>

          {/* Users */}
          <TabsContent value="users">
            <Card className="shadow-card">
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>User Management</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </CardHeader>

              <CardContent>
                {mockUsers
                  .filter((u) =>
                    u.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((user) => (
                    <div key={user.id} className="p-3 border-b">
                      {user.name} - {user.email}
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;