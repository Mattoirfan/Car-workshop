import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const { currentPage } = useApp();

  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cancellation' | 'refund' | 'warranty' | 'cookie'>(() => {
    if (currentPage === 'terms-and-conditions') return 'terms';
    if (currentPage === 'cancellation-policy') return 'cancellation';
    if (currentPage === 'refund-policy') return 'refund';
    if (currentPage === 'warranty-policy') return 'warranty';
    if (currentPage === 'cookie-policy') return 'cookie';
    return 'privacy';
  });

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
          Transparency & Legal Framework
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
          Policies & Terms of Service
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Clear, consumer-friendly policies regarding your vehicle, inspection data, warranties, and cancellations.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 text-xs font-bold">
          {[
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'terms', label: 'Terms & Conditions' },
            { id: 'warranty', label: 'Warranty Policy' },
            { id: 'cancellation', label: 'Cancellation Policy' },
            { id: 'refund', label: 'Refund Policy' },
            { id: 'cookie', label: 'Cookie Notice' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#18324A] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#DCE3E8] p-6 sm:p-10 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
        {/* PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#18324A]">Privacy Policy & Data Security</h2>
            <span className="text-[11px] text-slate-400 block font-mono">Last Updated: October 2026</span>

            <p>
              At DRIVECRAFT AUTOCARE, we respect your privacy. This policy governs how we collect, store, and process personal information, vehicle registration records, diagnostic telemetry, and digital vehicle inspection photos.
            </p>

            <h3 className="text-sm font-bold text-[#18324A] pt-2">1. Information We Collect</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Customer contact details: Name, email address, and mobile phone number for service progress updates.</li>
              <li>Vehicle specifications: Vehicle make, model, registration number, VIN (when required for OEM part matching), and odometer readings.</li>
              <li>Photographic and diagnostic data: High-resolution photos and videos of worn vehicle assemblies captured during our 40-point inspection.</li>
            </ul>

            <h3 className="text-sm font-bold text-[#18324A] pt-2">2. How Your Data is Used</h3>
            <p>
              Your data is exclusively used to prepare accurate estimates, source compatible OEM components, and provide you with real-time job tracking. We never sell or license customer data to third-party telemarketers or external advertisers.
            </p>

            <h3 className="text-sm font-bold text-[#18324A] pt-2">3. Storage & Encryption</h3>
            <p>
              Payment data is processed directly via RBI-authorized payment aggregators using 256-bit TLS encryption. Raw card numbers are never stored on our application servers.
            </p>
          </div>
        )}

        {/* TERMS AND CONDITIONS */}
        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#18324A]">Terms and Conditions of Service</h2>
            <span className="text-[11px] text-slate-400 block font-mono">Last Updated: October 2026</span>

            <h3 className="text-sm font-bold text-[#18324A] pt-2">1. Work Authorization</h3>
            <p>
              No mechanical or electrical repair will be undertaken without prior digital authorization by the customer via our portal or signed job card. Verbal discussions must be confirmed with an updated digital estimate.
            </p>

            <h3 className="text-sm font-bold text-[#18324A] pt-2">2. Valet Pickup and Road Testing</h3>
            <p>
              By requesting valet pickup or road test diagnostics, you authorize our licensed and verified technicians to operate the vehicle within public and testing roads strictly for diagnostic verification.
            </p>

            <h3 className="text-sm font-bold text-[#18324A] pt-2">3. Vehicle Handover & Storage</h3>
            <p>
              Vehicles must be collected within 48 hours of notification of completion. Vehicles parked on workshop premises are insured against fire and physical damage under our comprehensive commercial garage policy.
            </p>
          </div>
        )}

        {/* WARRANTY POLICY */}
        {activeTab === 'warranty' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#18324A]">Service & Spares Warranty Policy</h2>
            <span className="text-[11px] text-slate-400 block font-mono">DriveCraft 6-Month Quality Guarantee</span>

            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl font-semibold">
              ✓ All periodic scheduled maintenance, mechanical repairs, and installed OEM/OES components carry a 6-Month or 10,000-Kilometer Warranty (whichever comes first).
            </div>

            <h3 className="text-sm font-bold text-[#18324A] pt-2">1. What is Covered</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Defects in installed OEM/OES replacement components (e.g. brake pads, water pumps, shock absorbers, alternators).</li>
              <li>Workmanship and assembly labor performed by DriveCraft technicians.</li>
              <li>Fluid leaks resulting directly from replaced gaskets, seals, or filter washers.</li>
            </ul>

            <h3 className="text-sm font-bold text-[#18324A] pt-2">2. Exclusions</h3>
            <p>
              Warranty does not cover normal frictional wear (e.g. clutch plates operated under abusive towing), damage resulting from external accidents, water flooding, or modification by unauthorized third-party garages during the warranty period.
            </p>
          </div>
        )}

        {/* CANCELLATION & REFUND */}
        {activeTab === 'cancellation' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#18324A]">Appointment Cancellation Policy</h2>
            <p>
              We understand plans change. You may reschedule or cancel any scheduled service appointment free of charge up to 2 hours prior to your booked slot through your online account portal or by calling our workshop helpline (+91 98765 43210).
            </p>
            <p>
              If complimentary valet pickup was scheduled, please provide at least 1 hour notice so our driver can be safely redirected.
            </p>
          </div>
        )}

        {activeTab === 'refund' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#18324A]">Refund & Dispute Resolution</h2>
            <p>
              Payments for services are due only upon vehicle collection after you review the completed work. In the rare event a prepaid diagnostic fee or special-order part is cancelled prior to installation, refunds are processed back to the original source payment method within 3 to 5 business days.
            </p>
          </div>
        )}

        {activeTab === 'cookie' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#18324A]">Cookie & Local Storage Notice</h2>
            <p>
              Our web application utilizes local browser storage and session cookies strictly to maintain your active account login, remember your garage vehicles, and preserve your live repair tracking state. We do not use third-party tracking pixels or behavioral advertising beacons.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
