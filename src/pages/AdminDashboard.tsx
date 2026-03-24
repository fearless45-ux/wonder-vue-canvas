import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Users, Trophy, Heart, BarChart3, Settings, LogOut, Search, Check, X, Dice5, ChevronRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const AdminDashboard = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-primary hidden lg:flex flex-col z-50">
        <div className="p-6">
          <Link to="/" className="font-display text-xl font-bold text-primary-foreground tracking-tight">
            Birdie<span className="text-secondary">Fund</span>
          </Link>
          <Badge className="ml-2 bg-secondary/20 text-secondary border-0 text-[10px]">Admin</Badge>
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
        <div className="p-4 border-t border-primary-foreground/10">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="w-full justify-start text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64 p-6 lg:p-8">
        {/* Mobile header */}
        <div className="lg:hidden mb-6">
          <Link to="/" className="font-display text-xl font-bold text-foreground tracking-tight">
            Birdie<span className="text-secondary">Fund</span>
          </Link>
          <Badge className="ml-2 bg-secondary/15 text-secondary border-0 text-[10px]">Admin</Badge>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">Admin Overview</h1>
          <p className="text-muted-foreground text-sm mb-8">Manage users, draws, charities & payouts.</p>
        </motion.div>

        {/* Stats */}
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
                  <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

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
                <CardTitle className="font-display">User Management</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Name</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Email</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Plan</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Scores</th>
                        <th className="text-right py-3 px-2 font-medium text-muted-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())).map((user) => (
                        <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30">
                          <td className="py-3 px-2 font-medium text-foreground">{user.name}</td>
                          <td className="py-3 px-2 text-muted-foreground">{user.email}</td>
                          <td className="py-3 px-2"><Badge variant="secondary" className="border-0">{user.plan}</Badge></td>
                          <td className="py-3 px-2">
                            <Badge className={`border-0 ${user.status === "Active" ? "bg-secondary/15 text-secondary" : "bg-destructive/15 text-destructive"}`}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex gap-1">
                              {user.scores.map((s, i) => (
                                <span key={i} className="w-7 h-7 rounded bg-muted flex items-center justify-center text-xs font-medium text-foreground">{s}</span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <Button variant="ghost" size="sm"><ChevronRight className="w-4 h-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Draws */}
          <TabsContent value="draws">
            <Card className="shadow-card">
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="font-display">Draw Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Run Simulation</Button>
                  <Button variant="hero" size="sm">Publish Results</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { match: "5-Number", pool: "40%", amount: "£2,080", rollover: true },
                    { match: "4-Number", pool: "35%", amount: "£1,820", rollover: false },
                    { match: "3-Number", pool: "25%", amount: "£1,300", rollover: false },
                  ].map((tier) => (
                    <div key={tier.match} className="rounded-xl bg-muted/50 p-5 text-center">
                      <h4 className="font-display font-semibold text-foreground">{tier.match}</h4>
                      <div className="font-display text-2xl font-bold text-secondary mt-2">{tier.amount}</div>
                      <p className="text-xs text-muted-foreground mt-1">{tier.pool} of pool</p>
                      {tier.rollover && <Badge className="mt-2 bg-accent/15 text-accent border-0 text-[10px]">Jackpot Rollover</Badge>}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <Dice5 className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Draw Logic: <span className="text-secondary">Random Generation</span></p>
                    <p className="text-xs text-muted-foreground">Switch between random and algorithm-weighted modes</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Charities */}
          <TabsContent value="charities">
            <Card className="shadow-card">
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="font-display">Charity Management</CardTitle>
                <Button variant="hero" size="sm">Add Charity</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCharities.map((c) => (
                    <div key={c.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="w-11 h-11 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground">{c.name}</h4>
                        <p className="text-sm text-muted-foreground">{c.category} · {c.subscribers} subscribers</p>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-bold text-secondary">{c.raised}</div>
                        <div className="text-xs text-muted-foreground">total raised</div>
                      </div>
                      <Button variant="ghost" size="sm"><ChevronRight className="w-4 h-4" /></Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Winners */}
          <TabsContent value="winners">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-display">Winner Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Winner</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Match</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Prize</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Month</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                        <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockWinners.map((w) => (
                        <tr key={w.id} className="border-b border-border/50">
                          <td className="py-3 px-2 font-medium text-foreground">{w.name}</td>
                          <td className="py-3 px-2"><Badge variant="secondary" className="border-0">{w.match}</Badge></td>
                          <td className="py-3 px-2 font-display font-semibold text-secondary">{w.prize}</td>
                          <td className="py-3 px-2 text-muted-foreground">{w.month}</td>
                          <td className="py-3 px-2">
                            <Badge className={`border-0 ${w.status === "Paid" ? "bg-secondary/15 text-secondary" : "bg-amber-glow/15 text-amber-glow"}`}>
                              {w.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 text-right">
                            {w.status === "Pending" && (
                              <div className="flex gap-1 justify-end">
                                <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary"><Check className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive"><X className="w-4 h-4" /></Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
