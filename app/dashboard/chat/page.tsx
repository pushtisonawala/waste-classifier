import { ChatInterface } from '@/components/chat-interface';
import { ChatMessage, QuickReply } from '@/lib/types';

export default function ChatPage() {
  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      type: 'system',
      content: "Hello! I'm your Waste Segregation Assistant. Ask me anything about waste classification, statistics, or best practices.",
      timestamp: new Date(Date.now() - 5000),
    },
  ];

  const quickReplies: QuickReply[] = [
    {
      id: 'qr-1',
      label: 'Today&apos;s Stats',
      message: 'What are today&apos;s waste statistics?',
    },
    {
      id: 'qr-2',
      label: 'Top Categories',
      message: 'Which waste categories have the highest volume?',
    },
    {
      id: 'qr-3',
      label: 'Classification Tips',
      message: 'How can I improve waste classification accuracy?',
    },
    {
      id: 'qr-4',
      label: 'System Status',
      message: 'What&apos;s the current system status?',
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Waste Assistant</h1>
          <p className="text-sm text-gray-600 mt-1">
            Ask questions about waste segregation and get instant answers
          </p>
        </div>
        <ChatInterface initialMessages={initialMessages} quickReplies={quickReplies} />
      </div>
    </div>
  );
}
