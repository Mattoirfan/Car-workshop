export type ServiceCategory =
  | 'routine-maintenance'
  | 'engine-diagnostics'
  | 'brake-services'
  | 'tires-wheels'
  | 'battery-electrical'
  | 'ac-climate'
  | 'suspension-steering'
  | 'transmission-clutch'
  | 'bodywork-paint'
  | 'detailing-care'
  | 'pre-purchase'
  | 'roadside'
  | 'hybrid-ev';

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  commonSymptoms: string[];
  typicalScope: string[];
  exclusions: string[];
  startingPrice: number; // In INR
  durationEstimate: string;
  warrantyPeriod: string;
  iconName: string;
  imageAlt: string;
  imageUrl?: string;
  featured?: boolean;
}

export type VehicleType = 'Hatchback' | 'Sedan' | 'Compact SUV' | 'Full-size SUV' | 'Luxury / German';
export type FuelType = 'Petrol' | 'Diesel' | 'CNG / Hybrid' | 'Electric (EV)';
export type TransmissionType = 'Manual' | 'Automatic';

export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  regNumber: string;
  vin?: string;
  odometer: number;
  color?: string;
}

export type BookingStatus =
  | 'pending_confirmation'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  referenceNumber: string; // e.g. DC-98421
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleReg: string;
  vehicleType: VehicleType;
  fuelType: FuelType;
  serviceId: string;
  serviceName: string;
  branch: string;
  bookingDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. 09:30 AM
  symptoms: string;
  pickupDropRequested: boolean;
  estimatedCost: number;
  status: BookingStatus;
  createdAt: string;
  assignedTechnician?: string;
  jobId?: string;
}

export type RepairStage =
  | 'appointment_confirmed'
  | 'vehicle_checked_in'
  | 'initial_inspection'
  | 'diagnosis_in_progress'
  | 'estimate_prepared'
  | 'awaiting_customer_approval'
  | 'parts_ordered'
  | 'repair_in_progress'
  | 'quality_inspection'
  | 'ready_for_collection'
  | 'completed_delivered';

export interface RepairJobHistoryEntry {
  stage: RepairStage;
  timestamp: string;
  note: string;
  actor: string;
}

export interface RepairJob {
  id: string;
  bookingRef: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    regNumber: string;
    fuelType: FuelType;
    odometer: number;
  };
  currentStage: RepairStage;
  stageHistory: RepairJobHistoryEntry[];
  assignedTechnician: string;
  serviceAdvisor: string;
  branch: string;
  estimatedCompletion: string;
  internalNotes: string[];
  customerNotes: string[];
  inspectionReportId?: string;
  estimateId?: string;
  invoiceId?: string;
  createdAt: string;
  updatedAt: string;
}

export type InspectionPriority = 'green' | 'amber' | 'red';
export type CustomerDecision = 'pending' | 'approved' | 'declined';

export interface InspectionItem {
  id: string;
  system: string; // e.g. "Braking System", "Powertrain", "Suspension", "Electrical"
  component: string;
  status: InspectionPriority;
  finding: string;
  recommendation: string;
  estimatedCost?: number;
  customerDecision: CustomerDecision;
  imageUrl?: string;
  reviewedBy: string;
}

export interface InspectionReport {
  id: string;
  jobId: string;
  bookingRef: string;
  vehicleDetails: string;
  completedAt: string;
  leadTechnician: string;
  overallHealthScore: number; // 0-100
  items: InspectionItem[];
  customerSummary: string;
}

export interface EstimateLineItem {
  id: string;
  description: string;
  category: 'parts' | 'labor' | 'diagnostics' | 'consumables';
  unitCost: number;
  quantity: number;
  total: number;
  isMandatory: boolean;
  approvedByCustomer: boolean;
}

export interface ServiceEstimate {
  id: string;
  jobId: string;
  bookingRef: string;
  createdAt: string;
  validUntil: string;
  status: 'draft' | 'sent' | 'approved' | 'partially_approved' | 'declined' | 'revised';
  items: EstimateLineItem[];
  subtotal: number;
  gstAmount: number; // 18% standard GST in India
  discountAmount: number;
  totalAmount: number;
  notes: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. INV-2026-0042
  jobId: string;
  bookingRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicle: string;
  issueDate: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'unpaid' | 'paid' | 'refunded';
  paidAt?: string;
  paymentMethod?: 'UPI' | 'Credit / Debit Card' | 'Net Banking' | 'Cash at Workshop';
  transactionId?: string;
}

export interface InventoryPart {
  id: string;
  sku: string;
  name: string;
  category: string;
  compatibleVehicles: string;
  stockQty: number;
  minReorderLevel: number;
  costPrice: number;
  retailPrice: number;
  supplier: string;
  shelfLocation: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  experienceYears: number;
  specializations: string[];
  certifications: string[];
  languages: string[];
  branch: string;
  avatarUrl: string;
  activeJobsCount: number;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  vehicle: string;
  serviceCategory: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  verified: boolean;
  branch: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  excerpt: string;
  imageUrl?: string;
  content: string[];
  keyTakeaways: string[];
  relatedServiceSlug: string;
}

export type UserRole = 'customer' | 'technician' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  registeredDate: string;
}
