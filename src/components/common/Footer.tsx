import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Award, Wrench, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#18324A] text-[#DCE3E8] border-t border-[#27323A]">
      {/* Upper Trust Strip */}
      <div className="border-b border-white/10 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#168C91]/20 border border-[#168C91]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#168C91]" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Clear Honest Estimates</h4>
              <p className="text-xs text-slate-400">Zero work done without your prior written approval</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#F07838]/20 border border-[#F07838]/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#F07838]" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">6-Month Guarantee</h4>
              <p className="text-xs text-slate-400">Warranty on genuine parts and technician labor</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#168C91]/20 border border-[#168C91]/30 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 text-[#168C91]" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Digital Inspection Photos</h4>
              <p className="text-xs text-slate-400">Live Green/Amber/Red health report on your phone</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#F07838]/20 border border-[#F07838]/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#F07838]" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Multi-Brand Expertise</h4>
              <p className="text-xs text-slate-400">Japanese, European, Korean, and domestic cars</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo lightMode={true} showTagline={true} />
            <p className="text-sm text-slate-300 leading-relaxed pr-6 max-w-md">
              DRIVECRAFT AUTOCARE is a modern, technology-enabled multi-brand automotive workshop built on transparency, certified technical mastery, and clear upfront pricing.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#168C91] shrink-0 mt-0.5" />
                <span>Plot 42, Automotive Hub, Sector 18, Electronic City Phase 1, Bengaluru, Karnataka 560100</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F07838] shrink-0" />
                <span>Workshop Hotline: +91 98765 43210 / 080 4455 6677</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#168C91] shrink-0" />
                <span>service@drivecraftautocare.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Monday – Saturday: 08:30 AM – 07:30 PM (Sunday by Appointment)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Essential Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider text-[11px] text-[#168C91]">
              Popular Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  Periodic Scheduled Maintenance
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  Computerized Engine Diagnostics
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  Brembo Ceramic Brake Service
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  3D Laser Wheel Alignment
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  Battery CCA Health & Electrical
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  AC Gas Recovery & Refrigerant Service
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  Hybrid & EV Systems Check
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Portals & Tools */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider text-[11px] text-[#168C91]">
              Customer Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => navigateTo('track-repair')} className="hover:text-white transition-colors text-left">
                  Track My Active Repair Live
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('inspection-reports')} className="hover:text-white transition-colors text-left">
                  Digital Inspection Report Viewer
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('estimate')} className="hover:text-white transition-colors text-left">
                  Request Upfront Estimate
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('pricing')} className="hover:text-white transition-colors text-left">
                  Maintenance Package Calculator
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('team')} className="hover:text-white transition-colors text-left">
                  Meet Our Master Mechanics
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('workshop')} className="hover:text-white transition-colors text-left">
                  Workshop Bays & Equipment Tour
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blog')} className="hover:text-white transition-colors text-left">
                  Automotive Knowledge Center
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal, Trust & Policies */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider text-[11px] text-[#168C91]">
              Transparency & Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => navigateTo('privacy-policy')} className="hover:text-white transition-colors text-left">
                  Privacy Policy & Data Security
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms-and-conditions')} className="hover:text-white transition-colors text-left">
                  Terms & Conditions of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('cancellation-policy')} className="hover:text-white transition-colors text-left">
                  Appointment Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('refund-policy')} className="hover:text-white transition-colors text-left">
                  Refund & Dispute Resolution
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('warranty-policy')} className="hover:text-white transition-colors text-left">
                  Service Warranty Terms
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('cookie-policy')} className="hover:text-white transition-colors text-left">
                  Cookie & Storage Notice
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors text-left">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 DRIVECRAFT AUTOCARE. All rights reserved. Registered automotive service enterprise.</p>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Payment Options: UPI · RuPay · Visa · Mastercard · NetBanking</span>
            <span>·</span>
            <span>India / International Compatible</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
