import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from("scores")
        .select("user_id, score");

      if (error) {
        console.log(error.message);
        return;
      }

      // 🧠 Group by user
      const grouped: any = {};

      data.forEach((item) => {
        if (!grouped[item.user_id]) {
          grouped[item.user_id] = [];
        }
        grouped[item.user_id].push(item.score);
      });

      // 🧠 Calculate averages
      const result = Object.keys(grouped).map((user_id) => {
        const scores = grouped[user_id];
        const avg =
          scores.reduce((a: number, b: number) => a + b, 0) /
          scores.length;

        return {
          user_id,
          avg: Math.round(avg),
        };
      });

      // 🧠 Sort descending
      result.sort((a, b) => b.avg - a.avg);

      setLeaders(result.slice(0, 10)); // top 10
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Leaderboard 🏆</h1>

      <Card>
        <CardHeader>
          <CardTitle>Top Players</CardTitle>
        </CardHeader>

        <CardContent>
          {leaders.map((user, index) => (
            <div
              key={user.user_id}
              className="flex justify-between p-3 border-b"
            >
              <span>#{index + 1}</span>
              <span>{user.user_id.slice(0, 6)}...</span>
              <span>{user.avg}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;