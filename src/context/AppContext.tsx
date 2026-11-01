import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ServiceItem,
  Booking,
  RepairJob,
  RepairStage,
  InspectionReport,
  ServiceEstimate,
  Invoice,
  InventoryPart,
  Vehicle,
  StaffMember,
  CustomerReview,
  BlogPost,
  UserProfile,
  UserRole
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_PACKAGES,
  INITIAL_STAFF,
  INITIAL_INVENTORY,
  INITIAL_BOOKINGS,
  INITIAL_REPAIR_JOBS,
  INITIAL_INSPECTION_REPORTS,
  INITIAL_ESTIMATES,
  INITIAL_INVOICES,
  INITIAL_REVIEWS,
  INITIAL_BLOG_POSTS,
  INITIAL_VEHICLES,
  ServicePackage
} from '../data/initialData';

interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  // Navigation
  currentPage: string;
  navigateTo: (page: string, param?: string) => void;
  pageParam: string | null;

  // Auth & Roles
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  loginUser: (email: string, role?: UserRole) => void;
  logoutUser: () => void;

  // Data Collections
  services: ServiceItem[];
  packages: ServicePackage[];
  staff: StaffMember[];
  inventory: InventoryPart[];
  bookings: Booking[];
  repairJobs: RepairJob[];
  inspectionReports: InspectionReport[];
  estimates: ServiceEstimate[];
  invoices: Invoice[];
  reviews: CustomerReview[];
  blogPosts: BlogPost[];
  userVehicles: Vehicle[];

  // Actions
  createBooking: (bookingData: Omit<Booking, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  updateRepairStage: (jobId: string, newStage: RepairStage, note: string, actor: string) => void;
  approveInspectionItem: (reportId: string, itemId: string, decision: 'approved' | 'declined') => void;
  approveEstimateLine: (estimateId: string, lineId: string, approved: boolean) => void;
  approveFullEstimate: (estimateId: string) => void;
  processPayment: (invoiceId: string, method: 'UPI' | 'Credit / Debit Card' | 'Net Banking' | 'Cash at Workshop') => Promise<{ success: boolean; transactionId: string }>;
  usePartOnJob: (jobId: string, partId: string, quantity: number) => boolean;
  restockPart: (partId: string, additionalQty: number) => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'userId'>) => void;
  deleteVehicle: (vehicleId: string) => void;
  submitReview: (review: Omit<CustomerReview, 'id' | 'date' | 'verified'>) => void;

  // Notifications
  toasts: NotificationToast[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Active lookup helper
  selectedJobRef: string | null;
  setSelectedJobRef: (ref: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state (supports hash or clean state)
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string | null>(null);

  // Parse path on initial load
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.replace(/^\//, '');
      if (!path || path === '') {
        setCurrentPage('home');
        setPageParam(null);
      } else if (path.startsWith('services/')) {
        setCurrentPage('service-detail');
        setPageParam(path.replace('services/', ''));
      } else if (path.startsWith('blog/')) {
        setCurrentPage('blog-detail');
        setPageParam(path.replace('blog/', ''));
      } else {
        setCurrentPage(path);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const navigateTo = (page: string, param?: string) => {
    setCurrentPage(page);
    setPageParam(param || null);
    
    // Update window history without full page reload
    let targetUrl = '/';
    if (page === 'home') targetUrl = '/';
    else if (page === 'service-detail' && param) targetUrl = `/services/${param}`;
    else if (page === 'blog-detail' && param) targetUrl = `/blog/${param}`;
    else targetUrl = `/${page}`;

    window.history.pushState({}, '', targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('dc_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      id: 'usr-customer-1',
      name: 'Aarav Mehta',
      email: 'aarav.mehta@gmail.com',
      phone: '+91-98450-11223',
      role: 'customer',
      registeredDate: '2025-08-14'
    };
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const switchRole = (role: UserRole) => {
    let newUser: UserProfile;
    if (role === 'admin') {
      newUser = {
        id: 'usr-admin-1',
        name: 'Suresh Kumar',
        email: 'admin@drivecraftautocare.com',
        phone: '+91-98888-00001',
        role: 'admin',
        registeredDate: '2024-01-10'
      };
      navigateTo('admin');
    } else if (role === 'technician') {
      newUser = {
        id: 'stf-1',
        name: 'Rajesh Nair',
        email: 'rajesh.nair@drivecraftautocare.com',
        phone: '+91-98111-22334',
        role: 'technician',
        registeredDate: '2024-03-15'
      };
      navigateTo('staff');
    } else {
      newUser = {
        id: 'usr-customer-1',
        name: 'Aarav Mehta',
        email: 'aarav.mehta@gmail.com',
        phone: '+91-98450-11223',
        role: 'customer',
        registeredDate: '2025-08-14'
      };
      navigateTo('account');
    }
    setCurrentUser(newUser);
    localStorage.setItem('dc_current_user', JSON.stringify(newUser));
    addToast(`Switched active view to ${role.toUpperCase()} mode`, 'info');
  };

  const loginUser = (email: string, role: UserRole = 'customer') => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      phone: '+91-98765-00000',
      role,
      registeredDate: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('dc_current_user', JSON.stringify(newUser));
    addToast(`Signed in successfully as ${newUser.name}`, 'success');
    if (role === 'admin') navigateTo('admin');
    else if (role === 'technician') navigateTo('staff');
    else navigateTo('account');
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    addToast('Signed out of account', 'info');
    navigateTo('home');
  };

  // Persistent Collections with localStorage backup
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [packages] = useState<ServicePackage[]>(INITIAL_PACKAGES);
  const [staff] = useState<StaffMember[]>(INITIAL_STAFF);

  const [inventory, setInventory] = useState<InventoryPart[]>(() => {
    const saved = localStorage.getItem('dc_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('dc_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [repairJobs, setRepairJobs] = useState<RepairJob[]>(() => {
    const saved = localStorage.getItem('dc_repair_jobs');
    return saved ? JSON.parse(saved) : INITIAL_REPAIR_JOBS;
  });

  const [inspectionReports, setInspectionReports] = useState<InspectionReport[]>(() => {
    const saved = localStorage.getItem('dc_inspections');
    return saved ? JSON.parse(saved) : INITIAL_INSPECTION_REPORTS;
  });

  const [estimates, setEstimates] = useState<ServiceEstimate[]>(() => {
    const saved = localStorage.getItem('dc_estimates');
    return saved ? JSON.parse(saved) : INITIAL_ESTIMATES;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('dc_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('dc_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [blogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);

  const [userVehicles, setUserVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('dc_user_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [selectedJobRef, setSelectedJobRef] = useState<string | null>('DC-84920');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('dc_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('dc_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('dc_repair_jobs', JSON.stringify(repairJobs));
  }, [repairJobs]);

  useEffect(() => {
    localStorage.setItem('dc_inspections', JSON.stringify(inspectionReports));
  }, [inspectionReports]);

  useEffect(() => {
    localStorage.setItem('dc_estimates', JSON.stringify(estimates));
  }, [estimates]);

  useEffect(() => {
    localStorage.setItem('dc_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('dc_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('dc_user_vehicles', JSON.stringify(userVehicles));
  }, [userVehicles]);

  // Toast notifications
  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Actions
  const createBooking = (bookingData: Omit<Booking, 'id' | 'referenceNumber' | 'createdAt' | 'status'>): Booking => {
    const refNum = `DC-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBookingId = `bk-${Date.now()}`;
    const newJobId = `job-${Date.now()}`;

    const newBooking: Booking = {
      ...bookingData,
      id: newBookingId,
      referenceNumber: refNum,
      status: 'pending_confirmation',
      createdAt: new Date().toISOString(),
      jobId: newJobId,
      assignedTechnician: 'Rajesh Nair'
    };

    // Automatically create a corresponding repair job entry
    const newRepairJob: RepairJob = {
      id: newJobId,
      bookingRef: refNum,
      customerId: bookingData.customerId || currentUser.id,
      customerName: bookingData.customerName,
      customerPhone: bookingData.customerPhone,
      vehicleInfo: {
        make: bookingData.vehicleMake,
        model: bookingData.vehicleModel,
        year: bookingData.vehicleYear,
        regNumber: bookingData.vehicleReg || 'Pending Check-in',
        fuelType: bookingData.fuelType,
        odometer: 35000
      },
      currentStage: 'appointment_confirmed',
      stageHistory: [
        {
          stage: 'appointment_confirmed',
          timestamp: new Date().toISOString(),
          note: `Booking request received for ${bookingData.serviceName} on ${bookingData.bookingDate} at ${bookingData.timeSlot}.`,
          actor: 'System Automated Booking Engine'
        }
      ],
      assignedTechnician: 'Rajesh Nair',
      serviceAdvisor: 'Ananya Sharma',
      branch: bookingData.branch,
      estimatedCompletion: `${bookingData.bookingDate}, 05:00 PM`,
      internalNotes: [`Customer reported: ${bookingData.symptoms || 'None specified'}`],
      customerNotes: [`Your service appointment is confirmed. Please arrive 10 minutes prior to ${bookingData.timeSlot}.`],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    setRepairJobs(prev => [newRepairJob, ...prev]);
    setSelectedJobRef(refNum);

    addToast(`Service booking created! Reference: ${refNum}`, 'success');
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
    addToast('Booking cancelled successfully', 'info');
  };

  const updateRepairStage = (jobId: string, newStage: RepairStage, note: string, actor: string) => {
    setRepairJobs(prev =>
      prev.map(job => {
        if (job.id === jobId) {
          const updatedHistory = [
            ...job.stageHistory,
            {
              stage: newStage,
              timestamp: new Date().toISOString(),
              note,
              actor
            }
          ];
          return {
            ...job,
            currentStage: newStage,
            stageHistory: updatedHistory,
            updatedAt: new Date().toISOString()
          };
        }
        return job;
      })
    );
    addToast(`Job status updated to "${newStage.replace(/_/g, ' ')}"`, 'success');
  };

  const approveInspectionItem = (reportId: string, itemId: string, decision: 'approved' | 'declined') => {
    setInspectionReports(prev =>
      prev.map(report => {
        if (report.id === reportId) {
          return {
            ...report,
            items: report.items.map(item =>
              item.id === itemId ? { ...item, customerDecision: decision } : item
            )
          };
        }
        return report;
      })
    );

    // If approved and has cost, sync to estimate
    addToast(`Item ${decision === 'approved' ? 'authorized for repair' : 'declined'}`, 'info');
  };

  const approveEstimateLine = (estimateId: string, lineId: string, approved: boolean) => {
    setEstimates(prev =>
      prev.map(est => {
        if (est.id === estimateId) {
          const updatedItems = est.items.map(item =>
            item.id === lineId ? { ...item, approvedByCustomer: approved } : item
          );
          const approvedSubtotal = updatedItems
            .filter(i => i.approvedByCustomer)
            .reduce((sum, i) => sum + i.total, 0);
          const gst = approvedSubtotal * 0.18;
          const total = approvedSubtotal + gst - est.discountAmount;

          return {
            ...est,
            items: updatedItems,
            subtotal: approvedSubtotal,
            gstAmount: gst,
            totalAmount: Math.max(0, total)
          };
        }
        return est;
      })
    );
    addToast(approved ? 'Line item authorized' : 'Line item deselected', 'info');
  };

  const approveFullEstimate = (estimateId: string) => {
    setEstimates(prev =>
      prev.map(est => {
        if (est.id === estimateId) {
          const updatedItems = est.items.map(item => ({
            ...item,
            approvedByCustomer: true
          }));
          const approvedSubtotal = updatedItems.reduce((sum, i) => sum + i.total, 0);
          const gst = approvedSubtotal * 0.18;
          const total = approvedSubtotal + gst - est.discountAmount;

          return {
            ...est,
            status: 'approved',
            items: updatedItems,
            subtotal: approvedSubtotal,
            gstAmount: gst,
            totalAmount: total
          };
        }
        return est;
      })
    );

    // Also update associated repair job stage to 'parts_ordered' or 'repair_in_progress'
    const est = estimates.find(e => e.id === estimateId);
    if (est) {
      updateRepairStage(
        est.jobId,
        'repair_in_progress',
        'Customer authorized itemized estimate. Technician authorized to commence repairs.',
        `${currentUser.name} (Customer)`
      );
    }

    addToast('Estimate fully approved! Work is now commencing in the bay.', 'success');
  };

  const processPayment = async (
    invoiceId: string,
    method: 'UPI' | 'Credit / Debit Card' | 'Net Banking' | 'Cash at Workshop'
  ): Promise<{ success: boolean; transactionId: string }> => {
    // Simulate server verification
    return new Promise(resolve => {
      setTimeout(() => {
        const txnId = `TXN-DC-${Date.now().toString().slice(-8)}`;
        setInvoices(prev =>
          prev.map(inv =>
            inv.id === invoiceId
              ? {
                  ...inv,
                  status: 'paid',
                  paidAt: new Date().toISOString(),
                  paymentMethod: method,
                  transactionId: txnId
                }
              : inv
          )
        );

        addToast(`Payment of invoice verified successfully! Ref: ${txnId}`, 'success');
        resolve({ success: true, transactionId: txnId });
      }, 1000);
    });
  };

  const usePartOnJob = (jobId: string, partId: string, quantity: number): boolean => {
    const part = inventory.find(p => p.id === partId);
    if (!part || part.stockQty < quantity) {
      addToast(`Insufficient stock for ${part?.name || 'item'}`, 'error');
      return false;
    }

    setInventory(prev =>
      prev.map(p =>
        p.id === partId ? { ...p, stockQty: p.stockQty - quantity } : p
      )
    );

    addToast(`Allocated ${quantity}x ${part.name} to Job #${jobId}`, 'info');
    return true;
  };

  const restockPart = (partId: string, additionalQty: number) => {
    setInventory(prev =>
      prev.map(p =>
        p.id === partId ? { ...p, stockQty: p.stockQty + additionalQty } : p
      )
    );
    addToast(`Restocked ${additionalQty} units successfully`, 'success');
  };

  const addVehicle = (vehicle: Omit<Vehicle, 'id' | 'userId'>) => {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: `veh-${Date.now()}`,
      userId: currentUser.id
    };
    setUserVehicles(prev => [...prev, newVehicle]);
    addToast(`${newVehicle.make} ${newVehicle.model} added to your garage`, 'success');
  };

  const deleteVehicle = (vehicleId: string) => {
    setUserVehicles(prev => prev.filter(v => v.id !== vehicleId));
    addToast('Vehicle removed from garage', 'info');
  };

  const submitReview = (review: Omit<CustomerReview, 'id' | 'date' | 'verified'>) => {
    const newRev: CustomerReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };
    setReviews(prev => [newRev, ...prev]);
    addToast('Thank you! Your feedback has been verified and published.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        pageParam,
        currentUser,
        switchRole,
        isLoggedIn,
        loginUser,
        logoutUser,
        services,
        packages,
        staff,
        inventory,
        bookings,
        repairJobs,
        inspectionReports,
        estimates,
        invoices,
        reviews,
        blogPosts,
        userVehicles,
        createBooking,
        cancelBooking,
        updateRepairStage,
        approveInspectionItem,
        approveEstimateLine,
        approveFullEstimate,
        processPayment,
        usePartOnJob,
        restockPart,
        addVehicle,
        deleteVehicle,
        submitReview,
        toasts,
        addToast,
        removeToast,
        selectedJobRef,
        setSelectedJobRef
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
