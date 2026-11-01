import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  CreditCard,
  PlusCircle,
  ArrowRight,
  Info
} from 'lucide-react';

export const EstimateViewer: React.FC = () => {
  const {
    estimates,
    selectedJobRef,
    approveEstimateLine,
    approveFullEstimate,
    navigateTo,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'review' | 'new-request'>('review');

  // Form state for requesting a new estimate
  const [newMake, setNewMake] = useState('Honda');
  const [newModel, setNewModel] = useState('City');
  const [newYear, setNewYear] = useState('2021');
  const [newIssue, setNewIssue] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('+91 98450 11223');

  const currentEstimate = estimates.find(
    e => e.bookingRef === (selectedJobRef || 'DC-84920')
  ) || estimates[0];

  const handleNewRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Your estimate request has been logged. Our service advisors will send a line-by-line quote within 45 minutes.', 'success');
    setActiveTab('review');
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
            Transparent Pricing Guarantee
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
            Service Estimates & Authorizations
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Every nut, bolt, and labor hour itemized. You only pay for work you explicitly authorize.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'review'
                ? 'bg-[#18324A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Review Active Estimate
          </button>
          <button
            onClick={() => setActiveTab('new-request')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'new-request'
                ? 'bg-[#18324A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Request New Estimate
          </button>
        </div>
      </div>

      {activeTab === 'review' && currentEstimate ? (
        <div className="space-y-8">
          {/* Top Estimate Header */}
          <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase text-slate-400">Estimate Reference</span>
                <div className="flex items-center gap-3 mt-0.5">
                  <h2 className="text-2xl font-extrabold text-[#18324A] font-mono">
                    #{currentEstimate.id.toUpperCase()}
                  </h2>
                  <span className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    currentEstimate.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {currentEstimate.status.toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-slate-500 mt-1 block">
                  Associated with Job Reference: <strong className="text-[#168C91]">{currentEstimate.bookingRef}</strong>
                </span>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-slate-400 block font-medium">Valid Until</span>
                <span className="text-xs font-bold text-slate-700">
                  {new Date(currentEstimate.validUntil).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Itemized Line Items Table */}
            <div className="pt-6">
              <h3 className="text-sm font-bold text-[#18324A] mb-4">
                Parts, Labor & Diagnostic Line Items
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="pb-3 w-8">Authorize</th>
                      <th className="pb-3">Description & Scope</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3 text-right">Unit Rate</th>
                      <th className="pb-3 text-right">Qty</th>
                      <th className="pb-3 text-right">Total (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentEstimate.items.map((line) => (
                      <tr key={line.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 pr-2">
                          <input
                            type="checkbox"
                            checked={line.approvedByCustomer}
                            disabled={line.isMandatory} // Mandatory base service is fixed
                            onChange={(e) => approveEstimateLine(currentEstimate.id, line.id, e.target.checked)}
                            className="w-4 h-4 text-[#168C91] rounded border-slate-300 focus:ring-0 cursor-pointer"
                            title={line.isMandatory ? 'Included in base package' : 'Toggle authorization'}
                          />
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className={`font-semibold text-slate-800 block ${!line.approvedByCustomer ? 'text-slate-400 line-through' : ''}`}>
                            {line.description}
                          </span>
                          {line.isMandatory ? (
                            <span className="text-[10px] text-emerald-600 font-medium">
                              Base Scheduled Service Item
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-600 font-medium">
                              Technician Recommendation from DVI Inspection
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 pr-4 capitalize text-slate-500 font-medium">
                          {line.category}
                        </td>
                        <td className="py-3.5 text-right font-mono text-slate-700">
                          ₹{line.unitCost.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 text-right font-mono text-slate-700">
                          {line.quantity}
                        </td>
                        <td className="py-3.5 text-right font-bold text-[#18324A] font-mono">
                          ₹{line.total.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Calculations Box */}
              <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-6">
                <div className="text-xs text-slate-500 max-w-sm space-y-2">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#168C91] shrink-0 mt-0.5" />
                    <span>All parts billed match genuine manufacturer OEM specifications.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#F07838] shrink-0 mt-0.5" />
                    <span>Prices are inclusive of standard 6-month workshop labor guarantee.</span>
                  </div>
                </div>

                <div className="sm:w-72 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Approved Subtotal:</span>
                    <span className="font-mono font-bold text-[#18324A]">
                      ₹{currentEstimate.subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (18% Standard):</span>
                    <span className="font-mono">
                      ₹{currentEstimate.gstAmount.toFixed(2)}
                    </span>
                  </div>
                  {currentEstimate.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Loyalty Discount:</span>
                      <span className="font-mono">-₹{currentEstimate.discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-extrabold text-[#18324A]">
                    <span>Net Total:</span>
                    <span className="text-[#168C91] font-mono">
                      ₹{currentEstimate.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Approval Actions */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => navigateTo('inspection-reports')}
                  className="text-xs font-semibold text-slate-600 hover:text-[#18324A] underline"
                >
                  ← Cross-check Inspection Report Photos
                </button>

                <div className="flex items-center gap-3">
                  {currentEstimate.status !== 'approved' ? (
                    <button
                      onClick={() => approveFullEstimate(currentEstimate.id)}
                      className="inline-flex items-center gap-2 bg-[#F07838] hover:bg-[#d86629] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Authorize Work to Begin</span>
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Estimate Authorized · Work Active in Bay</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'new-request' ? (
        /* New Estimate Request Form */
        <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-[#18324A] mb-4">
            Request an Upfront Repair or Diagnostic Estimate
          </h2>
          <p className="text-xs text-slate-600 mb-6">
            Describe your vehicle symptoms or required maintenance. Our certified estimators will review repair times and OEM part prices to provide an itemized quote before you visit.
          </p>

          <form onSubmit={handleNewRequestSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Make *</label>
                <input
                  type="text"
                  value={newMake}
                  onChange={(e) => setNewMake(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#168C91] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Model *</label>
                <input
                  type="text"
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#168C91] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Year</label>
                <input
                  type="number"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#168C91] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Description of Issue, Symptoms or Warning Lights *
              </label>
              <textarea
                value={newIssue}
                onChange={(e) => setNewIssue(e.target.value)}
                placeholder="e.g. Grinding sound when depressing clutch pedal, Check Engine light code P0302, need quote for replacing timing belt..."
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                WhatsApp Phone Number for Estimate Delivery *
              </label>
              <input
                type="text"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                className="w-full sm:w-80 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#168C91] focus:outline-none"
                required
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-[#18324A] hover:bg-[#27323A] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Submit Estimate Request
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};
