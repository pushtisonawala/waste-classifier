'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Upload,
  BarChart3,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard/upload', label: 'Upload & Classify', icon: Upload },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/chat', label: 'Chat Assistant', icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-[rgb(var(--sidebar-dark))] text-white flex flex-col z-40 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-[rgb(var(--waste-organic))] to-[rgb(var(--waste-plastic))] rounded-lg">
              <Trash2 size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">WasteSeg</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Smart Waste Segregation</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setIsOpen(false)}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(href)
                    ? 'bg-white/20 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link href="/login">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-gray-400 hover:text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content offset for desktop */}
      <div className="hidden md:block w-64 flex-shrink-0" />
    </>
  );
}
