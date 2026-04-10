import { StatCards } from '@/components/stat-cards';
import { DailyChart } from '@/components/daily-chart';
import { ActivityFeed } from '@/components/activity-feed';
import { StatCard } from '@/lib/types';
import { mockClassifications, mockDailyStats } from '@/lib/mock-data';

export default function AnalyticsPage() {
  const stats: StatCard[] = [
    {
      label: 'Total Waste',
      value: 1247,
      category: 'total',
      trend: 5.2,
    },
    {
      label: 'Trash',
      value: 524,
      category: 'trash',
      trend: 3.1,
    },
    {
      label: 'Plastic',
      value: 473,
      category: 'plastic',
      trend: 2.8,
    },
    {
      label: 'Metal',
      value: 250,
      category: 'metal',
      trend: -1.5,
    },
  ];

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
          <DailyChart data={mockDailyStats} />
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
                  <span className="text-sm font-semibold text-green-600">42%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[rgb(var(--waste-trash))] h-2 rounded-full"
                    style={{ width: '42%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Plastic</span>
                  <span className="text-sm font-semibold text-blue-600">38%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[rgb(var(--waste-plastic))] h-2 rounded-full"
                    style={{ width: '38%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Metal</span>
                  <span className="text-sm font-semibold text-orange-600">20%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[rgb(var(--waste-metal))] h-2 rounded-full"
                    style={{ width: '20%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ActivityFeed classifications={mockClassifications} />
    </div>
  );
}
}
