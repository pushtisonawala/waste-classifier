'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { StatCard as StatCardType } from '@/lib/types';

interface StatCardsProps {
  stats: StatCardType[];
}

const categoryConfig = {
  organic: {
    color: 'text-[rgb(var(--waste-organic))]',
    bgColor: 'bg-green-50',
    icon: '🌱',
  },
  plastic: {
    color: 'text-[rgb(var(--waste-plastic))]',
    bgColor: 'bg-blue-50',
    icon: '♻️',
  },
  metal: {
    color: 'text-[rgb(var(--waste-metal))]',
    bgColor: 'bg-orange-50',
    icon: '⚙️',
  },
  total: {
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    icon: '📊',
  },
};

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const config =
          categoryConfig[stat.category as keyof typeof categoryConfig] ||
          categoryConfig.total;
        const isTrendingUp = stat.trend >= 0;

        return (
          <Card
            key={`${stat.category}-${stat.label}`}
            className={`p-6 border-0 shadow-sm hover:shadow-md transition-shadow ${config.bgColor}`}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <span className="text-2xl">{config.icon}</span>
              </div>

              {/* Value */}
              <div>
                <p className={`text-3xl font-bold ${config.color}`}>
                  {stat.value.toLocaleString()}
                    color: 'text-[rgb(var(--waste-organic))]',
                  },
                  trash: {
                    color: 'text-[rgb(var(--waste-organic))]',
                    bgColor: 'bg-green-50',
                    icon: '🌱',
              </div>

              {/* Trend */}
              <div className="flex items-center gap-1 text-xs font-semibold">
                {isTrendingUp ? (
                  <>
                    <TrendingUp
                      size={14}
                      className="text-[rgb(var(--waste-organic))]"
                    />
                    <span className="text-[rgb(var(--waste-organic))]">
                      {stat.trend.toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown
                      size={14}
                      className="text-[rgb(var(--waste-metal))]"
                    />
                    <span className="text-[rgb(var(--waste-metal))]">
                      {Math.abs(stat.trend).toFixed(1)}%
                          categoryConfig[stat.category === 'organic' ? 'trash' : stat.category as keyof typeof categoryConfig] ||
                          categoryConfig.total;
                )}
                <span className="text-gray-500">from yesterday</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
