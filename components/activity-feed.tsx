'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Classification } from '@/lib/types';

interface ActivityFeedProps {
  classifications: Classification[];
  limit?: number;
}

const categoryConfig = {
  trash: {
    label: 'Trash',
    color: 'bg-green-100 text-[rgb(var(--waste-organic))]',
    icon: '🗑️',
  },
  plastic: {
    label: 'Plastic',
    color: 'bg-blue-100 text-[rgb(var(--waste-plastic))]',
    icon: '♻️',
  },
  metal: {
    label: 'Metal',
    color: 'bg-orange-100 text-[rgb(var(--waste-metal))]',
    icon: '⚙️',
  },
};

export function ActivityFeed({ classifications, limit = 10 }: ActivityFeedProps) {
  const displayData = classifications.slice(0, limit);

  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-gray-600 bg-gray-50">
                Category
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-600 bg-gray-50">
                Confidence
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-600 bg-gray-50">
                Date & Time
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayData.map((item) => {
              const config = categoryConfig[item.category as keyof typeof categoryConfig] || {
                label: item.category ? String(item.category) : 'Unknown',
                color: 'bg-gray-200 text-gray-700',
                icon: '❓',
              };
              const timestamp = new Date(item.timestamp);
              const timeString = timestamp.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              });
              const dateString = timestamp.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              });

              return (
                <TableRow key={item.id} className="border-b border-gray-100">
                  <TableCell className="py-3">
                    <Badge className={config.color}>
                      <span className="mr-1">{config.icon}</span>
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-full rounded-full`}
                          style={{
                            width: `${item.confidence}%`,
                            backgroundColor:
                              item.category === 'trash'
                                ? 'rgb(34 197 94)'
                                : item.category === 'plastic'
                                  ? 'rgb(59 130 246)'
                                  : 'rgb(249 115 22)',
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.confidence}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-sm text-gray-600">
                    {dateString} at {timeString}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {displayData.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500">No classifications yet</p>
        </div>
      )}
    </Card>
  );
}
