'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';
import Link from 'next/link';
import { Lock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export function LoginCard() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@wasteseg.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.token) {
        localStorage.setItem('token', res.token);
        router.push('/dashboard/upload');
      } else {
        alert('Login failed: No token received');
      }
    } catch (err: any) {
      alert('Login failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(var(--sidebar-dark))] to-gray-900 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        {/* Card Header */}
        <div className="p-8 border-b border-gray-200">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-[rgb(var(--waste-organic))] to-[rgb(var(--waste-plastic))] rounded-lg">
              <Trash2 size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900">
            WasteSeg
          </h1>
          <p className="text-sm text-gray-600 text-center mt-1">
            Smart Waste Segregation System
          </p>
        </div>

        {/* Card Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[rgb(var(--waste-organic))] to-[rgb(var(--waste-plastic))] text-white font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Lock size={14} />
            <span>Secure login • Demo credentials pre-filled</span>
          </div>
        </form>

        {/* Card Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <p className="text-xs text-gray-600">
            Demo Mode: Use pre-filled credentials to explore the dashboard.
          </p>
        </div>
      </Card>
    </div>
  );
}
