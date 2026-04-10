'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatMessage, QuickReply } from '@/lib/types';
import { QuickReplyChips } from './quick-reply-chips';
import { Card } from '@/components/ui/card';

interface ChatInterfaceProps {
  initialMessages: ChatMessage[];
  quickReplies: QuickReply[];
}

export function ChatInterface({ initialMessages, quickReplies }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'That&apos;s a great question. Based on today&apos;s data, our organic waste is trending up by 15%.',
        'According to our latest analysis, plastic waste comprises about 37% of our total classifications.',
        'Our metal waste detection accuracy is currently at 94%, and improving daily.',
        'Here are some tips to improve waste segregation: 1) Always sort items before submission, 2) Take clear photos, 3) Report any misclassifications.',
        'The busiest time for waste classification is between 9 AM and 12 PM.',
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const systemMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        type: 'system',
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, systemMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickReply = (message: string) => {
    handleSendMessage(message);
  };

  return (
    <Card className="flex flex-col h-96 md:h-[600px] border-0 shadow-sm overflow-hidden">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-[rgb(var(--waste-plastic))] text-white rounded-br-none'
                  : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
              }`}
            >
              <p className="text-sm break-words">{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.type === 'user'
                    ? 'text-blue-100'
                    : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 border border-gray-200 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce animation-delay-100" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce animation-delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div className="border-t border-gray-200 bg-white p-4 space-y-4">
        {/* Quick Replies - Show only after first few messages */}
        {messages.length <= 5 && !isLoading && (
          <QuickReplyChips replies={quickReplies} onSelect={handleQuickReply} />
        )}

        {/* Input Area */}
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(input);
              }
            }}
            placeholder="Ask me about waste statistics..."
            disabled={isLoading}
            className="resize-none"
            rows={2}
          />
          <Button
            onClick={() => handleSendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="bg-[rgb(var(--waste-plastic))] hover:bg-blue-600 text-white px-4"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
