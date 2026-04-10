'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DailyStats } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface DailyChartProps {
  data: DailyStats[];
}

export function DailyChart({ data }: DailyChartProps) {
  const chartData = data.map((item) => ({
    name: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
      trash: item.trash,
    plastic: item.plastic,
    metal: item.metal,
  }));

  return (
    <Card className="p-6 border-0 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        7-Day Classification Volume
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="square"
          />
            <Bar
              dataKey="trash"
              fill="rgb(34 197 94)"
              radius={[4, 4, 0, 0]}
              name="Trash"
          />
          <Bar
            dataKey="plastic"
            fill="rgb(59 130 246)"
            radius={[4, 4, 0, 0]}
            name="Plastic"
          />
          <Bar
            dataKey="metal"
            fill="rgb(249 115 22)"
            radius={[4, 4, 0, 0]}
            name="Metal"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
