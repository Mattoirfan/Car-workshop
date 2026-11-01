import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, HelpCircle, Search, ArrowRight } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  cat: string;
}

export const FaqPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: 'Will you ever perform paid work on my car without my prior authorization?',
      a: 'Never. DriveCraft operates on a strict digital authorization protocol. When an issue is discovered during our 40-point inspection, we upload photo proof and an itemized cost estimate to your portal and WhatsApp. No bolt is turned or part replaced until you explicitly authorize the line item.',
      cat: 'pricing'
    },
    {
      q: 'What warranty is provided on replacement parts and technician labor?',
      a: 'All periodic servicing, mechanical repairs, and installed OEM/OES components carry a 6-month or 10,000-kilometer warranty (whichever occurs first). Paint and bodywork carry a 2-year anti-peel and fade warranty.',
      cat: 'warranty'
    },
    {
      q: 'How does the Digital Vehicle Inspection (DVI) report work?',
      a: 'While your vehicle is on our hydraulic service lift, the assigned technician inspects key assemblies (brakes, suspension, battery, fluids, belts). Findings are logged with high-resolution photos and color-coded as Green (healthy), Amber (monitor or plan for next visit), or Red (urgent attention). You can review this report directly on your phone.',
      cat: 'inspection'
    },
    {
      q: 'Do you offer doorstep pickup and drop-off?',
      a: 'Yes, we provide complimentary valet pickup and delivery within a 15-kilometer radius of our Central Flagship and Whitefield Tech Bay workshops. All valets are background-verified and cars are driven under GPS telemetry tracking.',
      cat: 'booking'
    },
    {
      q: 'Can you safely service electric vehicles (EVs) and hybrids?',
      a: 'Yes. Our specialized EV bay is staffed by certified technicians trained in high-voltage safety (up to 800V DC). We perform battery State of Health (SoH) diagnostics, cooling loop flushes, dielectric insulation testing, and regenerative braking calibrations.',
      cat: 'ev'
    },
    {
      q: 'What happens if a repair takes longer than the estimated completion time?',
      a: 'Our workshop management system calculates realistic repair durations based on standard manufacturer labor guides. In the rare event a specialized spare part shipment is delayed, your dedicated Service Advisor will notify you immediately with an updated timeline.',
      cat: 'booking'
    },
    {
      q: 'Can I inspect the old parts that were replaced during my service?',
      a: 'Absolutely. We believe in 100% transparency. All old worn parts (spark plugs, filters, brake pads, belts) are neatly packaged and placed in your trunk for your physical inspection at vehicle handover.',
      cat: 'warranty'
    }
  ];

  const filteredFaqs = faqs.filter(item => {
    const matchesCat = activeCat === 'all' || item.cat === activeCat;
    const matchesSearch =
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
          Help & Answers
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Everything you need to know about our honest repair standards, warranties, and digital inspection process.
        </p>

        {/* Search Input */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs (e.g. warranty, estimate, valet pickup)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:border-[#168C91] focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-bold">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'pricing', label: 'Estimates & Pricing' },
            { id: 'warranty', label: 'Parts & Warranty' },
            { id: 'inspection', label: 'Inspection (DVI)' },
            { id: 'booking', label: 'Booking & Valet' },
            { id: 'ev', label: 'EV & Hybrid' }
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeCat === c.id
                  ? 'bg-[#18324A] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-3 mb-16">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#DCE3E8] overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm text-[#18324A] cursor-pointer hover:text-[#168C91] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#168C91]' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions? */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center space-y-3">
        <h3 className="text-base font-bold text-[#18324A]">Still have questions regarding your vehicle?</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Our service advisors are available to review your symptoms or provide a custom quote.
        </p>
        <button
          onClick={() => navigateTo('contact')}
          className="bg-[#18324A] hover:bg-[#27323A] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          Contact Our Workshop Team
        </button>
      </div>
    </div>
  );
};
