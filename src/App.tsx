import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './components/home/HomePage';
import { AboutPage } from './components/about/AboutPage';
import { ServiceCatalog } from './components/services/ServiceCatalog';
import { PricingPackages } from './components/pricing/PricingPackages';
import { BookingWizard } from './components/booking/BookingWizard';
import { EstimateViewer } from './components/estimate/EstimateViewer';
import { RepairTracker } from './components/tracking/RepairTracker';
import { InspectionReportViewer } from './components/inspection/InspectionReportViewer';
import { TeamPage } from './components/team/TeamPage';
import { WorkshopPage } from './components/workshop/WorkshopPage';
import { ReviewsPage } from './components/reviews/ReviewsPage';
import { ContactPage } from './components/contact/ContactPage';
import { CustomerPortal } from './components/customer/CustomerPortal';
import { StaffDashboard } from './components/staff/StaffDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckoutModal } from './components/payment/CheckoutModal';
import { BlogPage } from './components/blog/BlogPage';
import { FaqPage } from './components/faq/FaqPage';
import { LegalPage } from './components/legal/LegalPage';
import { AuthPage } from './components/auth/AuthPage';

// Lucide Toast Icons
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export function AppContent() {
  const { currentPage, toasts, removeToast } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
      case 'service-detail':
        return <ServiceCatalog />;
      case 'pricing':
        return <PricingPackages />;
      case 'book-service':
        return <BookingWizard />;
      case 'estimate':
        return <EstimateViewer />;
      case 'track-repair':
        return <RepairTracker />;
      case 'inspection-reports':
        return <InspectionReportViewer />;
      case 'team':
        return <TeamPage />;
      case 'workshop':
        return <WorkshopPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'contact':
        return <ContactPage />;
      case 'account':
        return <CustomerPortal />;
      case 'staff':
        return <StaffDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'checkout':
      case 'payment/success':
      case 'payment/failed':
      case 'payment/cancelled':
        return <CheckoutModal />;
      case 'blog':
      case 'blog-detail':
        return <BlogPage />;
      case 'faq':
        return <FaqPage />;
      case 'privacy-policy':
      case 'terms-and-conditions':
      case 'cancellation-policy':
      case 'refund-policy':
      case 'warranty-policy':
      case 'cookie-policy':
        return <LegalPage />;
      case 'login':
      case 'register':
      case 'forgot-password':
      case 'reset-password':
        return <AuthPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#27323A]">
      {/* Toast Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl text-xs font-semibold shadow-xl border backdrop-blur-md transition-all animate-in fade-in slide-in-from-right-4 duration-200 max-w-sm ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 text-white border-emerald-500/50'
                : toast.type === 'error'
                ? 'bg-rose-950/90 text-white border-rose-500/50'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 text-white border-amber-500/50'
                : 'bg-[#18324A]/95 text-white border-[#168C91]/50'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {toast.type === 'error' && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-[#168C91] shrink-0" />}
              <span className="leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Shared Horizontal Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
