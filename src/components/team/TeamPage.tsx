import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Wrench, ShieldCheck, Globe, Calendar, ArrowRight } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { staff, navigateTo } = useApp();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
          Master Mechanics & Service Advisors
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
          Meet Our Automotive Specialists
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Factory-trained diagnostic engineers, ASE certified technicians, and dedicated customer advisors who treat your car as if it were their own.
        </p>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {staff.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE3E8] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-start gap-5 mb-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-[#168C91] tracking-wider block">
                    {member.role}
                  </span>
                  <h3 className="text-xl font-bold text-[#18324A] mt-0.5">
                    {member.name}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium block mt-0.5">
                    {member.title} · {member.experienceYears} Years Experience
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {member.bio}
              </p>

              {/* Specializations */}
              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                  Core Specializations
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.specializations.map((spec, i) => (
                    <span key={i} className="text-[11px] font-medium bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications & Languages */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#F07838] shrink-0" />
                  <span className="line-clamp-1"><strong>Certifications:</strong> {member.certifications.join(', ')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#168C91] shrink-0" />
                  <span><strong>Languages:</strong> {member.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Facility: <strong>Bengaluru Central</strong>
              </span>

              <button
                onClick={() => navigateTo('book-service')}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#18324A] hover:bg-[#27323A] text-white px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Service with Team</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
