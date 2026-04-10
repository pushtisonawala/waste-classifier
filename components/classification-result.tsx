'use client';

import Image from 'next/image';
import { Classification } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ClassificationResultProps {
  result: Classification;
  isLoading?: boolean;
}

const categoryConfig = {
  organic: {
    label: 'Organic Waste',
    color: 'bg-[rgb(var(--waste-organic))]',
    textColor: 'text-[rgb(var(--waste-organic))]',
    icon: '🌱',
  },
  plastic: {
    label: 'Plastic Waste',
    color: 'bg-[rgb(var(--waste-plastic))]',
    textColor: 'text-[rgb(var(--waste-plastic))]',
    icon: '♻️',
  },
  metal: {
    label: 'Metal Waste',
    color: 'bg-[rgb(var(--waste-metal))]',
    textColor: 'text-[rgb(var(--waste-metal))]',
    icon: '⚙️',
  },
};

export function ClassificationResult({ result, isLoading }: ClassificationResultProps) {
  const config = categoryConfig[result.category];

  if (isLoading) {
    return (
      <Card className="p-8 animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </Card>
    trash: {
      label: 'Trash',
      color: 'bg-[rgb(var(--waste-organic))]',
      textColor: 'text-[rgb(var(--waste-organic))]',
      icon: '🗑️',
    },
    minute: '2-digit',
    second: '2-digit',
  });
  const dateString = timestamp.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card className="overflow-hidden shadow-lg border-0">
      {/* Image Preview */}
      <div className="relative w-full h-64 bg-gray-100">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Category Badge */}
        <div className="mb-6">
          <Badge className={`${config.color} text-white px-4 py-2 text-base`}>
            <span className="mr-2">{config.icon}</span>
            {config.label}
          </Badge>
        </div>

        {/* Confidence */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Confidence Score</label>
            <span className={`text-2xl font-bold ${config.textColor}`}>
              {result.confidence}%
            </span>
          </div>

          {/* Confidence Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full ${config.color} transition-all duration-500`}
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>

        {/* Timestamp */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Classified at:</span> {timeString} • {dateString}
          </p>
        </div>
      </div>
    </Card>
  );
}
