"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { register as registerUser } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validatePassword = (password) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setMessage("Password must be at least 8 characters, include uppercase, lowercase, and a number.");
      return;
    }
    setIsLoading(true);
    try {
      await registerUser(name, email, password);
      setMessage("Signup successful! Please login.");
      setTimeout(() => router.push("/login"), 1200);
    } catch (err) {
      setMessage(err.message || "Signup failed");
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
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
              required
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[rgb(var(--waste-organic))] to-[rgb(var(--waste-plastic))] text-white font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </Button>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Lock size={14} />
            <span>Secure signup • Your data is safe</span>
          </div>
          {message && <div className="text-center text-red-500 text-sm">{message}</div>}
        </form>

        {/* Card Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 rounded-b-lg flex flex-col gap-2 items-center">
          <p className="text-xs text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">Sign in here</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
