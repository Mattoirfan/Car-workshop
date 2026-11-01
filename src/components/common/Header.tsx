import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { Phone, Calendar, Search, Shield, User, Menu, X, Clock, Car, ChevronDown } from 'lucide-react';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const { currentPage, navigateTo, currentUser, switchRole, isLoggedIn, logoutUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Track My Repair', page: 'track-repair' },
    { label: 'Inspection Reports', page: 'inspection-reports' },
    { label: 'Reviews', page: 'reviews' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#DCE3E8] shadow-xs">
      {/* Slim Pre-Header Utility Bar */}
      <div className="bg-[#18324A] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-[#E4F3F1] font-medium whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 text-[#168C91]" />
              Mon–Sat: 8:30 AM – 7:30 PM
            </span>
            <span className="hidden md:inline-block text-white/30">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-white/90 whitespace-nowrap">
              <Phone className="w-3.5 h-3.5 text-[#F07838]" />
              Breakdown & Workshop: <strong className="font-semibold text-white">+91 98765 43210</strong>
            </span>
          </div>

          {/* Quick Interactive Role Switcher for Reviewing Customer / Mechanic / Admin Portals */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-[#E4F3F1] px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap"
                title="Switch platform view mode"
              >
                <Shield className="w-3 h-3 text-[#168C91]" />
                <span>Role: <strong className="text-white capitalize">{currentUser.role}</strong></span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 text-xs z-50">
                  <div className="px-3 py-1 font-semibold text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Switch Active Portal
                  </div>
                  {(['customer', 'technician', 'admin'] as UserRole[]).map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        switchRole(role);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        currentUser.role === role ? 'font-bold text-[#168C91] bg-teal-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span className="capitalize">{role === 'technician' ? 'Mechanic / Staff' : role} View</span>
                      {currentUser.role === role && <span className="w-1.5 h-1.5 rounded-full bg-[#168C91]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account / Portal shortcut */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  if (currentUser.role === 'admin') navigateTo('admin');
                  else if (currentUser.role === 'technician') navigateTo('staff');
                  else navigateTo('account');
                }}
                className="hover:text-[#F07838] transition-colors flex items-center gap-1 text-[11px] font-medium whitespace-nowrap"
              >
                <User className="w-3 h-3" />
                <span className="hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="hover:text-[#F07838] transition-colors text-[11px] font-medium whitespace-nowrap"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - STRICTLY HORIZONTAL SINGLE LINE ON DESKTOP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-x-4 lg:gap-x-6 xl:gap-x-8 flex-nowrap">
          {/* Zone 1: Logo Brand Wordmark (Non-shrinking) */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-[#168C91] rounded-lg"
          >
            <Logo showTagline={false} />
          </div>

          {/* Zone 2: Navigation Links - GUARANTEED SINGLE-LINE NO WRAP ON DESKTOP */}
          <nav className="hidden xl:flex items-center gap-x-5 2xl:gap-x-7 flex-nowrap whitespace-nowrap text-sm font-semibold tracking-tight text-[#27323A]">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`relative py-2 whitespace-nowrap shrink-0 transition-colors hover:text-[#168C91] cursor-pointer text-[13.5px] 2xl:text-sm ${
                    isActive ? 'text-[#168C91] font-bold' : 'text-[#27323A]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#168C91] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 2 Medium-Screen (1024px-1279px) Compact Single Line */}
          <nav className="hidden lg:flex xl:hidden items-center gap-x-3.5 flex-nowrap whitespace-nowrap text-xs font-semibold text-[#27323A]">
            {navLinks.slice(0, 6).map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`py-1.5 whitespace-nowrap shrink-0 transition-colors hover:text-[#168C91] cursor-pointer ${
                    isActive ? 'text-[#168C91] font-bold underline decoration-[#168C91] underline-offset-4' : 'text-[#27323A]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Quick Tool Triggers */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Estimate Quick CTA */}
            <button
              onClick={() => handleNavClick('estimate')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#18324A] hover:text-[#168C91] px-3 py-2 rounded-lg border border-[#DCE3E8] hover:border-[#168C91] transition-colors whitespace-nowrap shrink-0"
            >
              Get an Estimate
            </button>

            {/* Primary CTA Button: Book a Service */}
            <button
              onClick={() => handleNavClick('book-service')}
              className="inline-flex items-center gap-2 bg-[#F07838] hover:bg-[#d86629] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all transform active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Book a Service</span>
            </button>

            {/* Mobile / Tablet Menu Button (only visible below lg breakpoint) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#18324A] hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive ? 'bg-[#E4F3F1] text-[#168C91]' : 'text-[#27323A] hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#168C91]" />}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('estimate')}
              className="w-full text-center text-xs font-semibold py-2.5 rounded-lg border border-[#DCE3E8] text-[#18324A]"
            >
              Request Estimate
            </button>
            <button
              onClick={() => {
                if (currentUser.role === 'admin') handleNavClick('admin');
                else if (currentUser.role === 'technician') handleNavClick('staff');
                else handleNavClick('account');
              }}
              className="w-full text-center text-xs font-semibold py-2.5 rounded-lg bg-[#18324A] text-white"
            >
              My Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
