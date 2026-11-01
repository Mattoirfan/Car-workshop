import React from 'react';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  ShieldCheck,
  Award,
  Wrench,
  Clock,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Hero Narrative */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
          Our Story & Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#18324A] tracking-tight leading-tight">
          Built on Trust. Driven by Precision.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
          DRIVECRAFT AUTOCARE was founded to eliminate the anxiety and opacity traditionally associated with car repair. We set out to build an automotive workshop where every diagnosis is backed by photographic evidence and every price is approved before a wrench touches your car.
        </p>
      </div>

      {/* 3 Pillar Statements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-3xl p-8 border border-[#DCE3E8] shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#168C91]/15 text-[#168C91] flex items-center justify-center mb-5">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#18324A] mb-2">Our Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To provide car owners with dealership-grade diagnostic precision and transparent, honest pricing without predatory upsells or fake maintenance tasks.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#DCE3E8] shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#F07838]/15 text-[#F07838] flex items-center justify-center mb-5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#18324A] mb-2">Zero Surprise Guarantee</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We operate strictly on digital authorizations. Every part, labor cost, and fluid specification is displayed on your phone with clear explanation before approval.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#DCE3E8] shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#18324A]/10 text-[#18324A] flex items-center justify-center mb-5">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#18324A] mb-2">Certified Technicians</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our bays are staffed by certified master mechanics with specialized training in modern direct-injection engines, dual-clutch transmissions, and high-voltage EV platforms.
          </p>
        </div>
      </div>

      {/* Workshop Equipment & Capability Section */}
      <div className="bg-[#18324A] text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#168C91]">
              Facility & Diagnostic Capability
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              State-of-the-Art Automotive Technology
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We invest heavily in OEM-standard diagnostic equipment. Our 8-bay Bengaluru workshop features:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#168C91] shrink-0" />
                <span>Hunter 3D laser imaging wheel alignment and dynamic wheel balancer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#168C91] shrink-0" />
                <span>Bosch and Autel MaxiSys OE-level diagnostic scan consoles with live telemetry</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#168C91] shrink-0" />
                <span>Automated Robinair AC recovery, vacuum leak test, and recharge station</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#168C91] shrink-0" />
                <span>Dielectric PPE and certified test rigs for hybrid & high-voltage EV systems</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#168C91] shrink-0" />
                <span>Environmentally responsible waste oil recycling and hazardous parts handling</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('workshop')}
                className="bg-[#168C91] hover:bg-[#126f73] text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Tour Our Workshop & Bays
              </button>
            </div>
          </div>

          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1200&q=80"
              alt="DriveCraft Workshop Bays with Computer Diagnostics"
              category="general"
              aspectRatio="16/9"
              className="w-full h-72 rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Location & Booking CTA */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <h3 className="text-2xl font-bold text-[#18324A]">Ready to Experience DriveCraft?</h3>
        <p className="text-xs text-slate-600">
          Visit our flagship service center or schedule a complimentary valet pickup today.
        </p>
        <button
          onClick={() => navigateTo('book-service')}
          className="bg-[#F07838] hover:bg-[#d86629] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
        >
          Book Your Service Appointment
        </button>
      </div>
    </div>
  );
};
