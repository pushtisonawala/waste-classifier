import { Classification, DailyStats, ChatMessage, QuickReply } from './types';

// Generate mock classification data
function generateMockClassifications(): Classification[] {
  const categories = ['trash', 'plastic', 'metal'] as const;
  const classifications: Classification[] = [];
  const baseDate = new Date();

  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(baseDate);
    date.setDate(date.getDate() - daysAgo);
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));

    classifications.push({
      id: `cls-${i}`,
      imageUrl: `/images/waste-${Math.floor(Math.random() * 3) + 1}.jpg`,
      category: categories[Math.floor(Math.random() * 3)],
      confidence: Math.floor(Math.random() * 40) + 60,
      timestamp: date,
    });
  }

  return classifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// Generate daily stats for the last 7 days
function generateDailyStats(): DailyStats[] {
  const stats: DailyStats[] = [];
  const baseDate = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    stats.push({
      date,
      trash: Math.floor(Math.random() * 40) + 20,
      plastic: Math.floor(Math.random() * 35) + 15,
      metal: Math.floor(Math.random() * 30) + 10,
    });
  }

  return stats;
}

// Mock chat messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    type: 'system',
    content: 'Welcome to Waste Segregation Assistant! How can I help you today?',
    timestamp: new Date(Date.now() - 5 * 60000),
  },
  {
    id: 'msg-2',
    type: 'user',
    content: 'What was the total waste processed today?',
    timestamp: new Date(Date.now() - 4 * 60000),
  },
  {
    id: 'msg-3',
    type: 'system',
    content: 'Today, we processed 95 items: 42 trash, 35 plastic, and 18 metal waste items.',
    timestamp: new Date(Date.now() - 3 * 60000),
  },
  {
    id: 'msg-4',
    type: 'user',
    content: 'What is the most common waste type?',
    timestamp: new Date(Date.now() - 2 * 60000),
  },
  {
    id: 'msg-5',
    type: 'system',
    content: 'Trash is the most common, making up about 44% of all items we classify. Plastic follows at 37% and metal at 19%.',
    timestamp: new Date(Date.now() - 60000),
  },
];

// Mock quick replies
export const mockQuickReplies: QuickReply[] = [
  {
    id: 'qr-1',
    label: "Today's Stats",
    message: "Show me today's waste statistics",
  },
  {
    id: 'qr-2',
    label: 'Most Common Type',
    message: 'What is the most common waste type?',
  },
  {
    id: 'qr-3',
    label: 'Weekly Summary',
    message: 'Give me a summary of this week',
  },
];

// Export the generators
export const mockClassifications = generateMockClassifications();
export const mockDailyStats = generateDailyStats();

// Calculate summary stats
export function calculateStats(classifications: Classification[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayClassifications = classifications.filter(
    (c) => c.timestamp >= today
  );

  const total = todayClassifications.length;
  const trash = todayClassifications.filter((c) => c.category === 'trash').length;
  const plastic = todayClassifications.filter((c) => c.category === 'plastic').length;
  const metal = todayClassifications.filter((c) => c.category === 'metal').length;

  return { total, trash, plastic, metal };
}

// Calculate trends
export function calculateTrends(stats: DailyStats[]) {
  if (stats.length < 2) return { trash: 0, plastic: 0, metal: 0, total: 0 };

  const last = stats[stats.length - 1];
  const previous = stats[stats.length - 2];

  const lastTotal = last.trash + last.plastic + last.metal;
  const prevTotal = previous.trash + previous.plastic + previous.metal;

  return {
    trash: lastTotal > 0 ? ((last.trash - previous.trash) / previous.trash) * 100 : 0,
    plastic: lastTotal > 0 ? ((last.plastic - previous.plastic) / previous.plastic) * 100 : 0,
    metal: lastTotal > 0 ? ((last.metal - previous.metal) / previous.metal) * 100 : 0,
    total: prevTotal > 0 ? ((lastTotal - prevTotal) / prevTotal) * 100 : 0,
  };
}
