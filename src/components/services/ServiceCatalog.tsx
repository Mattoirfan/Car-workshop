import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Calendar,
  X,
  Wrench
} from 'lucide-react';
import { ServiceCategory, ServiceItem } from '../../types';

export const ServiceCatalog: React.FC = () => {
  const { services, navigateTo, pageParam } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(() => {
    if (pageParam) {
      return services.find(s => s.slug === pageParam) || null;
    }
    return null;
  });

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'routine-maintenance', label: 'Routine Servicing' },
    { id: 'engine-diagnostics', label: 'Engine & Diagnostics' },
    { id: 'brake-services', label: 'Brakes' },
    { id: 'tires-wheels', label: 'Tires & Alignment' },
    { id: 'battery-electrical', label: 'Battery & Electrical' },
    { id: 'ac-climate', label: 'Air Conditioning' },
    { id: 'suspension-steering', label: 'Suspension' },
    { id: 'transmission-clutch', label: 'Transmission' },
    { id: 'bodywork-paint', label: 'Dent & Paint' },
    { id: 'detailing-care', label: 'Detailing' },
    { id: 'pre-purchase', label: 'Pre-Purchase' },
    { id: 'roadside', label: 'Roadside 24/7' },
    { id: 'hybrid-ev', label: 'Hybrid & EV' },
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCategory = selectedCategory === 'all' || srv.category === selectedCategory;
    const matchesSearch =
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.commonSymptoms.some(sym => sym.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openServiceDetails = (srv: ServiceItem) => {
    setActiveModalService(srv);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Title & Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
          Precision Multi-Brand Workshop
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
          Comprehensive Automotive Services
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          From preventative factory servicing to master computerized diagnostics and high-voltage EV checks.
        </p>

        {/* Search Bar */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by service or symptom (e.g. brake squeak, AC warm)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:border-[#168C91] focus:outline-none shadow-xs"
          />
        </div>
      </div>

      {/* Category Filter Tabs (Single-line interactive buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#18324A] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
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

              <h3 className="text-base font-bold text-[#18324A] group-hover:text-[#168C91] transition-colors mb-2">
                {service.name}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                {service.shortDescription}
              </p>

              {/* Symptoms Preview */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[11px] text-slate-600 mb-4">
                <strong className="text-slate-800 block mb-1">When to Request:</strong>
                <span className="italic line-clamp-2">{service.commonSymptoms[0]}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Starting from</span>
                <span className="text-base font-extrabold text-[#18324A]">
                  ₹{service.startingPrice.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openServiceDetails(service)}
                  className="text-xs font-semibold text-slate-600 hover:text-[#18324A] px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigateTo('book-service')}
                  className="text-xs font-bold text-white bg-[#F07838] hover:bg-[#d86629] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <p className="text-sm text-slate-600 mb-3">No services match your search query.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs font-bold text-[#168C91] underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* SERVICE DETAIL MODAL */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 rounded-2xl overflow-hidden">
              <ImageWithFallback
                src={activeModalService.imageUrl}
                alt={activeModalService.name}
                category={activeModalService.category}
                aspectRatio="16/9"
                className="w-full h-52 object-cover"
              />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#168C91] block mb-1">
              {activeModalService.category.replace('-', ' ')}
            </span>
            <h2 className="text-2xl font-extrabold text-[#18324A] mb-3">
              {activeModalService.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {activeModalService.fullDescription}
            </p>

            {/* Scope & Inclusions */}
            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-[#18324A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Standard Service Scope & Inclusions
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeModalService.typicalScope.map((scope, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#168C91] font-bold">·</span>
                      <span>{scope}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Exclusions & Extra Items
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {activeModalService.exclusions.map((exc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold">·</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price & Booking Footer */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Indicative Starting Price</span>
                <span className="text-xl font-extrabold text-[#18324A]">
                  ₹{activeModalService.startingPrice.toLocaleString('en-IN')}*
                </span>
                <span className="text-[11px] text-slate-500 block">Warranty: {activeModalService.warrantyPeriod}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveModalService(null);
                    navigateTo('estimate');
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900"
                >
                  Request Detailed Estimate
                </button>
                <button
                  onClick={() => {
                    setActiveModalService(null);
                    navigateTo('book-service');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#F07838] hover:bg-[#d86629] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Book This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
