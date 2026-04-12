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
  trash: {
    label: 'Trash',
    color: 'bg-[rgb(var(--waste-organic))]',
    textColor: 'text-[rgb(var(--waste-organic))]',
    icon: '🗑️',
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
  const config = categoryConfig[result.category] || {
    label: result.category ? String(result.category) : 'Unknown',
    color: 'bg-gray-400',
    textColor: 'text-gray-700',
    icon: '❓',
  };

  if (isLoading) {
    return (
      <>
        <Card className="p-8 animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </Card>
        {/* Image Preview */}
        <div className="relative w-full h-64 bg-gray-100">
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        </div>
      </>
    );
  }
  if (!result) return null;

  // Format timestamp if available
  let timeString = '';
  let dateString = '';
  if (result.timestamp) {
    const date = new Date(result.timestamp);
    timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dateString = date.toLocaleDateString();
  }

  return (
    <Card className="p-8">
      {/* Image Preview */}
      {result.imageUrl && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={result.imageUrl}
            alt="Classified waste"
            fill
            className="object-contain rounded-lg bg-gray-100"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>
      )}

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
      {timeString && dateString && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Classified at:</span> {timeString} • {dateString}
          </p>
        </div>
      )}
    </Card>
  );
}
