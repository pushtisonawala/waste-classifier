'use client';

import { Button } from '@/components/ui/button';
import { QuickReply } from '@/lib/types';

interface QuickReplyChipsProps {
  replies: QuickReply[];
  onSelect: (message: string) => void;
}

export function QuickReplyChips({ replies, onSelect }: QuickReplyChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {replies.map((reply) => (
        <Button
          key={reply.id}
          onClick={() => onSelect(reply.message)}
          variant="outline"
          className="rounded-full border border-gray-300 hover:border-[rgb(var(--waste-plastic))] hover:bg-blue-50 text-sm text-gray-700 px-4 py-2"
        >
          {reply.label}
        </Button>
      ))}
    </div>
  );
}
