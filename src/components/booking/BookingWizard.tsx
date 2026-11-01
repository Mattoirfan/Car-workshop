import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  Car,
  User,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  MapPin,
  ChevronLeft
} from 'lucide-react';
import { FuelType, TransmissionType, VehicleType } from '../../types';

export const BookingWizard: React.FC = () => {
  const { services, createBooking, navigateTo, setSelectedJobRef, userVehicles, currentUser } = useApp();

  // Wizard Steps: 1: Service & Vehicle, 2: Date & Slot, 3: Customer & Review, 4: Confirmation
  const [step, setStep] = useState<number>(1);

  // Form State
  const [customerName, setCustomerName] = useState(currentUser.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser.email || '');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+91');
  const [customerPhone, setCustomerPhone] = useState('9845011223');

  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [branch, setBranch] = useState('Central Flagship Workshop (Bengaluru)');

  const [vehicleMake, setVehicleMake] = useState('Honda');
  const [vehicleModel, setVehicleModel] = useState('City');
  const [vehicleYear, setVehicleYear] = useState<number>(2021);
  const [fuelType, setFuelType] = useState<FuelType>('Petrol');
  const [transmission, setTransmission] = useState<TransmissionType>('Automatic');
  const [vehicleType, setVehicleType] = useState<VehicleType>('Sedan');
  const [vehicleReg, setVehicleReg] = useState('KA 03 MN 4821');

  // Tomorrow's date as default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [bookingDate, setBookingDate] = useState(tomorrowStr);
  const [selectedSlot, setSelectedSlot] = useState('09:30 AM');
  const [symptoms, setSymptoms] = useState('');
  const [pickupDrop, setPickupDrop] = useState(true);
  const [privacyConsent, setPrivacyConsent] = useState(true);

  // Confirmed booking state
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string | null>(null);

  // Time Slots
  const availableSlots = [
    { time: '08:30 AM', open: true },
    { time: '09:30 AM', open: true },
    { time: '11:00 AM', open: true },
    { time: '01:30 PM', open: true },
    { time: '03:30 PM', open: true },
    { time: '05:00 PM', open: true },
  ];

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  // Quick fill from user saved vehicles if available
  const handleSelectSavedVehicle = (vehId: string) => {
    const v = userVehicles.find(veh => veh.id === vehId);
    if (v) {
      setVehicleMake(v.make);
      setVehicleModel(v.model);
      setVehicleYear(v.year);
      setFuelType(v.fuelType);
      setTransmission(v.transmission);
      setVehicleReg(v.regNumber);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyConsent) {
      alert('Please accept the Privacy Policy to proceed with your booking.');
      return;
    }

    const fullPhone = `${phoneCountryCode}-${customerPhone.trim()}`;

    const newBooking = createBooking({
      customerId: currentUser.id,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: fullPhone,
      vehicleMake: vehicleMake.trim(),
      vehicleModel: vehicleModel.trim(),
      vehicleYear: Number(vehicleYear),
      vehicleReg: vehicleReg.trim() || 'Unregistered / Pre-check',
      vehicleType,
      fuelType,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      branch,
      bookingDate,
      timeSlot: selectedSlot,
      symptoms: symptoms.trim() || 'Standard periodic service requested.',
      pickupDropRequested: pickupDrop,
      estimatedCost: selectedService.startingPrice
    });

    setConfirmedBookingRef(newBooking.referenceNumber);
    setSelectedJobRef(newBooking.referenceNumber);
    setStep(4);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
          Hassle-Free Scheduling
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
          Book Your Service Appointment
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Reserve your certified bay in 3 simple steps. No prepayment required for scheduling.
        </p>

        {/* Wizard Progress Indicator */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8">
            <div className={`flex items-center gap-2 text-xs font-semibold ${step >= 1 ? 'text-[#168C91]' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#168C91] text-white' : 'bg-slate-200'}`}>1</span>
              <span>Vehicle & Service</span>
            </div>
            <div className={`w-8 sm:w-12 h-0.5 ${step >= 2 ? 'bg-[#168C91]' : 'bg-slate-200'}`} />
            <div className={`flex items-center gap-2 text-xs font-semibold ${step >= 2 ? 'text-[#168C91]' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#168C91] text-white' : 'bg-slate-200'}`}>2</span>
              <span>Date & Slot</span>
            </div>
            <div className={`w-8 sm:w-12 h-0.5 ${step >= 3 ? 'bg-[#168C91]' : 'bg-slate-200'}`} />
            <div className={`flex items-center gap-2 text-xs font-semibold ${step >= 3 ? 'text-[#168C91]' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-[#168C91] text-white' : 'bg-slate-200'}`}>3</span>
              <span>Confirm</span>
            </div>
          </div>
        )}
      </div>

      {/* STEP 1: SERVICE & VEHICLE */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-[#18324A] flex items-center gap-2 pb-3 border-b border-slate-100">
            <Car className="w-5 h-5 text-[#168C91]" />
            1. Select Your Service & Vehicle Details
          </h2>

          {/* Saved Vehicle Quick Select */}
          {userVehicles.length > 0 && (
            <div className="bg-[#E4F3F1]/40 border border-[#168C91]/30 rounded-xl p-3.5">
              <span className="text-xs font-bold text-[#18324A] block mb-2">
                Select from Your Saved Garage:
              </span>
              <div className="flex flex-wrap gap-2">
                {userVehicles.map(v => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleSelectSavedVehicle(v.id)}
                    className="text-xs font-semibold bg-white border border-teal-200 hover:border-[#168C91] text-[#18324A] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {v.make} {v.model} ({v.regNumber})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Service Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Primary Automotive Service Required *
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-[#18324A] focus:border-[#168C91] focus:outline-none"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Starting ₹{s.startingPrice.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1.5">
              {selectedService.shortDescription}
            </p>
          </div>

          {/* Workshop Branch Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Preferred Workshop Facility *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  branch === 'Central Flagship Workshop (Bengaluru)'
                    ? 'border-[#168C91] bg-teal-50/50 text-[#18324A]'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="branch"
                  value="Central Flagship Workshop (Bengaluru)"
                  checked={branch === 'Central Flagship Workshop (Bengaluru)'}
                  onChange={(e) => setBranch(e.target.value)}
                  className="sr-only"
                />
                <span className="font-bold text-xs block">Central Flagship Workshop</span>
                <span className="text-[11px] text-slate-500">Sector 18, Electronic City · 8 Bays + 3D Alignment</span>
              </label>

              <label
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  branch === 'Whitefield Tech Bay Facility'
                    ? 'border-[#168C91] bg-teal-50/50 text-[#18324A]'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="branch"
                  value="Whitefield Tech Bay Facility"
                  checked={branch === 'Whitefield Tech Bay Facility'}
                  onChange={(e) => setBranch(e.target.value)}
                  className="sr-only"
                />
                <span className="font-bold text-xs block">Whitefield Tech Bay</span>
                <span className="text-[11px] text-slate-500">ITPB Road, Whitefield · Specialized Diagnostic Bay</span>
              </label>
            </div>
          </div>

          {/* Vehicle Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Make *</label>
              <input
                type="text"
                value={vehicleMake}
                onChange={(e) => setVehicleMake(e.target.value)}
                placeholder="e.g. Honda, Hyundai, BMW"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#168C91] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Model *</label>
              <input
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                placeholder="e.g. City, Creta, 320d"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#168C91] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Year</label>
              <input
                type="number"
                value={vehicleYear}
                onChange={(e) => setVehicleYear(Number(e.target.value))}
                min={2000}
                max={2026}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#168C91] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Fuel Type</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as FuelType)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:border-[#168C91] focus:outline-none"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG / Hybrid">CNG / Hybrid</option>
                <option value="Electric (EV)">Electric (EV)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Transmission</label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value as TransmissionType)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:border-[#168C91] focus:outline-none"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic (AT / DCT / CVT)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Registration #</label>
              <input
                type="text"
                value={vehicleReg}
                onChange={(e) => setVehicleReg(e.target.value.toUpperCase())}
                placeholder="KA 03 MN 4821"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono font-medium focus:border-[#168C91] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 bg-[#18324A] hover:bg-[#27323A] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <span>Continue to Date & Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DATE & TIME SLOT */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-[#DCE3E8] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-[#18324A] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#168C91]" />
              2. Select Appointment Date & Real Available Bay Slot
            </h2>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-slate-500 hover:text-[#18324A] flex items-center gap-1 font-semibold"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                value={bookingDate}
                min={tomorrowStr}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-[#18324A] focus:border-[#168C91] focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                Workshop operates Mon–Sat (08:30 AM – 07:30 PM).
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Available Bay Check-in Slots *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map(slot => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                      selectedSlot === slot.time
                        ? 'bg-[#168C91] text-white border-[#168C91] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Symptoms & Customer Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Describe Any Symptoms, Sounds or Specific Concerns
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. Squeaking brake noise when stopping, AC cooling is low in bumper-to-bumper traffic, check engine light illuminated on dash..."
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#168C91] focus:outline-none"
            />
          </div>

          {/* Valet Pick-up Checkbox */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <input
              type="checkbox"
              id="valet-pickup"
              checked={pickupDrop}
              onChange={(e) => setPickupDrop(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#168C91] rounded border-slate-300 focus:ring-0"
            />
            <label htmlFor="valet-pickup" className="text-xs cursor-pointer">
              <strong className="text-[#18324A] block">Request Complimentary Doorstep Valet Pickup</strong>
              <span className="text-slate-500">
                A verified workshop valet will pick up your car from your home or office address within a 15 km radius.
              </span>
            </label>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-bold text-slate-600 hover:text-slate-800 px-4 py-2"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 bg-[#18324A] hover:bg-[#27323A] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <span>Continue to Contact & Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CONTACT & FINAL REVIEW */}
      {step === 3 && (
        <form onSubmit={handleSubmitBooking} className="bg-white rounded-2xl border border-[#DCE3E8] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-[#18324A] flex items-center gap-2">
              <User className="w-5 h-5 text-[#168C91]" />
              3. Contact Information & Booking Summary
            </h2>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs text-slate-500 hover:text-[#18324A] flex items-center gap-1 font-semibold"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#168C91] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#168C91] focus:outline-none"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (for WhatsApp DVI Report) *</label>
              <div className="flex gap-2">
                <select
                  value={phoneCountryCode}
                  onChange={(e) => setPhoneCountryCode(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
                >
                  <option value="+91">+91 (India)</option>
                  <option value="+1">+1 (USA/Can)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+971">+971 (UAE)</option>
                </select>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="9845011223"
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#168C91] focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
            <span className="font-bold text-[#18324A] uppercase tracking-wider block text-[10px]">
              Summary of Selected Service:
            </span>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-600">Service:</span>
              <strong className="text-[#18324A]">{selectedService.name}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-600">Vehicle:</span>
              <strong className="text-[#18324A]">{vehicleMake} {vehicleModel} ({vehicleYear}) · {vehicleReg}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-600">Appointment Slot:</span>
              <strong className="text-[#18324A]">{bookingDate} at {selectedSlot}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-600">Workshop Bay:</span>
              <span className="text-slate-800">{branch}</span>
            </div>
            <div className="flex justify-between py-1 pt-2 font-bold text-sm text-[#18324A]">
              <span>Base Estimated Service Total:</span>
              <span className="text-[#168C91]">₹{selectedService.startingPrice.toLocaleString('en-IN')}*</span>
            </div>
            <span className="text-[10px] text-slate-400 block italic">
              *Payment is due only upon vehicle handover after you inspect completed work.
            </span>
          </div>

          {/* Privacy Consent */}
          <div className="flex items-start gap-2.5 text-xs text-slate-600">
            <input
              type="checkbox"
              id="privacy"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#168C91] rounded border-slate-300"
              required
            />
            <label htmlFor="privacy">
              I agree to DriveCraft Autocare’s Terms of Service and Privacy Notice. I authorize digital inspection reports and job updates to be shared via WhatsApp and email.
            </label>
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-bold text-slate-600 hover:text-slate-800 px-4 py-2"
            >
              Back
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#F07838] hover:bg-[#d86629] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirm & Book Appointment</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: INSTANT CONFIRMATION SCREEN */}
      {step === 4 && confirmedBookingRef && (
        <div className="bg-white rounded-3xl border border-[#DCE3E8] p-8 sm:p-12 text-center shadow-lg space-y-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#168C91]">
              Appointment Successfully Scheduled
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18324A]">
              We Look Forward to Servicing Your {vehicleMake} {vehicleModel}
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Your workshop bay is reserved for <strong className="text-slate-800">{bookingDate}</strong> at <strong className="text-slate-800">{selectedSlot}</strong>.
            </p>
          </div>

          {/* Booking Reference Box */}
          <div className="inline-block bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center max-w-md w-full">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
              Your Booking & Tracking Reference
            </span>
            <span className="text-3xl font-extrabold text-[#18324A] font-mono tracking-wider block text-[#168C91]">
              {confirmedBookingRef}
            </span>
            <span className="text-[11px] text-slate-500 block mt-2">
              A confirmation email & SMS with your digital gate pass has been sent to {customerEmail}.
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setSelectedJobRef(confirmedBookingRef);
                navigateTo('track-repair');
              }}
              className="inline-flex items-center gap-2 bg-[#18324A] hover:bg-[#27323A] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <span>Track Active Repair Job Live</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setStep(1);
                setConfirmedBookingRef(null);
              }}
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#18324A] px-4 py-3 border border-slate-200 rounded-xl"
            >
              Book Another Vehicle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
