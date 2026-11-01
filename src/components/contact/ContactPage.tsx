import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Navigation
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useApp();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [branch, setBranch] = useState('Central Flagship Workshop (Bengaluru)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim() && contactEmail.trim() && message.trim()) {
      setSubmitted(true);
      addToast('Thank you! Your message has been sent to our customer advisors.', 'success');
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
          Connect with Our Advisors
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
          Workshop Locations & Contact
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Visit our modern service bays, request emergency roadside assistance, or consult with our lead diagnostic technicians.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Workshop Locations & Emergency Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Flagship Bay Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE3E8] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-[#168C91] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#18324A]">Central Flagship Workshop</h3>
                <span className="text-xs text-[#168C91] font-semibold">8 Service Bays · Hunter 3D Alignment</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Plot 42, Automotive Hub, Sector 18, Electronic City Phase 1, Bengaluru, Karnataka 560100</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F07838] shrink-0" />
                <span>+91 98765 43210 / 080 4455 6677</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#168C91] shrink-0" />
                <span>service@drivecraftautocare.com</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Mon–Sat: 08:30 AM – 07:30 PM (Sunday by Appointment)</span>
              </div>
            </div>
          </div>

          {/* Secondary Whitefield Facility */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE3E8] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#F07838] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#18324A]">Whitefield Tech Bay Facility</h3>
                <span className="text-xs text-[#F07838] font-semibold">Specialized Computerized Diagnostics</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>ITPB Main Road, Near ITPL Gate 2, Whitefield, Bengaluru 560066</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F07838] shrink-0" />
                <span>+91 98765 43211</span>
              </div>
            </div>
          </div>

          {/* 24/7 Breakdown Emergency Helpline */}
          <div className="bg-[#18324A] text-white rounded-3xl p-6 shadow-md">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#F07838] block mb-1">
              24/7 Emergency Dispatch
            </span>
            <h4 className="text-base font-bold mb-1">Breakdown & Flatbed Towing</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Stranded with a dead battery, flat tire, or engine overheating? Call our quick-response mobile van.
            </p>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#F07838] hover:bg-[#d86629] px-4 py-2 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline: +91 98765 43210</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Contact Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE3E8] p-6 sm:p-10 shadow-xs">
          <h2 className="text-xl font-bold text-[#18324A] mb-2">Send Us an Inquiry</h2>
          <p className="text-xs text-slate-500 mb-6">
            Have questions about a customized engine overhaul, pre-purchase check, or corporate fleet maintenance? We respond within 60 minutes.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Vikramaditya Sen"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="vikram@example.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98000 12345"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Workshop Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
                  >
                    <option value="Central Flagship Workshop (Bengaluru)">Central Flagship (Electronic City)</option>
                    <option value="Whitefield Tech Bay Facility">Whitefield Tech Bay</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Message or Service Inquiry *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your vehicle make, symptoms, or any question regarding our services..."
                  rows={5}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#18324A] hover:bg-[#27323A] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#18324A]">Message Received!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, {contactName}. A service advisor from {branch.split('(')[0]} will contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold text-[#168C91] underline"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
