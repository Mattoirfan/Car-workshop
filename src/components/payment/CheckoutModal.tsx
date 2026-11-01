import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Lock,
  ArrowRight,
  Download,
  Building2,
  Smartphone
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { invoices, selectedJobRef, processPayment, navigateTo } = useApp();

  // Find unpaid invoice
  const currentInvoice = invoices.find(
    i => i.bookingRef === (selectedJobRef || 'DC-84920')
  ) || invoices[0];

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit / Debit Card' | 'Net Banking' | 'Cash at Workshop'>('UPI');
  const [upiId, setUpiId] = useState('aarav.mehta@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('482');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{ success: boolean; transactionId: string } | null>(null);

  const handlePaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInvoice) return;

    setIsProcessing(true);
    const result = await processPayment(currentInvoice.id, paymentMethod);
    setIsProcessing(false);
    setPaymentResult(result);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto min-h-screen">
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
          Secure Payment Gateway
        </span>
        <h1 className="text-3xl font-extrabold text-[#18324A] tracking-tight">
          DriveCraft Autocare Checkout
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          256-Bit SSL Encrypted. Supports Indian UPI, Cards & Net Banking.
        </p>
      </div>

      {/* Test Mode Banner */}
      <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3.5 mb-6 text-xs flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Sandbox Payment Simulation:</strong> Test-mode environment active. Payments verify server-side transactions without charging real accounts.
        </span>
      </div>

      {!paymentResult ? (
        currentInvoice ? (
          <form onSubmit={handlePaySubmit} className="bg-white rounded-3xl border border-[#DCE3E8] p-6 sm:p-8 shadow-sm space-y-6">
            {/* Invoice Summary Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase text-slate-400">Invoice Number</span>
                <h2 className="text-xl font-mono font-extrabold text-[#18324A] mt-0.5">
                  {currentInvoice.invoiceNumber}
                </h2>
                <span className="text-xs text-slate-500 mt-0.5 block">
                  Vehicle: {currentInvoice.vehicle} · Ref: {currentInvoice.bookingRef}
                </span>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-slate-400 block font-medium">Total Payable</span>
                <span className="text-2xl font-extrabold text-[#168C91] font-mono">
                  ₹{currentInvoice.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Line Items Preview */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
                Authorized Services & Parts:
              </span>
              {currentInvoice.items.map((item, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                  <span>{item.quantity}x {item.description}</span>
                  <span className="font-mono font-semibold">₹{item.total.toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 font-bold text-slate-800">
                <span>Inclusive of 18% GST</span>
                <span className="font-mono">₹{currentInvoice.tax.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Select Payment Method
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'UPI'
                      ? 'border-[#168C91] bg-teal-50/50 text-[#168C91] shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Credit / Debit Card')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'Credit / Debit Card'
                      ? 'border-[#168C91] bg-teal-50/50 text-[#168C91] shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Net Banking')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'Net Banking'
                      ? 'border-[#168C91] bg-teal-50/50 text-[#168C91] shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash at Workshop')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'Cash at Workshop'
                      ? 'border-[#168C91] bg-teal-50/50 text-[#168C91] shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay at Bay</span>
                </button>
              </div>

              {/* Conditional Inputs based on Method */}
              {paymentMethod === 'UPI' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                  <label className="block font-bold text-slate-700">Enter UPI VPA ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@okhdfcbank"
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-mono text-xs focus:outline-none focus:border-[#168C91]"
                    required
                  />
                  <span className="text-[11px] text-slate-400 block">
                    Supported: Google Pay, PhonePe, Paytm, BHIM, Amazon Pay.
                  </span>
                </div>
              )}

              {paymentMethod === 'Credit / Debit Card' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-mono text-xs focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-mono text-xs text-center"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-mono text-xs text-center"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'Net Banking' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
                  <label className="block font-bold text-slate-700 mb-1">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold focus:outline-none"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="State Bank of India">State Bank of India</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === 'Cash at Workshop' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600">
                  You can pay with Cash, Card swipe or workshop UPI QR at the billing counter during vehicle handover.
                </div>
              )}
            </div>

            {/* Pay Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#168C91]" /> 256-Bit TLS Secured
              </span>

              <button
                type="submit"
                disabled={isProcessing}
                className="inline-flex items-center gap-2 bg-[#F07838] hover:bg-[#d86629] text-white font-bold text-sm px-8 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Verifying with Bank...' : `Pay ₹${currentInvoice.total.toFixed(0)} Now`}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-sm text-slate-500">No pending invoices found.</p>
          </div>
        )
      ) : (
        /* Payment Success Confirmation */
        <div className="bg-white rounded-3xl border border-[#DCE3E8] p-8 sm:p-12 text-center shadow-lg space-y-6 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#168C91]">
              Payment Verified Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18324A]">
              Thank You! Your Invoice is Settled
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your payment has been reconciled. Your vehicle is ready in the customer handover bay.
            </p>
          </div>

          <div className="inline-block bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center max-w-sm w-full text-xs">
            <span className="text-slate-400 font-medium block">Bank Transaction ID</span>
            <strong className="text-sm font-mono text-[#18324A] block mt-0.5">{paymentResult.transactionId}</strong>
            <span className="text-[11px] text-slate-500 block mt-2">
              Paid via {paymentMethod} · Invoice #{currentInvoice?.invoiceNumber}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('account')}
              className="bg-[#18324A] hover:bg-[#27323A] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              View in My Invoices
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#18324A] px-4 py-3"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
