import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  CheckCircle2,
  Clock,
  Car,
  FileCheck,
  FileText,
  User,
  Wrench,
  AlertCircle,
  CreditCard,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { RepairStage } from '../../types';

export const RepairTracker: React.FC = () => {
  const {
    repairJobs,
    selectedJobRef,
    setSelectedJobRef,
    navigateTo,
    inspectionReports,
    estimates,
    invoices
  } = useApp();

  const [searchInput, setSearchInput] = useState<string>(selectedJobRef || 'DC-84920');

  // Find job by reference
  const currentJob = repairJobs.find(
    j => j.bookingRef.toLowerCase() === (selectedJobRef || searchInput).trim().toLowerCase()
  ) || repairJobs[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSelectedJobRef(searchInput.trim().toUpperCase());
    }
  };

  const STAGES_LIST: { id: RepairStage; label: string; desc: string }[] = [
    { id: 'appointment_confirmed', label: 'Appointment Confirmed', desc: 'Bay slot reserved on schedule' },
    { id: 'vehicle_checked_in', label: 'Vehicle Checked In', desc: 'Arrived at workshop gate & inventoried' },
    { id: 'initial_inspection', label: 'Initial Inspection', desc: 'Raised on hydraulic lift for 40-point check' },
    { id: 'diagnosis_in_progress', label: 'Diagnosis in Progress', desc: 'Computer scan & symptom benchmarking' },
    { id: 'estimate_prepared', label: 'Estimate Prepared', desc: 'Parts & labor costs calculated' },
    { id: 'awaiting_customer_approval', label: 'Awaiting Customer Approval', desc: 'Awaiting your digital sign-off' },
    { id: 'parts_ordered', label: 'Parts Allocated', desc: 'OEM spares pulled from stock' },
    { id: 'repair_in_progress', label: 'Repair in Progress', desc: 'Technician working in active service bay' },
    { id: 'quality_inspection', label: 'Quality Inspection', desc: 'Road test & torque verification' },
    { id: 'ready_for_collection', label: 'Ready for Collection', desc: 'Cleaned and ready at customer bay' },
    { id: 'completed_delivered', label: 'Completed & Delivered', desc: 'Handed over with 6-month warranty' }
  ];

  const getStageIndex = (stage: RepairStage) => {
    return STAGES_LIST.findIndex(s => s.id === stage);
  };

  const currentStageIndex = currentJob ? getStageIndex(currentJob.currentStage) : 0;

  // Associated documents
  const inspection = inspectionReports.find(r => r.bookingRef === currentJob?.bookingRef);
  const estimate = estimates.find(e => e.bookingRef === currentJob?.bookingRef);
  const invoice = invoices.find(i => i.bookingRef === currentJob?.bookingRef);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto min-h-screen">
      {/* Search Bar Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
            Real-Time Workshop Transparency
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
            Track My Repair Live
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Follow your vehicle through every stage of inspection, diagnosis, and quality control.
          </p>
        </div>

        {/* Reference Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter Ref (e.g. DC-84920)"
            className="p-2.5 rounded-xl border border-slate-200 bg-white font-mono text-xs font-bold w-48 sm:w-56 focus:outline-none focus:border-[#168C91]"
          />
          <button
            type="submit"
            className="bg-[#18324A] hover:bg-[#27323A] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Lookup
          </button>
        </form>
      </div>

      {currentJob ? (
        <div className="space-y-8">
          {/* Top Job Overview Card */}
          <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-[#168C91] flex items-center justify-center shrink-0">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-[#18324A]">
                      {currentJob.vehicleInfo.make} {currentJob.vehicleInfo.model} ({currentJob.vehicleInfo.year})
                    </h2>
                    <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-bold">
                      {currentJob.vehicleInfo.regNumber}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    Job Ref: <strong className="font-mono text-[#168C91]">{currentJob.bookingRef}</strong> · Odometer: {currentJob.vehicleInfo.odometer.toLocaleString('en-IN')} km · {currentJob.vehicleInfo.fuelType}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Current Status
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase bg-[#E4F3F1] text-[#168C91] border border-[#168C91]/20">
                  <span className="w-2 h-2 rounded-full bg-[#168C91] animate-pulse" />
                  {currentJob.currentStage.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* Quick Details Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Assigned Lead Tech</span>
                <strong className="text-[#18324A] flex items-center gap-1 mt-0.5">
                  <Wrench className="w-3.5 h-3.5 text-[#168C91]" />
                  {currentJob.assignedTechnician}
                </strong>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Service Advisor</span>
                <strong className="text-[#18324A] flex items-center gap-1 mt-0.5">
                  <User className="w-3.5 h-3.5 text-[#F07838]" />
                  {currentJob.serviceAdvisor}
                </strong>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Facility Bay</span>
                <span className="text-slate-700 font-medium block mt-0.5 truncate">{currentJob.branch.split('(')[0]}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Estimated Handover</span>
                <strong className="text-slate-800 flex items-center gap-1 mt-0.5 text-[#168C91]">
                  <Clock className="w-3.5 h-3.5" />
                  {currentJob.estimatedCompletion}
                </strong>
              </div>
            </div>
          </div>

          {/* Action Required Banner if Awaiting Customer Approval */}
          {currentJob.currentStage === 'awaiting_customer_approval' && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-900 text-sm">Action Needed: Review & Approve Technician Estimate</h3>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Your technician completed the initial multi-point inspection. Please review the itemized quote so work can begin.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigateTo('inspection-reports')}
                  className="bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
                >
                  View Inspection Photos
                </button>
                <button
                  onClick={() => navigateTo('estimate')}
                  className="bg-[#F07838] hover:bg-[#d86629] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Review & Authorize
                </button>
              </div>
            </div>
          )}

          {/* 11-STAGE PROGRESS TIMELINE */}
          <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-[#18324A] mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#168C91]" />
              Workshop Process Timeline (11 Stages)
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {STAGES_LIST.map((stage, idx) => {
                const isPassed = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                const historyEntry = currentJob.stageHistory.find(h => h.stage === stage.id);

                return (
                  <div key={stage.id} className="relative group">
                    {/* Circle Node */}
                    <span
                      className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isPassed
                          ? 'bg-[#168C91] text-white'
                          : isCurrent
                          ? 'bg-[#F07838] text-white ring-4 ring-[#F07838]/20 animate-pulse'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </span>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className={`text-sm font-bold ${isCurrent ? 'text-[#F07838]' : isPassed ? 'text-[#18324A]' : 'text-slate-400'}`}>
                        {stage.label}
                      </h4>
                      {historyEntry && (
                        <span className="text-[11px] font-mono text-slate-400">
                          {new Date(historyEntry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(historyEntry.timestamp).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5">
                      {stage.desc}
                    </p>

                    {/* Historical note logged by technician/advisor */}
                    {historyEntry?.note && (
                      <div className="mt-2 text-xs bg-slate-50 border border-slate-200 text-slate-700 p-2.5 rounded-lg">
                        <strong className="text-[#18324A] text-[11px] block">{historyEntry.actor}:</strong>
                        <span>{historyEntry.note}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Access to Documents (DVI, Estimate, Invoice) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Inspection Report Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-[#168C91] flex items-center justify-center mb-3">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#18324A] text-sm">Digital Inspection Report</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Multi-point inspection findings with Green, Amber, Red component health grades.
                </p>
              </div>
              <button
                onClick={() => navigateTo('inspection-reports')}
                className="w-full py-2 bg-slate-50 hover:bg-[#E4F3F1] text-[#168C91] font-bold text-xs rounded-lg border border-slate-200 transition-colors"
              >
                Open Inspection Report
              </button>
            </div>

            {/* Service Estimate Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#F07838] flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#18324A] text-sm">Itemized Repair Estimate</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Breakdown of OEM parts, technician labor, GST, and optional recommendations.
                </p>
              </div>
              <button
                onClick={() => navigateTo('estimate')}
                className="w-full py-2 bg-slate-50 hover:bg-orange-50 text-[#F07838] font-bold text-xs rounded-lg border border-slate-200 transition-colors"
              >
                Review Itemized Estimate
              </button>
            </div>

            {/* Invoice & Payment Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-[#18324A] flex items-center justify-center mb-3">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#18324A] text-sm">Invoice & Payment</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Status: <strong className={invoice?.status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}>
                    {invoice?.status ? invoice.status.toUpperCase() : 'PENDING APPROVAL'}
                  </strong>
                </p>
              </div>
              <button
                onClick={() => navigateTo('checkout')}
                className="w-full py-2 bg-[#18324A] hover:bg-[#27323A] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                {invoice?.status === 'paid' ? 'View Receipt' : 'Pay Online (UPI / Card)'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-sm text-slate-500">No active job found for reference "{searchInput}".</p>
          <button
            onClick={() => setSelectedJobRef('DC-84920')}
            className="mt-3 text-xs font-bold text-[#168C91] underline"
          >
            Load Demo Repair Job (DC-84920)
          </button>
        </div>
      )}
    </div>
  );
};
