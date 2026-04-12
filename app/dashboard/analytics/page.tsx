"use client";

import { useEffect, useState } from "react";
import { StatCards } from "@/components/stat-cards";
import { DailyChart } from "@/components/daily-chart";
import { ActivityFeed } from "@/components/activity-feed";
import { StatCard, Classification, DailyStats } from "@/lib/types";
import { getStats, getActivity } from "@/lib/api";

export default function AnalyticsPage() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [activity, setActivity] = useState<Classification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        // Summary stats
        const summary = await getStats(token || undefined);
        // Activity feed
        const activityRes = await getActivity(token || undefined);
        // Daily stats
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const dailyRes = await fetch(
          apiBase.replace(/\/$/, "") + "/stats/daily",
          { headers: { Authorization: token ? `Bearer ${token}` : "" } }
        );
        if (!dailyRes.ok) {
          const text = await dailyRes.text();
          throw new Error(text);
        }
        const dailyData = await dailyRes.json();

        // Compute counts from activity feed as fallback
        const activityList = activityRes.data || [];
        const countByCategory = activityList.reduce(
          (acc: any, item: any) => {
            const cat = typeof item.category === 'string' ? item.category.toLowerCase() : item.category;
            acc.total += 1;
            if (cat === 'trash') acc.trash += 1;
            if (cat === 'plastic') acc.plastic += 1;
            if (cat === 'metal') acc.metal += 1;
            return acc;
          },
          { total: 0, trash: 0, plastic: 0, metal: 0 }
        );
        setStats([
          {
            label: "Total Waste",
            value: countByCategory.total,
            category: "total",
            trend: 0,
          },
          {
            label: "Trash",
            value: countByCategory.trash,
            category: "trash",
            trend: 0,
          },
          {
            label: "Plastic",
            value: countByCategory.plastic,
            category: "plastic",
            trend: 0,
          },
          {
            label: "Metal",
            value: countByCategory.metal,
            category: "metal",
            trend: 0,
          },
        ]);

        // Daily chart
        const dailyStatsArr: DailyStats[] = dailyData.map((d: any) => {
          const statsObj: DailyStats = {
            date: new Date(d._id),
            trash: 0,
            plastic: 0,
            metal: 0,
          };
          d.categories.forEach((cat: any) => {
            if (cat.category === "trash") statsObj.trash = cat.count;
            if (cat.category === "plastic") statsObj.plastic = cat.count;
            if (cat.category === "metal") statsObj.metal = cat.count;
          });
          return statsObj;
        });
        setDailyStats(dailyStatsArr);

        // Activity feed
        setActivity(activityRes.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading analytics...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  // Calculate category distribution for progress bars
  const total = stats.find((s) => s.category === "total")?.value || 0;
  const trashPct = total ? Math.round((stats.find((s) => s.category === "trash")?.value || 0) / total * 100) : 0;
  const plasticPct = total ? Math.round((stats.find((s) => s.category === "plastic")?.value || 0) / total * 100) : 0;
  const metalPct = total ? Math.round((stats.find((s) => s.category === "metal")?.value || 0) / total * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor your waste segregation metrics in real-time
        </p>
      </div>

      <StatCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DailyChart data={dailyStats} />
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Category Distribution
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Trash</span>
                  <span className="text-sm font-semibold text-green-600">{trashPct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[rgb(var(--waste-trash))] h-2 rounded-full"
                    style={{ width: `${trashPct}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Plastic</span>
                  <span className="text-sm font-semibold text-blue-600">{plasticPct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[rgb(var(--waste-plastic))] h-2 rounded-full"
                    style={{ width: `${plasticPct}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Metal</span>
                  <span className="text-sm font-semibold text-orange-600">{metalPct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[rgb(var(--waste-metal))] h-2 rounded-full"
                    style={{ width: `${metalPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ActivityFeed classifications={activity} />
    </div>
  );
}