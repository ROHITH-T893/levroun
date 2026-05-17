"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        setIsLoading(false);
        return;
      }

      router.push('/admin/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full">
        <div className="bg-[#0e0e1a] rounded-3xl border border-white/10 shadow-2xl p-10 space-y-8 relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#1AC2FF]/10 rounded-full blur-3xl"></div>
          
          <div className="text-center space-y-2 relative">
            <h1 className="text-3xl font-bold text-white font-['Righteous']">
              Admin Access
            </h1>
            <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
              Secure Terminal Gateway
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-bold text-center">
                <i className="fas fa-exclamation-triangle mr-2"></i> {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-black text-[#1AC2FF] uppercase tracking-widest">
                Email Identity
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@levroun.tech"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-[#1AC2FF] transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-black text-[#1AC2FF] uppercase tracking-widest">
                Access Key
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-[#1AC2FF] transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1AC2FF] hover:bg-white text-[#06060c] font-black py-4 rounded-xl transition-all shadow-lg shadow-[#1AC2FF]/20 disabled:opacity-50 transform active:scale-95"
            >
              {isLoading ? 'ESTABLISHING CONNECTION...' : 'INITIALIZE LOGIN'}
            </button>
          </form>

          <div className="pt-8 border-t border-white/5 relative">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mb-4 text-center">Development Overrides</p>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-xs text-gray-400 font-mono flex justify-between">
                <span>ID:</span> <span className="text-white">admin@levroun.tech</span>
              </p>
              <p className="text-xs text-gray-400 font-mono flex justify-between mt-1">
                <span>KEY:</span> <span className="text-white">admin123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
