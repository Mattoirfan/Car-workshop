import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Calendar,
  Wrench,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Plus,
  RefreshCw,
  Search,
  Sliders,
  DollarSign
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    bookings,
    repairJobs,
    inventory,
    restockPart,
    staff,
    services,
    invoices,
    navigateTo,
    setSelectedJobRef
  } = useApp();

  const [activeTab, setActiveTab] = useState<'kpis' | 'inventory' | 'staff' | 'bookings'>('kpis');

  // Inventory search
  const [invSearch, setInvSearch] = useState('');

  // Financial calculations
  const totalRevenue = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.total, 0);

  const outstandingRevenue = invoices
    .filter(i => i.status === 'unpaid')
    .reduce((sum, i) => sum + i.total, 0);

  const lowStockParts = inventory.filter(p => p.stockQty <= p.minReorderLevel);

  const filteredInventory = inventory.filter(
    p => p.name.toLowerCase().includes(invSearch.toLowerCase()) ||
         p.sku.toLowerCase().includes(invSearch.toLowerCase()) ||
         p.category.toLowerCase().includes(invSearch.toLowerCase())
  );

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Top Banner */}
      <div className="bg-[#18324A] text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <span className="text-xs font-bold text-[#168C91] uppercase tracking-wider block">
            Executive Operations Suite
          </span>
          <h1 className="text-2xl font-bold">DriveCraft Autocare Workshop Admin</h1>
          <span className="text-xs text-slate-300 font-mono mt-0.5 block">
            Bengaluru Central Flagship Bay Facility · Enterprise Control
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('book-service')}
            className="bg-[#F07838] hover:bg-[#d86629] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            + Create Walk-in Booking
          </button>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('kpis')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'kpis'
              ? 'bg-[#18324A] text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Executive KPIs & Revenue
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-[#18324A] text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Parts Inventory & Stock ({inventory.length})
          {lowStockParts.length > 0 && (
            <span className="ml-1.5 px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px]">
              {lowStockParts.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'staff'
              ? 'bg-[#18324A] text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Technicians & Bay Allocations ({staff.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'bookings'
              ? 'bg-[#18324A] text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          All Workshop Jobs ({repairJobs.length})
        </button>
      </div>

      {/* TAB 1: EXECUTIVE KPIS */}
      {activeTab === 'kpis' && (
        <div className="space-y-8">
          {/* KPI Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Total Bookings</span>
              <span className="text-3xl font-extrabold text-[#18324A]">{bookings.length}</span>
              <span className="text-[11px] text-emerald-600 block mt-2 font-semibold">↑ 18% vs Last Month</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Active in Bay</span>
              <span className="text-3xl font-extrabold text-[#168C91]">{repairJobs.length}</span>
              <span className="text-[11px] text-slate-500 block mt-2 font-semibold">8 Bays Capacity</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Awaiting Approval</span>
              <span className="text-3xl font-extrabold text-amber-500">
                {repairJobs.filter(j => j.currentStage === 'awaiting_customer_approval').length}
              </span>
              <span className="text-[11px] text-amber-600 block mt-2 font-semibold">Action Required</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Low Stock Alerts</span>
              <span className="text-3xl font-extrabold text-red-500">{lowStockParts.length}</span>
              <span className="text-[11px] text-red-600 block mt-2 font-semibold">Reorder Required</span>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Revenue Inflow (Current Cycle)
              </span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-extrabold text-[#18324A] font-mono">
                  ₹{totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-semibold text-emerald-600">Settled & Verified</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Processed via digital payment gateways (UPI, RuPay, NetBanking) and point-of-sale workshop terminal with 18% GST audit records.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Outstanding Invoices (Awaiting Handover)
              </span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-extrabold text-amber-600 font-mono">
                  ₹{outstandingRevenue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-semibold text-slate-400">Due at collection</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Customers pay upon vehicle inspection in the handover bay. Invoices generate automated payment reminder links.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#18324A]">Genuine Parts Catalogue & Warehouse Stock</h3>
              <span className="text-xs text-slate-500">Track SKUs, retail pricing, minimum thresholds, and stock allocation.</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search part or SKU..."
                value={invSearch}
                onChange={(e) => setInvSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs w-56 focus:outline-none focus:border-[#168C91]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                  <th className="pb-3">SKU</th>
                  <th className="pb-3">Part Name & Supplier</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Rack</th>
                  <th className="pb-3 text-right">In Stock</th>
                  <th className="pb-3 text-right">Cost / Retail</th>
                  <th className="pb-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInventory.map(part => {
                  const isLow = part.stockQty <= part.minReorderLevel;
                  return (
                    <tr key={part.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 font-mono font-bold text-[#168C91]">
                        {part.sku}
                      </td>
                      <td className="py-3.5 pr-4">
                        <strong className="text-slate-800 block">{part.name}</strong>
                        <span className="text-[11px] text-slate-400">{part.supplier} · {part.compatibleVehicles}</span>
                      </td>
                      <td className="py-3.5 text-slate-600">{part.category}</td>
                      <td className="py-3.5 font-mono text-slate-500">{part.shelfLocation}</td>
                      <td className="py-3.5 text-right">
                        <span className={`font-mono font-bold ${isLow ? 'text-red-600 font-extrabold' : 'text-slate-800'}`}>
                          {part.stockQty} units
                        </span>
                        {isLow && (
                          <span className="block text-[9px] uppercase font-bold text-red-500">
                            Low Stock! (Min {part.minReorderLevel})
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-right font-mono">
                        <span className="text-slate-400 block text-[11px]">Cost: ₹{part.costPrice}</span>
                        <strong className="text-[#18324A]">₹{part.retailPrice}</strong>
                      </td>
                      <td className="py-3.5 text-center">
                        <button
                          onClick={() => restockPart(part.id, 10)}
                          className="bg-slate-100 hover:bg-[#E4F3F1] text-[#168C91] text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                        >
                          + Restock (10)
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: STAFF & BAY ALLOCATIONS */}
      {activeTab === 'staff' && (
        <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-[#18324A]">Certified Technicians & Service Advisors</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staff.map(member => (
              <div key={member.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                  <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm text-[#18324A]">{member.name}</strong>
                    <span className="text-[10px] font-bold uppercase text-[#168C91] bg-teal-50 px-2 py-0.5 rounded">
                      {member.activeJobsCount} Active Jobs
                    </span>
                  </div>
                  <span className="text-slate-600 font-semibold block">{member.title}</span>
                  <p className="text-slate-500 text-[11px]">{member.bio}</p>

                  <div className="pt-2 text-[10px] text-slate-400">
                    Certifications: {member.certifications.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ALL WORKSHOP JOBS */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 shadow-xs">
          <h3 className="text-base font-bold text-[#18324A] mb-4">Master Repair Jobs Directory</h3>

          <div className="divide-y divide-slate-100 text-xs">
            {repairJobs.map(job => (
              <div key={job.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-[#18324A]">{job.vehicleInfo.make} {job.vehicleInfo.model}</strong>
                    <span className="font-mono font-bold text-[#168C91]">{job.bookingRef}</span>
                    <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {job.vehicleInfo.regNumber}
                    </span>
                  </div>
                  <span className="text-slate-500 block mt-1">
                    Customer: {job.customerName} ({job.customerPhone}) · Advisor: {job.serviceAdvisor}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold uppercase bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    {job.currentStage.replace(/_/g, ' ')}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedJobRef(job.bookingRef);
                      navigateTo('track-repair');
                    }}
                    className="text-xs font-bold text-[#168C91] hover:underline"
                  >
                    Track Job →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
