import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, User, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types';

export const AuthPage: React.FC = () => {
  const { loginUser, switchRole } = useApp();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      loginUser(email.trim(), 'customer');
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    switchRole(role);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-md mx-auto min-h-screen">
      <div className="bg-white rounded-3xl border border-[#DCE3E8] p-6 sm:p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#168C91] mx-auto flex items-center justify-center mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-[#18324A]">
            {mode === 'login' ? 'Sign In to DriveCraft' : mode === 'register' ? 'Create Customer Account' : 'Reset Your Password'}
          </h1>
          <p className="text-xs text-slate-500">
            {mode === 'login'
              ? 'Access your garage, digital inspections, and repair tracking'
              : 'Save vehicles, view service history, and approve estimates'}
          </p>
        </div>

        {/* Quick Demo Credentials for Reviewers */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
            1-Click Demo Profiles for Review:
          </span>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="w-full text-left px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#168C91] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="font-semibold text-[#18324A]">Customer: Aarav Mehta (Honda City)</span>
              <span className="text-[10px] text-[#168C91] font-bold">Sign In →</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('technician')}
              className="w-full text-left px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#168C91] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="font-semibold text-[#18324A]">Technician: Rajesh Nair (Bay Terminal)</span>
              <span className="text-[10px] text-[#F07838] font-bold">Sign In →</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="w-full text-left px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#168C91] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="font-semibold text-[#18324A]">Admin: Suresh Kumar (Executive Suite)</span>
              <span className="text-[10px] text-slate-800 font-bold">Sign In →</span>
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Mehta"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aarav.mehta@gmail.com"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] text-[#168C91] hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#18324A] hover:bg-[#27323A] text-white font-bold py-3 rounded-xl transition-colors text-xs cursor-pointer"
          >
            {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Register Account' : 'Send Reset Link'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center pt-2 text-xs text-slate-500">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-[#168C91] hover:underline"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-[#168C91] hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
