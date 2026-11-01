import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Wrench,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Camera
} from 'lucide-react';
import { InspectionPriority, CustomerDecision } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const InspectionReportViewer: React.FC = () => {
  const {
    inspectionReports,
    selectedJobRef,
    approveInspectionItem,
    navigateTo,
    addToast
  } = useApp();

  // Find active inspection report
  const activeReport = inspectionReports.find(
    r => r.bookingRef === (selectedJobRef || 'DC-84920')
  ) || inspectionReports[0];

  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [activeItemForQuestion, setActiveItemForQuestion] = useState<string>('');
  const [questionText, setQuestionText] = useState('');

  // Filter tabs: All, Green, Amber, Red
  const [filter, setFilter] = useState<'all' | InspectionPriority>('all');

  const filteredItems = activeReport ? activeReport.items.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  }) : [];

  const handleAskQuestion = (componentName: string) => {
    setActiveItemForQuestion(componentName);
    setQuestionModalOpen(true);
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (questionText.trim()) {
      addToast(`Clarification request sent to Lead Advisor Ananya Sharma regarding ${activeItemForQuestion}`, 'success');
      setQuestionText('');
      setQuestionModalOpen(false);
    }
  };

  const greenCount = activeReport?.items.filter(i => i.status === 'green').length || 0;
  const amberCount = activeReport?.items.filter(i => i.status === 'amber').length || 0;
  const redCount = activeReport?.items.filter(i => i.status === 'red').length || 0;

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
            Technician Findings & Evidence
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
            Digital Vehicle Inspection (DVI) Report
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Review detailed findings with Green, Amber, and Red safety indicators before work starts.
          </p>
        </div>

        <button
          onClick={() => navigateTo('estimate')}
          className="inline-flex items-center gap-2 bg-[#F07838] hover:bg-[#d86629] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <span>Go to Itemized Estimate</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {activeReport ? (
        <div className="space-y-8">
          {/* Top Score & Summary Card */}
          <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-slate-400">Inspected Vehicle</span>
                <h2 className="text-xl font-bold text-[#18324A]">{activeReport.vehicleDetails}</h2>
                <span className="text-xs text-slate-500 font-mono">
                  Job Reference: <strong className="text-[#168C91]">{activeReport.bookingRef}</strong> · Inspected by {activeReport.leadTechnician}
                </span>
              </div>

              {/* Health Score Gauge */}
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Health Index</span>
                  <span className="text-2xl font-extrabold text-emerald-600 block">
                    {activeReport.overallHealthScore} / 100
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <FileCheck className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Filter Counts */}
            <div className="grid grid-cols-3 gap-3 pt-4 text-xs font-semibold">
              <button
                onClick={() => setFilter(filter === 'green' ? 'all' : 'green')}
                className={`p-3 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                  filter === 'green' ? 'bg-emerald-100/70 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300' : 'bg-emerald-50/50 border-emerald-200 text-emerald-800'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Green · Passed ({greenCount})
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-700">Healthy</span>
              </button>

              <button
                onClick={() => setFilter(filter === 'amber' ? 'all' : 'amber')}
                className={`p-3 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                  filter === 'amber' ? 'bg-amber-100/70 border-amber-400 text-amber-900 ring-2 ring-amber-300' : 'bg-amber-50/50 border-amber-200 text-amber-800'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Amber · Attention ({amberCount})
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-700">Monitor</span>
              </button>

              <button
                onClick={() => setFilter(filter === 'red' ? 'all' : 'red')}
                className={`p-3 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                  filter === 'red' ? 'bg-red-100/70 border-red-400 text-red-900 ring-2 ring-red-300' : 'bg-red-50/50 border-red-200 text-red-800'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-600" />
                  Red · Urgent ({redCount})
                </span>
                <span className="text-[10px] uppercase font-bold text-red-700">Action</span>
              </button>
            </div>

            {/* Technician Summary Prose */}
            <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <strong className="text-[#18324A] block mb-1">Lead Technician Note:</strong>
              {activeReport.customerSummary}
            </div>
          </div>

          {/* Inspection Items List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#18324A]">
                Inspected Components & Findings ({filteredItems.length})
              </h3>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="text-xs font-semibold text-[#168C91] hover:underline"
                >
                  Clear Filter (Show All)
                </button>
              )}
            </div>

            {filteredItems.map((item) => {
              const isGreen = item.status === 'green';
              const isAmber = item.status === 'amber';
              const isRed = item.status === 'red';

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs transition-all ${
                    isRed
                      ? 'border-red-200 ring-1 ring-red-200/50'
                      : isAmber
                      ? 'border-amber-200 ring-1 ring-amber-200/50'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isGreen
                              ? 'bg-emerald-100 text-emerald-800'
                              : isAmber
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.status.toUpperCase()} PRIORITY
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          {item.system}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#18324A] mt-1">
                        {item.component}
                      </h4>
                    </div>

                    {/* Cost estimate if applicable */}
                    {item.estimatedCost && (
                      <div className="sm:text-right">
                        <span className="text-[10px] font-semibold text-slate-400 block uppercase">Quoted Cost</span>
                        <span className="text-base font-extrabold text-[#18324A]">
                          ₹{item.estimatedCost.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Findings Description & Photo Evidence */}
                  <div className="py-3 text-xs grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                    <div className="sm:col-span-8 space-y-2">
                      <div>
                        <strong className="text-slate-800 block text-[11px] mb-0.5">Technician Finding:</strong>
                        <p className="text-slate-600 leading-relaxed">{item.finding}</p>
                      </div>

                      <div>
                        <strong className="text-slate-800 block text-[11px] mb-0.5">Recommended Next Action:</strong>
                        <p className="text-slate-600 leading-relaxed">{item.recommendation}</p>
                      </div>
                    </div>

                    {item.imageUrl && (
                      <div className="sm:col-span-4 rounded-xl overflow-hidden border border-slate-200">
                        <div className="relative group">
                          <ImageWithFallback
                            src={item.imageUrl}
                            alt={`${item.component} photo evidence`}
                            aspectRatio="16/9"
                            className="w-full h-28 object-cover"
                          />
                          <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-mono flex items-center gap-1">
                            <Camera className="w-2.5 h-2.5" />
                            Bay Photo
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Customer Decision / Action Controls */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-slate-500 text-[11px]">
                      Reviewed by: <strong>{item.reviewedBy}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAskQuestion(item.component)}
                        className="inline-flex items-center gap-1 text-slate-600 hover:text-[#18324A] px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Ask Advisor</span>
                      </button>

                      {!isGreen && (
                        <>
                          <button
                            onClick={() => approveInspectionItem(activeReport.id, item.id, 'declined')}
                            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                              item.customerDecision === 'declined'
                                ? 'bg-red-50 text-red-700 border border-red-200 font-bold'
                                : 'text-slate-500 hover:text-red-600 border border-slate-200'
                            }`}
                          >
                            Decline Work
                          </button>

                          <button
                            onClick={() => approveInspectionItem(activeReport.id, item.id, 'approved')}
                            className={`px-4 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                              item.customerDecision === 'approved'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-[#168C91] hover:bg-[#126f73] text-white'
                            }`}
                          >
                            {item.customerDecision === 'approved' ? '✓ Authorized' : 'Authorize Repair'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-sm text-slate-500">No inspection report loaded.</p>
        </div>
      )}

      {/* Ask Question Clarification Modal */}
      {questionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-[#18324A] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#168C91]" />
              Clarification on {activeItemForQuestion}
            </h3>
            <p className="text-xs text-slate-600">
              Your inquiry will be directly routed to Lead Service Advisor Ananya Sharma. She will respond via phone or WhatsApp.
            </p>

            <form onSubmit={handleSendQuestion} className="space-y-4">
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="e.g. Can this repair wait until the next service at 45,000 km, or is there immediate safety risk on highway driving?"
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                required
              />

              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setQuestionModalOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#168C91] hover:bg-[#126f73] text-white font-bold px-5 py-2 rounded-xl transition-colors"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
