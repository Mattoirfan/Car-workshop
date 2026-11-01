import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Car,
  Calendar,
  Wrench,
  CreditCard,
  User,
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  FileCheck,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { FuelType, TransmissionType, VehicleType } from '../../types';

export const CustomerPortal: React.FC = () => {
  const {
    currentUser,
    userVehicles,
    addVehicle,
    deleteVehicle,
    bookings,
    cancelBooking,
    repairJobs,
    invoices,
    navigateTo,
    setSelectedJobRef
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'bookings' | 'invoices'>('overview');

  // New vehicle form modal state
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newMake, setNewMake] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newYear, setNewYear] = useState<number>(2022);
  const [newFuel, setNewFuel] = useState<FuelType>('Petrol');
  const [newTrans, setNewTrans] = useState<TransmissionType>('Automatic');
  const [newReg, setNewReg] = useState('');
  const [newOdo, setNewOdo] = useState<number>(24000);

  const handleAddVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMake.trim() && newModel.trim()) {
      addVehicle({
        make: newMake.trim(),
        model: newModel.trim(),
        year: Number(newYear),
        fuelType: newFuel,
        transmission: newTrans,
        regNumber: newReg.trim() || 'Unregistered',
        odometer: Number(newOdo)
      });
      setShowAddVehicleModal(false);
      setNewMake('');
      setNewModel('');
      setNewReg('');
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Welcome Banner */}
      <div className="bg-[#18324A] text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#168C91]/30 border border-[#168C91]/40 flex items-center justify-center text-white font-extrabold text-xl shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <span className="text-xs font-semibold text-[#168C91] uppercase tracking-wider block">
              Customer Account Portal
            </span>
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <span className="text-xs text-slate-300 font-mono mt-0.5 block">
              {currentUser.email} · {currentUser.phone}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('book-service')}
            className="bg-[#F07838] hover:bg-[#d86629] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            + Book New Service
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#18324A] text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Overview & Active Jobs
        </button>

        <button
          onClick={() => setActiveTab('vehicles')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'vehicles'
              ? 'bg-[#18324A] text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          My Garage ({userVehicles.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'bookings'
              ? 'bg-[#18324A] text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Booking History ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'invoices'
              ? 'bg-[#18324A] text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Invoices & Receipts ({invoices.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Active Repair Highlights */}
          {repairJobs.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#18324A] flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#168C91]" />
                  Active Workshop Jobs
                </h3>
                <span className="text-xs text-[#168C91] font-bold">
                  {repairJobs.length} Active in Bay
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {repairJobs.map(job => (
                  <div key={job.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-[#18324A]">
                          {job.vehicleInfo.make} {job.vehicleInfo.model}
                        </strong>
                        <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {job.vehicleInfo.regNumber}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-1">
                        Ref: <strong className="text-[#168C91] font-mono">{job.bookingRef}</strong> · Lead Tech: {job.assignedTechnician}
                      </span>
                      <span className="text-[11px] text-[#F07838] font-semibold mt-1 block">
                        Status: {job.currentStage.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedJobRef(job.bookingRef);
                          navigateTo('track-repair');
                        }}
                        className="bg-[#18324A] hover:bg-[#27323A] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Track Live
                      </button>
                      <button
                        onClick={() => {
                          setSelectedJobRef(job.bookingRef);
                          navigateTo('inspection-reports');
                        }}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200"
                      >
                        DVI Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs uppercase text-slate-400 font-bold block mb-1">Saved Vehicles</span>
              <span className="text-3xl font-extrabold text-[#18324A]">{userVehicles.length}</span>
              <button
                onClick={() => setActiveTab('vehicles')}
                className="text-xs font-semibold text-[#168C91] mt-3 block hover:underline"
              >
                Manage Vehicles →
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs uppercase text-slate-400 font-bold block mb-1">Total Bookings</span>
              <span className="text-3xl font-extrabold text-[#18324A]">{bookings.length}</span>
              <button
                onClick={() => setActiveTab('bookings')}
                className="text-xs font-semibold text-[#168C91] mt-3 block hover:underline"
              >
                View History →
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs uppercase text-slate-400 font-bold block mb-1">Outstanding Invoices</span>
              <span className="text-3xl font-extrabold text-amber-600">
                {invoices.filter(i => i.status === 'unpaid').length}
              </span>
              <button
                onClick={() => setActiveTab('invoices')}
                className="text-xs font-semibold text-[#168C91] mt-3 block hover:underline"
              >
                Review Invoices →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY VEHICLES (GARAGE) */}
      {activeTab === 'vehicles' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#18324A]">Registered Garage Vehicles</h3>
            <button
              onClick={() => setShowAddVehicleModal(true)}
              className="inline-flex items-center gap-1.5 bg-[#18324A] hover:bg-[#27323A] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Vehicle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userVehicles.map(veh => (
              <div
                key={veh.id}
                className="bg-white rounded-2xl border border-[#DCE3E8] p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#168C91] bg-teal-50 px-2 py-0.5 rounded">
                      {veh.regNumber}
                    </span>
                    <button
                      onClick={() => deleteVehicle(veh.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Remove vehicle"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-lg font-bold text-[#18324A]">
                    {veh.make} {veh.model}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Model Year: {veh.year} · {veh.fuelType} · {veh.transmission}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Recorded Odometer:</span>
                      <strong className="font-mono">{veh.odometer.toLocaleString('en-IN')} km</strong>
                    </div>
                    {veh.vin && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">VIN:</span>
                        <span className="font-mono text-[11px] text-slate-500">{veh.vin}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Maintenance Protected
                  </span>
                  <button
                    onClick={() => navigateTo('book-service')}
                    className="text-xs font-bold text-white bg-[#F07838] hover:bg-[#d86629] px-4 py-2 rounded-xl transition-colors"
                  >
                    Book Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 shadow-xs">
          <h3 className="text-base font-bold text-[#18324A] mb-4">Service Appointments History</h3>

          <div className="divide-y divide-slate-100">
            {bookings.map(b => (
              <div key={b.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-[#18324A]">{b.serviceName}</strong>
                    <span className="font-mono font-bold text-[#168C91] bg-teal-50 px-2 py-0.5 rounded">
                      {b.referenceNumber}
                    </span>
                  </div>
                  <span className="text-slate-500 block mt-1">
                    Vehicle: {b.vehicleMake} {b.vehicleModel} ({b.vehicleReg}) · Scheduled: <strong className="text-slate-700">{b.bookingDate} at {b.timeSlot}</strong>
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Facility: {b.branch}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[10px] ${
                    b.status === 'confirmed' || b.status === 'in_progress'
                      ? 'bg-teal-100 text-[#168C91]'
                      : b.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {b.status.replace(/_/g, ' ')}
                  </span>

                  {b.status !== 'cancelled' && b.status !== 'completed' && (
                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="text-slate-400 hover:text-red-600 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INVOICES & PAYMENTS */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 shadow-xs">
          <h3 className="text-base font-bold text-[#18324A] mb-4">Tax Invoices & Payment Receipts</h3>

          <div className="divide-y divide-slate-100">
            {invoices.map(inv => (
              <div key={inv.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-[#18324A] font-mono">{inv.invoiceNumber}</strong>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inv.status.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-slate-500 block mt-1">
                    Job: {inv.bookingRef} · Vehicle: {inv.vehicle} · Issued: {inv.issueDate}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-slate-400 block font-semibold">Total Amount</span>
                    <strong className="text-base text-[#18324A] font-mono">
                      ₹{inv.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </strong>
                  </div>

                  {inv.status === 'unpaid' ? (
                    <button
                      onClick={() => navigateTo('checkout')}
                      className="bg-[#18324A] hover:bg-[#27323A] text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Pay Online
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-600 font-mono">
                      Paid via {inv.paymentMethod}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD VEHICLE MODAL */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#18324A] flex items-center gap-2">
              <Car className="w-5 h-5 text-[#168C91]" />
              Add Vehicle to Garage
            </h3>

            <form onSubmit={handleAddVehicleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Make *</label>
                  <input
                    type="text"
                    value={newMake}
                    onChange={(e) => setNewMake(e.target.value)}
                    placeholder="e.g. Volkswagen"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Model *</label>
                  <input
                    type="text"
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    placeholder="e.g. Polo GT"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fuel Type</label>
                  <select
                    value={newFuel}
                    onChange={(e) => setNewFuel(e.target.value as FuelType)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#168C91] focus:outline-none"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG / Hybrid">CNG / Hybrid</option>
                    <option value="Electric (EV)">Electric (EV)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Registration # *</label>
                  <input
                    type="text"
                    value={newReg}
                    onChange={(e) => setNewReg(e.target.value.toUpperCase())}
                    placeholder="e.g. KA 01 AB 1234"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:border-[#168C91] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Odometer (km)</label>
                  <input
                    type="number"
                    value={newOdo}
                    onChange={(e) => setNewOdo(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#18324A] hover:bg-[#27323A] text-white font-bold px-5 py-2 rounded-xl transition-colors"
                >
                  Save to Garage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
