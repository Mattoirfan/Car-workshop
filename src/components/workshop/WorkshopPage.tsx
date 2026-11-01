import React from 'react';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Coffee,
  RotateCcw
} from 'lucide-react';

export const WorkshopPage: React.FC = () => {
  const { navigateTo } = useApp();

  const facilities = [
    {
      title: '8 Dedicated Hydraulic Service Bays',
      desc: 'Dual-post and scissor hydraulic lifts certified for vehicles up to 4.5 tons, allowing safe under-chassis inspections without paint contact.',
      category: 'general',
      imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Hunter 3D Laser Wheel Alignment',
      desc: 'High-definition digital optical imaging cameras measure camber, caster, and toe to within 0.01 degrees of factory specifications.',
      category: 'tires-wheels',
      imageUrl: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Bosch & Autel Diagnostic Consoles',
      desc: 'OE-level bidirectional computer scanners capable of coding injectors, calibrating steering angle sensors, and monitoring live fuel trims.',
      category: 'engine-diagnostics',
      imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Certified High-Voltage EV Safety Bay',
      desc: 'Equipped with 1000V dielectric insulated hand tools, high-voltage rescue hooks, and thermal management fluid evacuation systems.',
      category: 'hybrid-ev',
      imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Automated AC Gas Recovery Station',
      desc: 'Zero-emission R134a/R1234yf recovery, vacuum moisture dehydration, and computerized gram-accurate refrigerant recharge.',
      category: 'ac-climate',
      imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Customer Observation Lounge',
      desc: 'Comfortable air-conditioned reception lounge with high-speed Wi-Fi, premium espresso coffee, and clear glass observation windows overlooking service bays.',
      category: 'detailing-care',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
          Infrastructure & Technology
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
          Our Workshop & Diagnostic Facilities
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Engineered for clinical cleanliness, mechanical precision, and complete customer transparency.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {facilities.map((fac, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-[#DCE3E8] shadow-xs flex flex-col justify-between"
          >
            <div>
              <ImageWithFallback
                src={fac.imageUrl}
                alt={fac.title}
                category={fac.category}
                aspectRatio="16/9"
                className="w-full h-44 rounded-2xl mb-4"
              />
              <h3 className="text-base font-bold text-[#18324A] mb-2">{fac.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{fac.desc}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-[#168C91] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>DriveCraft Certified Facility Standard</span>
            </div>
          </div>
        ))}
      </div>

      {/* Environmental & Waste Safety */}
      <div className="bg-[#18324A] text-white rounded-3xl p-8 sm:p-10 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
            Environmental Responsibility
          </span>
          <h2 className="text-2xl font-bold mb-3">Eco-Friendly Automotive Practices</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            Automotive maintenance generates hazardous materials. We partner with state-authorized recyclers to ensure 100% of drained motor oil, ethylene glycol coolant, and lead-acid batteries are safely neutralized and repurposed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#168C91]" />
              <span>Zero ground fluid leakage policy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#168C91]" />
              <span>Certified used battery recycling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#168C91]" />
              <span>Oil-water separator drainage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
