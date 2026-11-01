import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, CheckCircle2, MessageSquare, Plus, Filter, ThumbsUp } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { reviews, submitReview } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // New review form state
  const [authorName, setAuthorName] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [serviceCat, setServiceCat] = useState('Periodic Scheduled Maintenance');
  const [rating, setRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState('');

  const filteredReviews = reviews.filter(r => {
    if (filterCategory === 'all') return true;
    return r.serviceCategory.toLowerCase().includes(filterCategory.toLowerCase());
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authorName.trim() && reviewComment.trim()) {
      submitReview({
        customerName: authorName.trim(),
        vehicle: vehicleName.trim() || 'Verified Vehicle',
        serviceCategory: serviceCat,
        rating: Number(rating),
        comment: reviewComment.trim(),
        branch: 'Bengaluru Central Flagship'
      });
      setShowSubmitModal(false);
      setAuthorName('');
      setVehicleName('');
      setReviewComment('');
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
            Verified Customer Stories
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
            Customer Feedback & Reviews
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Real feedback from verified car owners following completed maintenance and repair jobs.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="inline-flex items-center gap-2 bg-[#F07838] hover:bg-[#d86629] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Your Review</span>
        </button>
      </div>

      {/* Aggregate Rating Banner */}
      <div className="bg-white rounded-3xl border border-[#DCE3E8] p-6 sm:p-8 mb-10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="text-center sm:text-left">
            <span className="text-4xl sm:text-5xl font-extrabold text-[#18324A] block">4.9</span>
            <div className="flex items-center gap-1 text-amber-400 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">Based on 184 verified service jobs</span>
          </div>

          <div className="h-12 w-px bg-slate-200 hidden sm:block" />

          <div className="text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-20 text-slate-400">Estimate Accuracy:</span>
              <strong className="text-emerald-700">99.4% Exact Match</strong>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 text-slate-400">On-Time Handover:</span>
              <strong className="text-emerald-700">98.2% Completed on Schedule</strong>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 text-slate-400">Warranty Claims:</span>
              <strong className="text-emerald-700">Zero-Friction Free Rectification</strong>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 text-xs">
          {['all', 'Diagnostics', 'Brake', 'Suspension', 'EV'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#18324A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Reviews' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE3E8] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {new Date(rev.date).toLocaleDateString()}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <strong className="text-[#18324A] block">{rev.customerName}</strong>
                <span className="text-slate-500 text-[11px] block">{rev.vehicle}</span>
              </div>
              <span className="text-[10px] font-bold uppercase text-[#168C91] bg-teal-50 px-2 py-0.5 rounded">
                ✓ Verified {rev.serviceCategory.split(' ')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#18324A] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#168C91]" />
              Submit Service Feedback
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Ramesh Kulkarni"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Vehicle Make & Model</label>
                <input
                  type="text"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  placeholder="e.g. Honda City i-VTEC"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Service Category</label>
                <select
                  value={serviceCat}
                  onChange={(e) => setServiceCat(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  <option value="Periodic Scheduled Maintenance">Periodic Scheduled Maintenance</option>
                  <option value="Computerized Engine Diagnostics">Computerized Engine Diagnostics</option>
                  <option value="Brake Service & Skimming">Brake Service & Skimming</option>
                  <option value="Suspension & Steering Overhaul">Suspension & Steering Overhaul</option>
                  <option value="Hybrid & EV Systems Check">Hybrid & EV Systems Check</option>
                  <option value="AC Gas Recovery & Cooling">AC Gas Recovery & Cooling</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-colors ${
                        rating >= num ? 'bg-amber-100 text-amber-700 border border-amber-300' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      ★ {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Review & Comments *</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell us about technician communication, estimate accuracy, and how your car drives now..."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-[#168C91] focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#18324A] hover:bg-[#27323A] text-white font-bold px-5 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
