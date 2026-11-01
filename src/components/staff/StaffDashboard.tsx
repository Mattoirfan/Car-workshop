import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wrench,
  Clock,
  Car,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Package,
  Plus,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { RepairStage } from '../../types';

export const StaffDashboard: React.FC = () => {
  const {
    repairJobs,
    updateRepairStage,
    inventory,
    usePartOnJob,
    currentUser,
    navigateTo,
    setSelectedJobRef
  } = useApp();

  const [selectedJobId, setSelectedJobId] = useState<string>(repairJobs[0]?.id || '');
  const [newStage, setNewStage] = useState<RepairStage>('repair_in_progress');
  const [stageNote, setStageNote] = useState('');

  // Parts allocation modal / form
  const [selectedPartId, setSelectedPartId] = useState<string>(inventory[0]?.id || '');
  const [partQty, setPartQty] = useState<number>(1);

  const activeJob = repairJobs.find(j => j.id === selectedJobId) || repairJobs[0];

  const handleUpdateStageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeJob) {
      updateRepairStage(
        activeJob.id,
        newStage,
        stageNote.trim() || `Status updated to ${newStage.replace(/_/g, ' ')}`,
        `${currentUser.name} (Technician)`
      );
      setStageNote('');
    }
  };

  const handleAllocatePartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeJob && selectedPartId) {
      usePartOnJob(activeJob.id, selectedPartId, partQty);
    }
  };

  const STAGES_OPTIONS: { id: RepairStage; label: string }[] = [
    { id: 'appointment_confirmed', label: '1. Appointment Confirmed' },
    { id: 'vehicle_checked_in', label: '2. Vehicle Checked In' },
    { id: 'initial_inspection', label: '3. Initial Inspection' },
    { id: 'diagnosis_in_progress', label: '4. Diagnosis in Progress' },
    { id: 'estimate_prepared', label: '5. Estimate Prepared' },
    { id: 'awaiting_customer_approval', label: '6. Awaiting Customer Approval' },
    { id: 'parts_ordered', label: '7. Parts Allocated' },
    { id: 'repair_in_progress', label: '8. Repair in Progress' },
    { id: 'quality_inspection', label: '9. Quality Inspection' },
    { id: 'ready_for_collection', label: '10. Ready for Collection' },
    { id: 'completed_delivered', label: '11. Completed & Delivered' }
  ];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="bg-[#18324A] text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[#F07838] shrink-0">
            <Wrench className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#168C91] uppercase tracking-wider block">
              Workshop Bay & Technician Terminal
            </span>
            <h1 className="text-2xl font-bold">Mechanic Console: {currentUser.name}</h1>
            <span className="text-xs text-slate-300 font-mono mt-0.5 block">
              Logged in as Master Technician · Central Flagship Workshop
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('inspection-reports')}
            className="bg-[#168C91] hover:bg-[#126f73] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Digital Inspection (DVI) Viewer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Assigned Jobs List */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Active Assigned Service Jobs ({repairJobs.length})
          </h2>

          <div className="space-y-3">
            {repairJobs.map(job => (
              <div
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeJob?.id === job.id
                    ? 'border-[#168C91] bg-white ring-2 ring-[#168C91]/20 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-[#168C91]">
                    {job.bookingRef}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {job.currentStage.replace(/_/g, ' ')}
                  </span>
                </div>

                <strong className="text-sm text-[#18324A] block">
                  {job.vehicleInfo.make} {job.vehicleInfo.model} ({job.vehicleInfo.year})
                </strong>
                <span className="text-xs font-mono text-slate-500 block mt-0.5">
                  Reg: {job.vehicleInfo.regNumber}
                </span>

                <span className="text-[11px] text-slate-400 mt-2 block truncate">
                  Customer: {job.customerName} ({job.customerPhone})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Job Controls & Stage Updater */}
        {activeJob && (
          <div className="lg:col-span-8 space-y-6">
            {/* Active Job Details Header */}
            <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#18324A]">
                      {activeJob.vehicleInfo.make} {activeJob.vehicleInfo.model}
                    </h3>
                    <span className="text-xs font-mono bg-teal-50 text-[#168C91] px-2.5 py-0.5 rounded font-bold">
                      {activeJob.bookingRef}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Customer: <strong>{activeJob.customerName}</strong> · Odometer: {activeJob.vehicleInfo.odometer} km
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedJobRef(activeJob.bookingRef);
                    navigateTo('track-repair');
                  }}
                  className="text-xs font-bold text-[#18324A] hover:text-[#168C91] underline"
                >
                  View Customer-Facing Tracker →
                </button>
              </div>

              {/* Technician Notes & Reported Symptoms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-slate-800 block mb-1">Reported Symptoms:</strong>
                  <p className="text-slate-600">
                    {activeJob.internalNotes[0] || 'Scheduled periodic maintenance.'}
                  </p>
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900">
                  <strong className="block mb-1">Inspection Findings:</strong>
                  <p>
                    {activeJob.internalNotes[1] || 'Front brake pads worn to 2.8mm. Squeak from wear indicator.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Workflow Stage Updater Form */}
            <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 shadow-xs">
              <h4 className="text-sm font-bold text-[#18324A] mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#168C91]" />
                Update Repair Workflow Stage
              </h4>

              <form onSubmit={handleUpdateStageSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Next Workflow Stage *</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as RepairStage)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:border-[#168C91] focus:outline-none"
                  >
                    {STAGES_OPTIONS.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Technician Log Note</label>
                  <input
                    type="text"
                    value={stageNote}
                    onChange={(e) => setStageNote(e.target.value)}
                    placeholder="e.g. Brake calipers torqued to 35 Nm. Road test completed on high-speed ring."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#18324A] hover:bg-[#27323A] text-white font-bold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Update Job Stage & Notify Customer
                  </button>
                </div>
              </form>
            </div>

            {/* Allocate Spare Parts from Inventory */}
            <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 shadow-xs">
              <h4 className="text-sm font-bold text-[#18324A] mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#F07838]" />
                Allocate Genuine Spares to This Job
              </h4>

              <form onSubmit={handleAllocatePartSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs items-end">
                <div className="sm:col-span-8">
                  <label className="block font-bold text-slate-700 mb-1">Inventory Part</label>
                  <select
                    value={selectedPartId}
                    onChange={(e) => setSelectedPartId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none"
                  >
                    {inventory.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.stockQty} in stock) · ₹{p.retailPrice}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Qty</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={partQty}
                    onChange={(e) => setPartQty(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-center"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-[#168C91] hover:bg-[#126f73] text-white font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Allocate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
