import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  Calendar,
  Wrench,
  ShieldCheck,
  FileCheck,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  Star,
  Award,
  Zap,
  PhoneCall,
  SlidersHorizontal,
  FileText,
  AlertTriangle,
  Car
} from 'lucide-react';
import { VehicleType } from '../../types';

export const HomePage: React.FC = () => {
  const { navigateTo, services, packages, reviews, setSelectedJobRef } = useApp();

  // Quick Booking / Estimate Mini Widget State
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType>('Sedan');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('car-servicing');
  const [trackRefInput, setTrackRefInput] = useState<string>('');

  const featuredServices = services.filter(s => s.featured).slice(0, 6);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackRefInput.trim()) {
      setSelectedJobRef(trackRefInput.trim().toUpperCase());
      navigateTo('track-repair');
    }
  };

  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#18324A] text-white overflow-hidden py-16 lg:py-24">
        {/* Subtle Ambient Light Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#168C91]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F07838]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-[#E4F3F1] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#168C91]" />
                <span>Multi-Brand Certified Auto Care · Clear Upfront Pricing</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Your Car Deserves <br />
                <span className="text-[#168C91]">Expert Care.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#DCE3E8] max-w-xl font-normal leading-relaxed">
                Reliable repairs, honest estimates, and professional maintenance to keep you moving with complete confidence. No mystery charges. No work without your written approval.
              </p>

              {/* Main CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('book-service')}
                  className="inline-flex items-center gap-2.5 bg-[#F07838] hover:bg-[#d86629] text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book a Service</span>
                </button>

                <button
                  onClick={() => navigateTo('services')}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-white/20 transition-all cursor-pointer"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/15 text-xs">
                <div>
                  <span className="block text-xl sm:text-2xl font-extrabold text-[#168C91]">40-Point</span>
                  <span className="text-slate-300">Digital Inspection on Every Job</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-extrabold text-[#F07838]">100%</span>
                  <span className="text-slate-300">Customer Authorization Required</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-extrabold text-white">6-Month</span>
                  <span className="text-slate-300">Warranty on Work & Spares</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual & Quick Booking Selector */}
            <div className="lg:col-span-5 space-y-4">
              {/* Workshop Hero Visual Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#122436]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&q=80&w=1200"
                  alt="DriveCraft State-of-the-Art Multi-Bay Workshop"
                  category="general"
                  aspectRatio="16/9"
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 bg-gradient-to-t from-[#18324A] to-[#1E3E5B] border-t border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Central Workshop Active
                    </span>
                    <span className="text-[#168C91] font-mono">8 Service Bays Operational</span>
                  </div>
                </div>
              </div>

              {/* Quick Estimate & Slot Finder Widget */}
              <div className="bg-white text-[#27323A] rounded-2xl p-5 shadow-xl border border-slate-200">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#18324A] flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-[#168C91]" />
                    Instant Service Price Check
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">Starting Rates</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Body Type</label>
                    <select
                      value={selectedVehicleType}
                      onChange={(e) => setSelectedVehicleType(e.target.value as VehicleType)}
                      className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 font-medium text-xs focus:border-[#168C91] focus:outline-none"
                    >
                      <option value="Hatchback">Hatchback (Swift, i20)</option>
                      <option value="Sedan">Sedan (City, Verna)</option>
                      <option value="Compact SUV">Compact SUV (Creta, Nexon)</option>
                      <option value="Full-size SUV">Full-size SUV (Fortuner)</option>
                      <option value="Luxury / German">Luxury (BMW, Audi, Merc)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Service Type</label>
                    <select
                      value={selectedCategorySlug}
                      onChange={(e) => setSelectedCategorySlug(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 font-medium text-xs focus:border-[#168C91] focus:outline-none"
                    >
                      {services.map(s => (
                        <option key={s.slug} value={s.slug}>{s.name.split(' ')[0]} Service</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-bold">Estimated Base</span>
                    <span className="text-lg font-extrabold text-[#18324A]">
                      ₹{services.find(s => s.slug === selectedCategorySlug)?.startingPrice.toLocaleString('en-IN') || 1499}*
                    </span>
                  </div>

                  <button
                    onClick={() => navigateTo('book-service')}
                    className="inline-flex items-center gap-1.5 bg-[#168C91] hover:bg-[#126f73] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Check Open Slots</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTION BAR */}
      <section className="bg-white border-b border-[#DCE3E8] py-4 px-4 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-slate-700 font-semibold">
            <span className="text-slate-400 uppercase tracking-wider text-[11px]">Quick Jump:</span>
            <button onClick={() => navigateTo('book-service')} className="hover:text-[#F07838] transition-colors flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#F07838]" /> Book Service
            </button>
            <button onClick={() => navigateTo('estimate')} className="hover:text-[#168C91] transition-colors flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#168C91]" /> Get Estimate
            </button>
            <button onClick={() => navigateTo('inspection-reports')} className="hover:text-[#168C91] transition-colors flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-[#168C91]" /> Sample DVI Report
            </button>
          </div>

          {/* Quick Repair Job Search Bar */}
          <form onSubmit={handleTrackSubmit} className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Track Job (e.g. DC-84920)"
                value={trackRefInput}
                onChange={(e) => setTrackRefInput(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#168C91] bg-slate-50 w-48 sm:w-56 font-mono"
              />
            </div>
            <button
              type="submit"
              className="bg-[#18324A] hover:bg-[#27323A] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Track
            </button>
          </form>
        </div>
      </section>

      {/* 2. CORE SERVICES SECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#168C91] block mb-2">
              Automotive Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
              Certified Multi-Brand Services
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              From factory scheduled maintenance to complex computerized oscilloscope engine diagnostics and high-voltage EV battery checks.
            </p>
          </div>

          <button
            onClick={() => navigateTo('services')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#168C91] hover:text-[#18324A] transition-colors cursor-pointer shrink-0"
          >
            <span>View All 13 Service Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-[#DCE3E8] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <ImageWithFallback
                  src={service.imageUrl}
                  alt={service.name}
                  category={service.category}
                  aspectRatio="16/9"
                  className="w-full h-44 mb-4 rounded-xl group-hover:scale-[1.01] transition-transform"
                />

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#168C91]">
                    {service.category.replace('-', ' ')}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {service.durationEstimate}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#18324A] group-hover:text-[#168C91] transition-colors mb-2">
                  {service.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {service.shortDescription}
                </p>

                {/* Common Symptoms Pill-free inline text */}
                <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg mb-4 border border-slate-100">
                  <strong className="text-slate-700 block mb-1">Common Symptom:</strong>
                  <span className="italic">{service.commonSymptoms[0]}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-medium">Starting from</span>
                  <span className="text-base font-extrabold text-[#18324A]">
                    ₹{service.startingPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('service-detail', service.slug)}
                    className="text-xs font-semibold text-slate-600 hover:text-[#18324A] px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => navigateTo('book-service')}
                    className="text-xs font-bold text-white bg-[#F07838] hover:bg-[#d86629] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE DRIVECRAFT (Anti-slop clean proof) */}
      <section className="bg-[#18324A] text-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#168C91] block mb-2">
              The DriveCraft Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Designed Around Absolute Transparency
            </h2>
            <p className="text-sm text-slate-300 mt-3">
              We eliminated the guesswork, surprise bills, and jargon that give automotive repair workshops a bad reputation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#168C91]/20 border border-[#168C91]/30 flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-[#168C91]" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Digital Inspection (DVI)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Before any bolt is turned, you receive high-resolution photos and micrometer measurements of your brakes, suspension, and fluids on your phone.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#F07838]/20 border border-[#F07838]/30 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-[#F07838]" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">No Unauthorized Work</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our estimate portal lets you review parts vs labor line-by-line. You choose what to authorize with explicit digital sign-off.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#168C91]/20 border border-[#168C91]/30 flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-[#168C91]" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">OE-Grade Diagnostics</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Equipped with Bosch, Autel, and Hunter 3D systems. We read live ECU parameters, measure waveforms, and isolate true root causes.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#F07838]/20 border border-[#F07838]/30 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#F07838]" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Genuine Certified Spares</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We use strictly certified OEM and tier-1 parts (Motul, Brembo, Mann, Bosch). All old replaced parts are packed for your inspection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 4-STEP REPAIR WORKFLOW */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#168C91] block mb-2">
            Seamless Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
            How Your Service Journey Works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            From easy online scheduling to live repair tracking and verified invoice payment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="bg-white rounded-2xl p-6 border border-[#DCE3E8] shadow-xs relative">
            <span className="text-3xl font-extrabold text-slate-200 block mb-2">01</span>
            <h3 className="text-base font-bold text-[#18324A] mb-2">Select Service & Slot</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose your vehicle make, describe symptoms, and reserve a real workshop slot. Optional doorstep pickup available.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#DCE3E8] shadow-xs relative">
            <span className="text-3xl font-extrabold text-slate-200 block mb-2">02</span>
            <h3 className="text-base font-bold text-[#18324A] mb-2">Digital Check-In & DVI</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our technicians conduct a thorough 40-point vehicle inspection and document findings with clear photos.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#DCE3E8] shadow-xs relative">
            <span className="text-3xl font-extrabold text-slate-200 block mb-2">03</span>
            <h3 className="text-base font-bold text-[#18324A] mb-2">Approve Itemized Estimate</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review parts, labor, and costs on your phone. Approve mandatory work and choose whether to proceed with optional recommendations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#DCE3E8] shadow-xs relative">
            <span className="text-3xl font-extrabold text-[#F07838] block mb-2">04</span>
            <h3 className="text-base font-bold text-[#18324A] mb-2">QA & Handover</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your car undergoes a road test, final quality sign-off, exterior wash, and is delivered with a 6-month warranty.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FEATURED SERVICE PACKAGES & PRICING PREVIEW */}
      <section className="bg-[#F7F5F0] py-16 sm:py-20 px-4 sm:px-6 border-y border-[#DCE3E8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#168C91] block mb-2">
                Transparent Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
                Curated Maintenance Packages
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Simple, fixed base packages designed to keep your vehicle running smoothly without dealership markups.
              </p>
            </div>

            <button
              onClick={() => navigateTo('pricing')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#168C91] hover:text-[#18324A] transition-colors cursor-pointer"
            >
              <span>Compare All Package Inclusions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all bg-white border ${
                  pkg.isPopular
                    ? 'border-[#168C91] ring-2 ring-[#168C91]/20 shadow-md relative'
                    : 'border-[#DCE3E8] shadow-xs'
                }`}
              >
                <div>
                  {pkg.isPopular && (
                    <span className="inline-block bg-[#168C91] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-3">
                      Most Popular
                    </span>
                  )}

                  <h3 className="text-lg font-bold text-[#18324A]">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-4">{pkg.tagline}</p>

                  <div className="mb-5 pb-5 border-b border-slate-100">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#18324A]">
                      ₹{pkg.basePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 font-medium ml-1">/ service*</span>
                    <span className="block text-[11px] text-slate-400 mt-1">Duration: {pkg.duration}</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                    {pkg.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#168C91] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigateTo('book-service')}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                    pkg.isPopular
                      ? 'bg-[#F07838] hover:bg-[#d86629] text-white shadow-sm'
                      : 'bg-[#18324A] hover:bg-[#27323A] text-white'
                  }`}
                >
                  Choose {pkg.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 mt-8">
            *Prices shown are standard base estimates for hatchbacks and sedans. Fluid volume variations apply for luxury & large SUV vehicles.
          </p>
        </div>
      </section>

      {/* 6. DIGITAL VEHICLE INSPECTION DEMO TEASER */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-[#18324A] text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#168C91] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4" />
                Live Innovation Preview
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Experience Our Digital Inspection System
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                See exactly what our mechanics see. We classify every component with clear color indicators: Green (Healthy), Amber (Monitor), and Red (Urgent). Review photos and make decisions with one click.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('inspection-reports')}
                  className="bg-[#168C91] hover:bg-[#126f73] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  View Interactive Inspection Demo
                </button>
                <button
                  onClick={() => {
                    setSelectedJobRef('DC-84920');
                    navigateTo('track-repair');
                  }}
                  className="text-xs sm:text-sm font-semibold text-white/90 hover:text-white underline underline-offset-4"
                >
                  Track Sample Active Repair (DC-84920)
                </button>
              </div>
            </div>

            {/* Interactive DVI Sample Card */}
            <div className="lg:col-span-5 bg-white text-slate-800 rounded-2xl p-5 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                <div>
                  <strong className="text-[#18324A] block">2021 Honda City ZX</strong>
                  <span className="text-slate-400 font-mono text-[11px]">Report #DVI-84920</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Overall Health</span>
                  <span className="text-base font-extrabold text-emerald-600 block">84 / 100</span>
                </div>
              </div>

              <div className="py-3 space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                  <span className="font-medium">Battery CCA Health (485 CCA)</span>
                  <span className="text-[10px] font-bold uppercase">Green · Good</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-100">
                  <span className="font-medium">Front Brake Pads (2.8 mm)</span>
                  <span className="text-[10px] font-bold uppercase">Amber · Attention</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 text-red-800 border border-red-100">
                  <span className="font-medium">AC Cabin Pollen Filter</span>
                  <span className="text-[10px] font-bold uppercase">Red · Choked</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Inspected by: Rajesh Nair (Master Tech)</span>
                <span className="text-[#168C91] font-semibold">100% Authorized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#168C91] block mb-2">
              Customer Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
              Trusted by Discerning Drivers
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Authentic verified customer reviews after completed jobs at our Bengaluru workshop.
            </p>
          </div>

          <button
            onClick={() => navigateTo('reviews')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#168C91] hover:text-[#18324A] transition-colors cursor-pointer"
          >
            <span>Read All Reviews & Submit Feedback</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-[#DCE3E8] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed mb-4 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs">
                <strong className="text-[#18324A] block">{rev.customerName}</strong>
                <span className="text-slate-500 text-[11px] block">{rev.vehicle}</span>
                <span className="text-[10px] text-[#168C91] font-semibold mt-0.5 block">
                  ✓ Verified Job ({rev.serviceCategory.split('&')[0]})
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. WORKSHOP LOCATION & FINAL CTA */}
      <section className="bg-gradient-to-br from-[#18324A] via-[#1E3E5B] to-[#122436] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F07838]">
              Ready for Trouble-Free Driving?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Book Your Service Appointment in Under 2 Minutes
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Experience honest automotive care with live updates, transparent pricing, and guaranteed parts warranty.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('book-service')}
                className="bg-[#F07838] hover:bg-[#d86629] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                Book a Service Now
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-colors"
              >
                Find Our Workshop Location
              </button>
            </div>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-md space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#168C91]" />
              Workshop Working Hours & Contact
            </h3>
            <div className="grid grid-cols-2 gap-3 text-slate-300">
              <div>
                <strong className="text-white block">Monday – Saturday:</strong>
                <span>08:30 AM – 07:30 PM</span>
              </div>
              <div>
                <strong className="text-white block">Sunday:</strong>
                <span>Emergency Breakdown & Priority</span>
              </div>
              <div>
                <strong className="text-white block">Helpline:</strong>
                <span>+91 98765 43210</span>
              </div>
              <div>
                <strong className="text-white block">Location:</strong>
                <span>Plot 42, Sector 18, Bengaluru</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
