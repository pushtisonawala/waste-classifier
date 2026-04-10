'use client';

import { useState, useMemo } from 'react';
import { StatCards } from '@/components/stat-cards';
import { DailyChart } from '@/components/daily-chart';
import { ActivityFeed } from '@/components/activity-feed';
import { mockClassifications, mockDailyStats, calculateStats, calculateTrends } from '@/lib/mock-data';
import { StatCard } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('week');

  const stats = useMemo((): StatCard[] => {
    const summary = calculateStats(mockClassifications);
    const trends = calculateTrends(mockDailyStats);

    return [
      {
        label: 'Total',
        value: summary.total,
        trend: trends.total,
        category: 'total',
      },
      {
        label: 'Trash',
        value: summary.trash,
        trend: trends.trash,
        category: 'trash',
      },
      {
        label: 'Plastic',
        value: summary.plastic,
        trend: trends.plastic,
        category: 'plastic',
      },
      {
        label: 'Metal',
        value: summary.metal,
        trend: trends.metal,
        category: 'metal',
      },
    ];
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Track your waste segregation metrics in real-time
          </p>
        </div>

        <div className="w-full sm:w-48">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stat Cards */}
      <StatCards stats={stats} />

      {/* Chart */}
      <DailyChart data={mockDailyStats} />

      {/* Activity Feed */}
      <ActivityFeed classifications={mockClassifications} limit={15} />
    </div>
  );
}
