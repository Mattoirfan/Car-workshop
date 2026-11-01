import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Car,
  SlidersHorizontal
} from 'lucide-react';
import { VehicleType } from '../../types';

export const PricingPackages: React.FC = () => {
  const { packages, navigateTo } = useApp();
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType>('Sedan');

  // Multiplier based on oil volume and component complexity
  const getVehicleMultiplier = (type: VehicleType) => {
    switch (type) {
      case 'Hatchback': return 1.0;
      case 'Sedan': return 1.1;
      case 'Compact SUV': return 1.2;
      case 'Full-size SUV': return 1.35;
      case 'Luxury / German': return 1.6;
      default: return 1.0;
    }
  };

  const multiplier = getVehicleMultiplier(selectedVehicleType);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
          Upfront & Transparent
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
          Service Packages & Upfront Pricing
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Standardized pricing with zero surprise charges. All prices include labor, synthetic oil, filter, and digital inspection.
        </p>

        {/* Vehicle Segment Selector */}
        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          {(['Hatchback', 'Sedan', 'Compact SUV', 'Full-size SUV', 'Luxury / German'] as VehicleType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedVehicleType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedVehicleType === type
                  ? 'bg-[#18324A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-slate-400 block mt-2">
          Viewing customized package rates for <strong className="text-slate-700">{selectedVehicleType}</strong>
        </span>
      </div>

      {/* Package Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {packages.map((pkg) => {
          const adjustedPrice = Math.round(pkg.basePrice * multiplier);

          return (
            <div
              key={pkg.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between border transition-all ${
                pkg.isPopular
                  ? 'border-[#168C91] ring-2 ring-[#168C91]/20 shadow-md relative'
                  : 'border-[#DCE3E8] shadow-xs'
              }`}
            >
              <div>
                {pkg.isPopular && (
                  <span className="inline-block bg-[#168C91] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                    Most Selected
                  </span>
                )}

                <h3 className="text-xl font-bold text-[#18324A]">{pkg.name}</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">{pkg.tagline}</p>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#18324A]">
                      ₹{adjustedPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">/ service</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Duration: ~{pkg.duration} · {pkg.recommendedFrequency}
                  </span>
                </div>

                {/* Highlights */}
                <div className="space-y-3 mb-6">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                    Key Inclusions
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#168C91] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => navigateTo('book-service')}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  pkg.isPopular
                    ? 'bg-[#F07838] hover:bg-[#d86629] text-white shadow-sm'
                    : 'bg-[#18324A] hover:bg-[#27323A] text-white'
                }`}
              >
                Choose {pkg.name.split(' ')[0]} (₹{adjustedPrice.toLocaleString('en-IN')})
              </button>
            </div>
          );
        })}
      </div>

      {/* Pricing Transparency Rules & FAQs */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 max-w-4xl mx-auto space-y-4">
        <h3 className="text-base font-bold text-[#18324A] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#168C91]" />
          Our 5 Non-Negotiable Pricing Guarantees
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <strong className="block text-[#18324A] mb-1">1. Zero Work Without Written Approval</strong>
            <span>If a technician discovers unexpected wear, we send a photo and exact price. Nothing is billed without your explicit click.</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <strong className="block text-[#18324A] mb-1">2. Genuine OEM Spares Guaranteed</strong>
            <span>We never use counterfeit filters or recycled oils. Replaced parts are kept in your trunk for your physical inspection.</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <strong className="block text-[#18324A] mb-1">3. Clear Labor vs Parts Separation</strong>
            <span>Invoices clearly list labor hours and parts MRP separately with standard 18% GST. No ambiguous lump-sum charges.</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <strong className="block text-[#18324A] mb-1">4. 6-Month / 10,000 km Warranty</strong>
            <span>Any issues arising from installed parts or workmanship are repaired free of charge under our warranty policy.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
