import {
  ServiceItem,
  StaffMember,
  CustomerReview,
  BlogPost,
  InventoryPart,
  RepairJob,
  InspectionReport,
  ServiceEstimate,
  Invoice,
  Booking,
  Vehicle
} from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'car-servicing',
    name: 'Routine Scheduled Maintenance',
    category: 'routine-maintenance',
    shortDescription: 'Comprehensive periodic servicing according to manufacturer intervals to ensure peak engine longevity.',
    fullDescription: 'Our routine maintenance covers complete oil and filter replacement with OEM-spec lubricants, air filter and cabin pollen filter inspection, multi-point fluid top-ups, and a 40-point vehicle safety inspection.',
    commonSymptoms: [
      'Service reminder lamp lit on instrument cluster',
      'Engine oil feels dark, gritty, or past 10,000 km / 1-year mark',
      'Sluggish cold-start response or rough idle',
      'Preparation for long-distance highway road trip'
    ],
    typicalScope: [
      'Synthetic engine oil flush & refill (5W-30 / 0W-20 API-SP certified)',
      'OEM oil filter cartridge replacement',
      'Engine air filter inspection & dry compressed-air cleaning or change',
      'AC cabin pollen filter check',
      'Brake, coolant, power steering, and washer fluid top-up',
      '40-point safety check report'
    ],
    exclusions: [
      'Timing belt or water pump replacement (quoted separately if required)',
      'Clutch plate replacement or transmission overhaul',
      'Spark plugs replacement (billed only if worn)'
    ],
    startingPrice: 1499,
    durationEstimate: '90 - 120 mins',
    warrantyPeriod: '6 Months / 10,000 km',
    iconName: 'Wrench',
    imageAlt: 'Automotive routine periodic maintenance and oil service',
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: 'srv-2',
    slug: 'engine-diagnostics',
    name: 'Computerized Engine Diagnostics & Repair',
    category: 'engine-diagnostics',
    shortDescription: 'Advanced scanner diagnostics for Check Engine lights, misfires, sensor faults, and cooling issues.',
    fullDescription: 'Using OE-grade Bosch and Autel scan tools, our certified technicians decode live ECU sensor streams, test actuator solenoids, isolate fuel trim anomalies, and diagnose overheating or turbo boost leaks.',
    commonSymptoms: [
      'Check Engine MIL icon blinking or steady amber',
      'Sudden drop in fuel economy or engine hesitation under load',
      'Engine temperature gauge creeping towards the red zone',
      'Visible oil, coolant, or boost pipe leaks around the block'
    ],
    typicalScope: [
      'OBD-II full electronic system scan & live data logging',
      'Ignition coil & spark plug resistance benchmarking',
      'Fuel rail pressure and mass air flow (MAF) sensor analysis',
      'Cooling system pressure test & thermostat cycle verification',
      'Comprehensive digital diagnostic findings sheet'
    ],
    exclusions: [
      'Major mechanical engine strip-down or cylinder head rebuild',
      'Exhaust catalytic converter replacement'
    ],
    startingPrice: 999,
    durationEstimate: '60 - 90 mins',
    warrantyPeriod: '3 Months / 5,000 km on repaired components',
    iconName: 'Cpu',
    imageAlt: 'Diagnostic technician inspecting vehicle OBD-II telemetry',
    imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: 'srv-3',
    slug: 'brake-repair',
    name: 'Precision Brake System Service',
    category: 'brake-services',
    shortDescription: 'Ceramic brake pad replacement, rotor runout skimming, hydraulic line bleeding, and ABS calibration.',
    fullDescription: 'Your safety depends on consistent stopping power. We inspect disc rotor thickness against minimum manufacturer tolerances, replace worn friction pads with low-dust ceramic equivalents, and bleed high-temp DOT-4 hydraulic fluid.',
    commonSymptoms: [
      'High-pitched squealing or grinding sound when braking',
      'Pulsating or vibrating brake pedal under highway speeds',
      'Vehicle pulls to one side when decelerating',
      'Spongy or low brake pedal feel requiring excessive travel'
    ],
    typicalScope: [
      'Brake pad wear micrometer measurement (front and rear)',
      'Rotor disc runout measurement and surface inspection',
      'Caliper slider pin lubrication with synthetic high-temp grease',
      'Brake fluid moisture hygrometer test & reservoir top-up',
      'Parking brake tension adjustment'
    ],
    exclusions: [
      'ABS hydraulic modulator module electronic rebuild',
      'Master cylinder replacement if internal seals have disintegrated'
    ],
    startingPrice: 899,
    durationEstimate: '60 - 90 mins',
    warrantyPeriod: '6 Months / 10,000 km',
    iconName: 'Disc',
    imageAlt: 'Mechanic installing ventilated disc brake calipers',
    imageUrl: 'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: 'srv-4',
    slug: 'tyre-and-wheel',
    name: '3D Wheel Alignment & Tire Care',
    category: 'tires-wheels',
    shortDescription: 'Computerized laser alignment, dynamic wheel balancing, tread depth analysis, and tire rotation.',
    fullDescription: 'Eliminate uneven tread wear and high-speed steering wobble. We use precision Hunter 3D imaging alignment racks to adjust camber, caster, and toe angles to factory specifications.',
    commonSymptoms: [
      'Vehicle drifts or pulls to the left or right on straight roads',
      'Steering wheel off-center while driving straight',
      'Steering wheel shakes or vibrates between 80–110 km/h',
      'Excessive feathering or bald spots on inner/outer tire edges'
    ],
    typicalScope: [
      'Laser-guided 3D 4-wheel alignment calibration',
      'Dynamic computerized wheel balancing with precision weights',
      '5-wheel tire rotation (including spare if compatible)',
      'Tread depth micrometer check & nitrogen inflation'
    ],
    exclusions: [
      'Tire sidewall puncture vulcanization (safety prohibited)',
      'Alloy rim crack welding'
    ],
    startingPrice: 799,
    durationEstimate: '45 - 60 mins',
    warrantyPeriod: '30 Days / 1,500 km Alignment Guarantee',
    iconName: 'CircleDot',
    imageAlt: '3D wheel alignment laser sensors clamped to car wheels',
    imageUrl: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-5',
    slug: 'battery-electrical',
    name: 'Battery Health & Electrical Diagnosis',
    category: 'battery-electrical',
    shortDescription: 'Digital CCA load testing, alternator charging analysis, parasitic drain detection, and wiring repairs.',
    fullDescription: 'Modern cars are rolling computers. We test cold cranking amps (CCA), internal cell resistance, starter motor draw, and isolate battery-draining parasitic electrical leaks.',
    commonSymptoms: [
      'Slow, sluggish engine crank when turning ignition key',
      'Battery warning light glowing while engine is running',
      'Flickering headlights or dim cabin instrument displays',
      'Battery drains completely after sitting parked for 48 hours'
    ],
    typicalScope: [
      'Digital battery load test & internal conductance readout',
      'Alternator ripple voltage & diode health diagnosis',
      'Starter motor cranking current draw test',
      'Terminal cleaning, de-oxidation & protective anti-corrosion coating',
      'Parasitic milliamp drain test on fuse box'
    ],
    exclusions: [
      'Replacement battery unit cost (billed separately at MSRP)',
      'Main body control module (BCM) reprogramming'
    ],
    startingPrice: 499,
    durationEstimate: '30 - 45 mins',
    warrantyPeriod: 'Up to 36 Months manufacturer warranty on new batteries',
    iconName: 'Zap',
    imageAlt: 'Digital battery analyzer clamped to automotive terminals',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-6',
    slug: 'car-ac',
    name: 'Climate Control & AC Service',
    category: 'ac-climate',
    shortDescription: 'Refrigerant recovery and recharge, evaporator anti-bacterial fogging, compressor clutch test, and leak detection.',
    fullDescription: 'Stay cool and breathe clean air. Our automated AC recovery station flushes old oil, vacuums moisture, checks for vacuum leaks, injects UV dye, and recharges precise grams of R134a/R1234yf refrigerant.',
    commonSymptoms: [
      'AC blows warm or lukewarm air even at lowest temperature setting',
      'Musty, mildew smell from AC vents when blower turns on',
      'Hissing noise from dashboard or rattling noise from compressor',
      'Reduced airflow velocity through cabin vents'
    ],
    typicalScope: [
      'Automated refrigerant recovery and deep vacuum leak hold test',
      'Pure synthetic PAG compressor lubricant replenishment',
      'Factory-spec weight refrigerant gas recharge (R134a)',
      'Cabin pollen filter cleaning/replacement check',
      'Vent grille temperature thermometer test (target: 4°C - 7°C)'
    ],
    exclusions: [
      'AC condenser or cooling coil physical replacement labor',
      'Compressor internal seizure rebuild'
    ],
    startingPrice: 1699,
    durationEstimate: '60 - 90 mins',
    warrantyPeriod: '6 Months cooling guarantee',
    iconName: 'Wind',
    imageAlt: 'Technician charging automotive air conditioning refrigerant',
    imageUrl: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-7',
    slug: 'suspension-steering',
    name: 'Suspension & Steering Overhaul',
    category: 'suspension-steering',
    shortDescription: 'Strut replacement, control arm bushing repair, tie-rod inspection, and noise isolation.',
    fullDescription: 'Restore your vehicle’s factory ride composure. We inspect McPherson struts, shock absorbers, stabilizer bar end links, ball joints, and steering racks on our workshop hydraulic shake rig.',
    commonSymptoms: [
      'Thudding, clunking, or squeaking over speed bumps and rough roads',
      'Excessive body roll around corners or nose-diving while braking',
      'Loose, vague steering feel with dead play in center',
      'Visible hydraulic oil leaking down the body of the shock absorber'
    ],
    typicalScope: [
      'Under-chassis hydraulic lift inspection of all rubber boots & bushes',
      'Tie rod and rack end joint play assessment',
      'Shock absorber rebound damping test',
      'Sway bar link and stabilizer mount torque verification',
      'Road test on varied pavement surfaces'
    ],
    exclusions: [
      'Electronic power steering rack circuit board repairs',
      'Active air suspension compressor unit replacement'
    ],
    startingPrice: 1199,
    durationEstimate: '90 - 150 mins',
    warrantyPeriod: '6 Months / 10,000 km',
    iconName: 'ShieldAlert',
    imageAlt: 'Automotive suspension coil spring and shock absorber inspection',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-8',
    slug: 'transmission-clutch',
    name: 'Transmission & Clutch Service',
    category: 'transmission-clutch',
    shortDescription: 'ATF fluid flush, clutch plate inspection, DCT calibration, and smooth gearshift diagnosis.',
    fullDescription: 'Whether manual, torque converter, CVT, or dual-clutch transmission, our specialists ensure crisp, jerk-free gear changes and replace friction plates before drivetrain damage occurs.',
    commonSymptoms: [
      'Engine RPM rises without proportional vehicle acceleration (slipping)',
      'Hard, jerky gear shifts or clunking into Drive/Reverse',
      'Burning smell coming from engine bay during bumper-to-bumper traffic',
      'Clutch pedal feels abnormally heavy or sticks to the floor'
    ],
    typicalScope: [
      'Transmission fluid level & contamination analysis',
      'Clutch release bearing & slave cylinder leak check',
      'Flywheel surface inspection & clutch bite point calibration',
      'Transmission mount vibration dampening check'
    ],
    exclusions: [
      'Full gearbox transmission casing rebuild',
      'Torque converter replacement'
    ],
    startingPrice: 1899,
    durationEstimate: '2 - 4 hours',
    warrantyPeriod: '6 Months / 10,000 km',
    iconName: 'Cog',
    imageAlt: 'Mechanic examining automotive clutch plate and flywheel',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-9',
    slug: 'bodywork-paint',
    name: 'Minor Dent & Scratch Repair',
    category: 'bodywork-paint',
    shortDescription: 'Paintless dent removal (PDR), high-gloss scratch touch-up, bumper repair, and computerized paint matching.',
    fullDescription: 'Restore your vehicle to showroom finish. We use computerized spectrophotometer cameras to match OEM paint formulas, spray in a pressurized dust-free downdraft booth, and bake to ceramic hardness.',
    commonSymptoms: [
      'Parking lot dings, door creases, or minor collision dents',
      'Scratched bumper corners exposing black plastic undercoat',
      'Stone chips on hood leading to minor rust spots',
      'Faded clear coat or swirl marks from abrasive washing'
    ],
    typicalScope: [
      'Paintless dent removal where paint film is intact',
      'Precision OEM color code matching with premium Glasurit paints',
      'Dual-action primer, basecoat, and high-solid clearcoat application',
      'Dust-free infrared paint baking cycle',
      'Mirror compounding and buffing finish'
    ],
    exclusions: [
      'Full vehicle total-loss structural chassis puller realignment',
      'Full vehicle custom color respray'
    ],
    startingPrice: 1999,
    durationEstimate: '1 - 2 days',
    warrantyPeriod: '2 Years Paint Peel & Fade Warranty',
    iconName: 'Sparkles',
    imageAlt: 'Technician applying precision paint finish in dust-free spray booth',
    imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-10',
    slug: 'car-detailing',
    name: 'Deep Interior & Exterior Detailing',
    category: 'detailing-care',
    shortDescription: 'Steam upholstery sanitization, paint de-ironization, machine claying, and ceramic sealants.',
    fullDescription: 'Experience that new car smell and radiant luster again. We wash with pH-neutral foam, remove iron fallout, hot-water steam clean deep carpet fibers, and condition leather with UV blockers.',
    commonSymptoms: [
      'Stained fabric seats, food spills, or pet odors inside cabin',
      'Dull paint surface feeling rough like sandpaper to the touch',
      'Cloudy, yellowed headlight lenses reducing night illumination',
      'Accumulated brake dust baked into alloy wheel spokes'
    ],
    typicalScope: [
      'Multi-stage foam hand wash with two-bucket grit guard method',
      'Chemical iron decon and clay bar treatment',
      'High-pressure steam sanitization of vents, carpets, and headliner',
      'Leather deep clean and rich lanolin conditioning',
      'Hydrophobic paint sealant application lasting up to 6 months'
    ],
    exclusions: [
      '9H multi-layer ceramic coating (quoted separately under Ceramic Package)'
    ],
    startingPrice: 1799,
    durationEstimate: '3 - 5 hours',
    warrantyPeriod: 'Satisfaction guarantee at vehicle handover',
    iconName: 'Droplet',
    imageAlt: 'Professional detailing specialist buffing vehicle paintwork',
    imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-11',
    slug: 'pre-purchase-inspection',
    name: 'Pre-Purchase Comprehensive Vehicle Inspection',
    category: 'pre-purchase',
    shortDescription: 'Independent 150-point inspection before buying a used car: body, engine, OBD scan, frame, and road test.',
    fullDescription: 'Never buy a used car blindly. Our master technicians uncover hidden accident damage, flood rust, rolled-back odometers, pending engine faults, and worn wear-and-tear items before you negotiate.',
    commonSymptoms: [
      'Considering purchasing a pre-owned car from an online seller or dealer',
      'Unsure if the vehicle was involved in a past frame-damaging collision',
      'Need an unbiased, itemized estimate of near-future maintenance costs'
    ],
    typicalScope: [
      '150-point bumper-to-bumper vehicle inspection checklist',
      'Ultrasonic paint depth gauge scan to identify repainted panels & bondo filler',
      'Full OBD electronic computer scan for cleared trouble codes',
      'Chassis rail inspection for straightening marks or welds',
      'Fluids condition, compression indication, and brake/tire wear life',
      'Comprehensive PDF report with annotated photos and cost estimates'
    ],
    exclusions: [
      'Engine disassembly or internal teardown',
      'Legal ownership title verification (buyer must verify with RTO)'
    ],
    startingPrice: 1999,
    durationEstimate: '90 - 120 mins',
    warrantyPeriod: 'Independent certified inspection report valid on date of test',
    iconName: 'FileCheck',
    imageAlt: 'Technician measuring paint thickness with digital gauge',
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: 'srv-12',
    slug: 'roadside-assistance',
    name: '24/7 Roadside Assistance & Breakdown Support',
    category: 'roadside',
    shortDescription: 'On-demand jump start, flat tire change, emergency fuel delivery, and flatbed towing dispatch.',
    fullDescription: 'Stranded on the road? Our mobile quick-response vans are dispatched with jump-packs, tire changers, and diagnostic equipment within metropolitan limits, supported by flatbed recovery.',
    commonSymptoms: [
      'Car dead and won’t start in office basement or highway',
      'Flat tire with stripped lug nut or difficult spare tire',
      'Engine overheated or vehicle immobilized safely on road shoulder'
    ],
    typicalScope: [
      'Emergency roadside dispatch (average ETA: 35-50 mins)',
      '12V battery jump start with surge-protected mobile pack',
      'Flat tire swap with vehicle’s spare wheel',
      'Emergency fuel delivery (up to 5 Liters)',
      'Flatbed towing coordination to our nearest workshop branch'
    ],
    exclusions: [
      'Accident recovery requiring heavy crane extraction off embankments',
      'Cost of replacement tires or spare parts'
    ],
    startingPrice: 1299,
    durationEstimate: 'Immediate dispatch',
    warrantyPeriod: 'Safe delivery to workshop guarantee',
    iconName: 'Truck',
    imageAlt: 'Emergency roadside service van assisting stranded vehicle',
    imageUrl: 'https://images.unsplash.com/photo-1562920616-09559c98a396?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-13',
    slug: 'hybrid-ev',
    name: 'Hybrid & EV High-Voltage Systems Check',
    category: 'hybrid-ev',
    shortDescription: 'EV battery health state (SoH), regenerative brake check, high-voltage coolant service, and insulation tests.',
    fullDescription: 'Servicing modern electric vehicles requires specialized high-voltage insulated tools, dielectric PPE, and factory-trained technicians. We perform battery State of Health checks, thermal loop servicing, and safety interlock tests.',
    commonSymptoms: [
      'Noticeable reduction in driving range per full charge',
      'High-voltage safety warning alert on EV instrument panel',
      'AC or battery thermal cooling fan running continuously at high speed',
      'Regenerative braking feels inconsistent or weak'
    ],
    typicalScope: [
      'High-voltage battery State of Health (SoH) cell balance scan',
      'Insulation resistance megohmmeter check on inverter wiring',
      'EV thermal management loop fluid conductivity test',
      '12V auxiliary system health & DC-DC converter verification',
      'Regenerative braking sensor calibration'
    ],
    exclusions: [
      'Disassembly of sealed high-voltage lithium battery pack casings',
      'Motor stator rewinding'
    ],
    startingPrice: 2499,
    durationEstimate: '90 - 150 mins',
    warrantyPeriod: '6 Months / 10,000 km',
    iconName: 'BatteryCharging',
    imageAlt: 'Certified EV technician with high-voltage PPE inspecting electric vehicle',
    imageUrl: 'https://images.unsplash.com/photo-1558441719-aa34bef5b31d?auto=format&fit=crop&q=80&w=800',
    featured: true
  }
];

export interface ServicePackage {
  id: string;
  name: string;
  tier: 'essential' | 'complete' | 'premium' | 'health-check';
  tagline: string;
  basePrice: number; // INR
  duration: string;
  recommendedFrequency: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  isPopular?: boolean;
}

export const INITIAL_PACKAGES: ServicePackage[] = [
  {
    id: 'pkg-health-check',
    name: 'Vehicle Health Check',
    tier: 'health-check',
    tagline: 'Fast visual and diagnostic screening for peace of mind before road trips.',
    basePrice: 799,
    duration: '45 mins',
    recommendedFrequency: 'Before long road trips or every 6 months',
    highlights: [
      '40-point safety check',
      'Digital battery load test',
      'Tire tread & brake pad wear check',
      'Top-up of essential fluids'
    ],
    inclusions: [
      'Visual inspection of brakes, tires, lighting, and belts',
      'Battery state of charge & cold cranking check',
      'Engine oil & coolant level verification',
      'Digital summary report sent to your phone'
    ],
    exclusions: [
      'Engine oil or filter replacement',
      'Wheel alignment or balancing'
    ]
  },
  {
    id: 'pkg-essential',
    name: 'Essential Care',
    tier: 'essential',
    tagline: 'Standard periodic oil service and basic safety maintenance.',
    basePrice: 1499,
    duration: '90 mins',
    recommendedFrequency: 'Every 10,000 km or 12 months',
    highlights: [
      'Full synthetic oil change (up to 3.5L)',
      'OEM oil filter replacement',
      'Air filter cleaning & fluid top-ups',
      '50-point comprehensive inspection'
    ],
    inclusions: [
      'Premium synthetic motor oil (compatible viscosity grade)',
      'Genuine spin-on or cartridge oil filter',
      'Coolant, brake fluid & windshield wash top-ups',
      'Brake pad thickness visual check',
      'Digital service summary with stamp'
    ],
    exclusions: [
      'Wheel alignment & dynamic balancing',
      'AC gas evacuation and recharge'
    ]
  },
  {
    id: 'pkg-complete',
    name: 'Complete Care',
    tier: 'complete',
    tagline: 'Our most popular comprehensive service for complete confidence.',
    basePrice: 2999,
    duration: '2.5 hours',
    recommendedFrequency: 'Every 20,000 km or 24 months',
    isPopular: true,
    highlights: [
      'All Essential Care inclusions',
      'Front & rear brake cleaning and pad caliper lubrication',
      'Full OBD computerized scan',
      '3D 4-wheel alignment check',
      'Digital Vehicle Inspection (DVI) photo report'
    ],
    inclusions: [
      'Synthetic engine oil & OEM oil filter replacement',
      'Air filter replacement (OE spec)',
      'AC cabin pollen filter sanitized',
      'Four-wheel brake caliper cleaning & pin greasing',
      'OBD-II diagnostic error code scan',
      'Full Green/Amber/Red Digital Inspection Report with technician photos',
      'Complimentary exterior wash and interior vacuum'
    ],
    exclusions: [
      'Transmission fluid flush',
      'Spark plugs (unless requested during approval)'
    ]
  },
  {
    id: 'pkg-premium',
    name: 'Premium Care',
    tier: 'premium',
    tagline: 'White-glove executive service with complete detailing and priority workshop bay.',
    basePrice: 4999,
    duration: '4 hours',
    recommendedFrequency: 'Annually for luxury, performance, and fleet cars',
    highlights: [
      'All Complete Care inclusions',
      '3D wheel alignment + computerized balancing',
      'AC vent antibacterial foam treatment',
      'Interior steam sanitization + exterior foam gloss polish',
      'Priority workshop bay + pick-up & drop-off included'
    ],
    inclusions: [
      'Top-tier synthetic motor oil (Mobil 1 / Castrol Edge or OEM spec)',
      'Engine oil filter & high-flow air filter replacement',
      'Complete brake caliper overhaul & brake fluid renewal',
      'Computerized 3D 4-wheel alignment + balancing',
      'Air-conditioning evaporator duct foam decontamination',
      'Full interior vacuum, dashboard dress & steam sanitization',
      'Two-stage exterior hand wash and gloss polymer sealant',
      'Comprehensive DVI report with technician consultation'
    ],
    exclusions: [
      'Wear parts such as brake discs, clutch plates, or tires'
    ]
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'stf-1',
    name: 'Rajesh Nair',
    role: 'Master Diagnostic Technician',
    title: 'Lead Powertrain & ECU Specialist',
    bio: 'With over 14 years specializing in European and Japanese engine management systems, Rajesh leads our computerized diagnostics bay. Certified in advanced oscilloscope fault isolation and direct-injection fuel mapping.',
    experienceYears: 14,
    specializations: ['Bosch ECU Diagnostics', 'Turbocharger Troubleshooting', 'Direct Injection (GDI)', 'Misfire Isolation'],
    certifications: ['ASE Master Automobile Technician', 'Bosch Certified Diagnostic Specialist', 'High Voltage Safety Level 2'],
    languages: ['English', 'Hindi', 'Kannada', 'Malayalam'],
    branch: 'Central Flagship Workshop (Bengaluru)',
    avatarUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400',
    activeJobsCount: 3
  },
  {
    id: 'stf-2',
    name: 'Vikram Singh',
    role: 'Senior Brake & Chassis Specialist',
    title: 'Braking Systems & Suspension Master',
    bio: 'Former technical crew engineer with racing workshop experience. Vikram ensures brake calipers, electronic parking brakes, and precision 3D suspension alignment match strict factory tolerances.',
    experienceYears: 11,
    specializations: ['Ceramic Brake Systems', 'Hunter 3D Alignment', 'Hydraulic Steering Racks', 'Air Suspension'],
    certifications: ['Brembo Technical Certification', 'Hunter Engineering 3D Alignment Pro'],
    languages: ['English', 'Hindi', 'Punjabi'],
    branch: 'Central Flagship Workshop (Bengaluru)',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    activeJobsCount: 2
  },
  {
    id: 'stf-3',
    name: 'Ananya Sharma',
    role: 'Lead Service Advisor',
    title: 'Customer Experience & Estimate Manager',
    bio: 'Ananya bridges the technical workshop bay and customer convenience. She prepares transparent, uninflated estimates, walks customers through digital inspection videos, and coordinates timelines.',
    experienceYears: 8,
    specializations: ['Customer Consultation', 'Clear Cost Estimating', 'Warranty Claims', 'Digital Inspection Workflow'],
    certifications: ['Certified Automotive Service Consultant (Automotive Management Institute)', 'Transparent Pricing Advocate'],
    languages: ['English', 'Hindi', 'Telugu'],
    branch: 'Central Flagship Workshop (Bengaluru)',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    activeJobsCount: 5
  },
  {
    id: 'stf-4',
    name: 'Farhan Siddiqui',
    role: 'Certified Hybrid & EV Specialist',
    title: 'High-Voltage Electric Drivetrain Technician',
    bio: 'Trained in lithium battery pack diagnostics, thermal management loops, and DC-DC converters. Farhan oversees high-voltage safety and hybrid powertrain health inspections.',
    experienceYears: 9,
    specializations: ['EV High-Voltage Safety', 'Battery State of Health (SoH)', 'Inverter Diagnostics', 'Regen Braking'],
    certifications: ['TÜV Certified EV High-Voltage Technician', 'Hybrid Drivetrain Specialist'],
    languages: ['English', 'Hindi', 'Urdu'],
    branch: 'Central Flagship Workshop (Bengaluru)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    activeJobsCount: 2
  }
];

export const INITIAL_INVENTORY: InventoryPart[] = [
  {
    id: 'prt-101',
    sku: 'ENG-OIL-5W30-SYN',
    name: 'Motul 8100 X-cess 5W-40 Synthetic Oil (1L)',
    category: 'Fluids & Lubricants',
    compatibleVehicles: 'Multi-brand (VW, Skoda, Honda, Hyundai, BMW)',
    stockQty: 48,
    minReorderLevel: 15,
    costPrice: 620,
    retailPrice: 850,
    supplier: 'Motul Lubricants Direct',
    shelfLocation: 'Bay-A / Shelf-02'
  },
  {
    id: 'prt-102',
    sku: 'FLT-OIL-VW-12',
    name: 'Mann-Filter Premium Oil Cartridge (HU711/51x)',
    category: 'Filters',
    compatibleVehicles: 'Volkswagen Polo/Vento, Skoda Rapid (1.5 / 1.6 TDI)',
    stockQty: 18,
    minReorderLevel: 8,
    costPrice: 280,
    retailPrice: 420,
    supplier: 'Mann+Hummel India',
    shelfLocation: 'Bay-A / Shelf-05'
  },
  {
    id: 'prt-103',
    sku: 'BRK-PAD-HON-F',
    name: 'Brembo Ceramic Front Brake Pads',
    category: 'Braking System',
    compatibleVehicles: 'Honda City 4th/5th Gen, Honda Civic',
    stockQty: 6,
    minReorderLevel: 8, // Triggers low-stock alert!
    costPrice: 1650,
    retailPrice: 2450,
    supplier: 'Brembo Auto Components',
    shelfLocation: 'Bay-B / Shelf-01'
  },
  {
    id: 'prt-104',
    sku: 'SPK-NGK-IRID',
    name: 'NGK Laser Iridium Spark Plug (Pack of 4)',
    category: 'Ignition System',
    compatibleVehicles: 'Maruti Swift / Baleno, Hyundai Creta 1.5 Petrol',
    stockQty: 24,
    minReorderLevel: 10,
    costPrice: 1400,
    retailPrice: 2100,
    supplier: 'NGK Spark Plugs Co',
    shelfLocation: 'Bay-C / Shelf-04'
  },
  {
    id: 'prt-105',
    sku: 'BAT-EXIDE-45AH',
    name: 'Exide Mileage ISS 12V 45Ah Maintenance-Free Battery',
    category: 'Electrical & Batteries',
    compatibleVehicles: 'Hatchbacks & Compact Sedans',
    stockQty: 4,
    minReorderLevel: 5, // Triggers low stock alert!
    costPrice: 3800,
    retailPrice: 4950,
    supplier: 'Exide Industries Ltd',
    shelfLocation: 'Bay-D / Battery Rack'
  },
  {
    id: 'prt-106',
    sku: 'FLT-CAB-HYU-AC',
    name: 'Carbon-Activated Cabin Pollen Filter',
    category: 'Filters',
    compatibleVehicles: 'Hyundai Creta, Kia Seltos, Hyundai i20',
    stockQty: 14,
    minReorderLevel: 6,
    costPrice: 320,
    retailPrice: 550,
    supplier: 'Purolator India',
    shelfLocation: 'Bay-A / Shelf-07'
  }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'veh-1',
    userId: 'usr-customer-1',
    make: 'Honda',
    model: 'City ZX i-VTEC',
    year: 2021,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    regNumber: 'KA 03 MN 4821',
    vin: 'MAKGM6650KM102948',
    odometer: 38400,
    color: 'Radiant Red'
  },
  {
    id: 'veh-2',
    userId: 'usr-customer-1',
    make: 'Hyundai',
    model: 'Creta SX(O)',
    year: 2023,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    regNumber: 'KA 05 PQ 9102',
    vin: 'MALH35102PN982144',
    odometer: 18200,
    color: 'Polar White'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1',
    referenceNumber: 'DC-84920',
    customerId: 'usr-customer-1',
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav.mehta@gmail.com',
    customerPhone: '+91-98450-11223',
    vehicleMake: 'Honda',
    vehicleModel: 'City ZX i-VTEC',
    vehicleYear: 2021,
    vehicleReg: 'KA 03 MN 4821',
    vehicleType: 'Sedan',
    fuelType: 'Petrol',
    serviceId: 'srv-1',
    serviceName: 'Complete Care Periodic Service',
    branch: 'Central Flagship Workshop (Bengaluru)',
    bookingDate: '2026-11-02',
    timeSlot: '09:30 AM',
    symptoms: 'Scheduled periodic service. Also noticed a squeaking noise from the front left wheel when braking from 60 km/h.',
    pickupDropRequested: true,
    estimatedCost: 2999,
    status: 'in_progress',
    createdAt: '2026-10-30T10:15:00Z',
    assignedTechnician: 'Rajesh Nair',
    jobId: 'job-101'
  },
  {
    id: 'bk-2',
    referenceNumber: 'DC-77312',
    customerId: 'usr-customer-2',
    customerName: 'Priya Sundaram',
    customerEmail: 'priya.sundaram@outlook.com',
    customerPhone: '+91-99001-44556',
    vehicleMake: 'Hyundai',
    vehicleModel: 'Creta SX(O)',
    vehicleYear: 2023,
    vehicleReg: 'KA 05 PQ 9102',
    vehicleType: 'Compact SUV',
    fuelType: 'Diesel',
    serviceId: 'srv-2',
    serviceName: 'Computerized Engine Diagnostics',
    branch: 'Central Flagship Workshop (Bengaluru)',
    bookingDate: '2026-11-03',
    timeSlot: '11:00 AM',
    symptoms: 'Check Engine light illuminated after refueling on highway. Slight turbo lag.',
    pickupDropRequested: false,
    estimatedCost: 999,
    status: 'confirmed',
    createdAt: '2026-10-31T08:30:00Z',
    assignedTechnician: 'Rajesh Nair'
  }
];

export const INITIAL_REPAIR_JOBS: RepairJob[] = [
  {
    id: 'job-101',
    bookingRef: 'DC-84920',
    customerId: 'usr-customer-1',
    customerName: 'Aarav Mehta',
    customerPhone: '+91-98450-11223',
    vehicleInfo: {
      make: 'Honda',
      model: 'City ZX i-VTEC',
      year: 2021,
      regNumber: 'KA 03 MN 4821',
      fuelType: 'Petrol',
      odometer: 38400
    },
    currentStage: 'awaiting_customer_approval',
    stageHistory: [
      {
        stage: 'appointment_confirmed',
        timestamp: '2026-10-30T10:30:00Z',
        note: 'Appointment confirmed for morning slot at Central Workshop.',
        actor: 'Ananya Sharma (Service Advisor)'
      },
      {
        stage: 'vehicle_checked_in',
        timestamp: '2026-11-01T09:15:00Z',
        note: 'Vehicle checked in at gate. Valet inspection completed; no pre-existing scratches noted on right flank.',
        actor: 'Karan (Gate Reception)'
      },
      {
        stage: 'initial_inspection',
        timestamp: '2026-11-01T09:45:00Z',
        note: 'Vehicle placed on hydraulic lift Bay-02 for 40-point inspection.',
        actor: 'Rajesh Nair (Master Tech)'
      },
      {
        stage: 'diagnosis_in_progress',
        timestamp: '2026-11-01T10:30:00Z',
        note: 'Brake pads measured: Front pads at 2.8mm (amber threshold). Discs clean with 0.02mm runout.',
        actor: 'Vikram Singh (Brake Tech)'
      },
      {
        stage: 'estimate_prepared',
        timestamp: '2026-11-01T11:00:00Z',
        note: 'Prepared itemized estimate for oil service + recommended front Brembo brake pads.',
        actor: 'Ananya Sharma (Service Advisor)'
      },
      {
        stage: 'awaiting_customer_approval',
        timestamp: '2026-11-01T11:15:00Z',
        note: 'Digital Inspection Report and estimate sent via portal and WhatsApp. Waiting for customer sign-off.',
        actor: 'Ananya Sharma (Service Advisor)'
      }
    ],
    assignedTechnician: 'Rajesh Nair',
    serviceAdvisor: 'Ananya Sharma',
    branch: 'Central Flagship Workshop (Bengaluru)',
    estimatedCompletion: 'Today, 04:30 PM (Pending pad approval)',
    internalNotes: [
      'Customer mentioned highway trip planned this weekend. Ensure tyre pressure calibrated to 33 PSI cold.',
      'Front brake pads are worn to 2.8mm. Squeak is from wear indicator acoustic tab touching rotor.'
    ],
    customerNotes: [
      'We have documented your front brake pad wear in the Digital Inspection Report. Please review the itemized cost before we proceed with pad installation.'
    ],
    inspectionReportId: 'dvi-84920',
    estimateId: 'est-84920',
    invoiceId: 'inv-84920',
    createdAt: '2026-10-30T10:15:00Z',
    updatedAt: '2026-11-01T11:15:00Z'
  }
];

export const INITIAL_INSPECTION_REPORTS: InspectionReport[] = [
  {
    id: 'dvi-84920',
    jobId: 'job-101',
    bookingRef: 'DC-84920',
    vehicleDetails: '2021 Honda City ZX (KA 03 MN 4821) · 38,400 km',
    completedAt: '2026-11-01T10:45:00Z',
    leadTechnician: 'Rajesh Nair',
    overallHealthScore: 84,
    items: [
      {
        id: 'dvi-item-1',
        system: 'Braking System',
        component: 'Front Brake Pads (Inner & Outer)',
        status: 'amber',
        finding: 'Brake friction pad thickness measured at 2.8 mm (Factory minimum is 2.0 mm). Wear indicator tab is beginning to contact rotor disc.',
        recommendation: 'Replace with Brembo low-dust ceramic pads. Rotor surface is healthy and does not need skimming.',
        estimatedCost: 2450,
        customerDecision: 'pending',
        imageUrl: 'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&q=80&w=600',
        reviewedBy: 'Vikram Singh'
      },
      {
        id: 'dvi-item-2',
        system: 'Powertrain & Engine',
        component: 'Synthetic Engine Oil & Filter',
        status: 'amber',
        finding: 'Oil darkened with 10,200 km elapsed since last service interval. Viscosity degradation noted.',
        recommendation: 'Full drain and refill with Motul 5W-30 Full Synthetic + OEM oil filter (Included in booked package).',
        estimatedCost: 1499,
        customerDecision: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600',
        reviewedBy: 'Rajesh Nair'
      },
      {
        id: 'dvi-item-3',
        system: 'Electrical & Ignition',
        component: '12V Cranking Battery Health',
        status: 'green',
        finding: 'Battery tested at 485 CCA out of 500 CCA rating (97% capacity). Alternator diode ripple healthy at 14.2V.',
        recommendation: 'Clean terminals and coat with anti-corrosion dielectric gel. No replacement needed.',
        customerDecision: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600',
        reviewedBy: 'Farhan Siddiqui'
      },
      {
        id: 'dvi-item-4',
        system: 'Suspension & Steering',
        component: 'Front Strut Mounts & Bushings',
        status: 'green',
        finding: 'Hydraulic dampers dry with zero fluid seepage. Ball joint rubber boots intact with zero lateral play.',
        recommendation: 'Clean under-chassis debris. Re-torque stabilizer link bolts to 42 Nm factory spec.',
        customerDecision: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600',
        reviewedBy: 'Vikram Singh'
      },
      {
        id: 'dvi-item-5',
        system: 'Climate Control',
        component: 'AC Cabin Pollen Filter',
        status: 'red',
        finding: 'Cabin filter heavily choked with road dust and leaves. Blower velocity reduced by 35%. Mild mildew odor detected.',
        recommendation: 'Replace with activated charcoal anti-allergen cabin filter and perform vent antibacterial fogging.',
        estimatedCost: 550,
        customerDecision: 'pending',
        imageUrl: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&q=80&w=600',
        reviewedBy: 'Rajesh Nair'
      }
    ],
    customerSummary: 'Your Honda City is in overall good mechanical health (Score: 84/100). The engine, transmission, and suspension are solid. We recommend approving the front brake pads (wear warning) and the cabin pollen filter for optimal safety and cabin air quality.'
  }
];

export const INITIAL_ESTIMATES: ServiceEstimate[] = [
  {
    id: 'est-84920',
    jobId: 'job-101',
    bookingRef: 'DC-84920',
    createdAt: '2026-11-01T11:00:00Z',
    validUntil: '2026-11-04T23:59:59Z',
    status: 'sent',
    items: [
      {
        id: 'est-line-1',
        description: 'Complete Care Periodic Service (Labor + 40-point DVI inspection)',
        category: 'labor',
        unitCost: 1499,
        quantity: 1,
        total: 1499,
        isMandatory: true,
        approvedByCustomer: true
      },
      {
        id: 'est-line-2',
        description: 'Motul 8100 5W-30 Full Synthetic Motor Oil (3.5 Liters)',
        category: 'parts',
        unitCost: 1500,
        quantity: 1,
        total: 1500,
        isMandatory: true,
        approvedByCustomer: true
      },
      {
        id: 'est-line-3',
        description: 'OEM Oil Filter Cartridge & Sump Washer',
        category: 'parts',
        unitCost: 420,
        quantity: 1,
        total: 420,
        isMandatory: true,
        approvedByCustomer: true
      },
      {
        id: 'est-line-4',
        description: 'Brembo Ceramic Front Brake Pads (Recommended - 2.8mm remaining)',
        category: 'parts',
        unitCost: 2450,
        quantity: 1,
        total: 2450,
        isMandatory: false,
        approvedByCustomer: false // Waiting for user click
      },
      {
        id: 'est-line-5',
        description: 'Brake Caliper Pad Replacement & Pin Lubrication Labor',
        category: 'labor',
        unitCost: 450,
        quantity: 1,
        total: 450,
        isMandatory: false,
        approvedByCustomer: false
      },
      {
        id: 'est-line-6',
        description: 'Activated Carbon Cabin AC Pollen Filter (Recommended - Clogged)',
        category: 'parts',
        unitCost: 550,
        quantity: 1,
        total: 550,
        isMandatory: false,
        approvedByCustomer: false
      }
    ],
    subtotal: 6869,
    gstAmount: 1236.42, // 18%
    discountAmount: 300, // Loyalty discount
    totalAmount: 7805.42,
    notes: 'Estimates are guaranteed against sudden inflation. Any unexpected component wear discovered during work will trigger an immediate photo alert for your authorization before work starts.'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-84920',
    invoiceNumber: 'INV-2026-08420',
    jobId: 'job-101',
    bookingRef: 'DC-84920',
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav.mehta@gmail.com',
    customerPhone: '+91-98450-11223',
    vehicle: '2021 Honda City ZX (KA 03 MN 4821)',
    issueDate: '2026-11-01',
    dueDate: '2026-11-01',
    items: [
      {
        description: 'Complete Care Periodic Service Labor',
        quantity: 1,
        unitPrice: 1499,
        total: 1499
      },
      {
        description: 'Motul 8100 5W-30 Full Synthetic Motor Oil (3.5L)',
        quantity: 1,
        unitPrice: 1500,
        total: 1500
      },
      {
        description: 'OEM Oil Filter Cartridge',
        quantity: 1,
        unitPrice: 420,
        total: 420
      }
    ],
    subtotal: 3419,
    tax: 615.42,
    total: 4034.42,
    status: 'unpaid'
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Kunal Deshmukh',
    vehicle: 'Volkswagen Vento 1.0 TSI',
    serviceCategory: 'Engine Diagnostics & Maintenance',
    rating: 5,
    date: '2026-10-22',
    comment: 'The digital inspection report with photos on my phone completely changed my view of mechanic workshops. They showed me exactly why my misfire was happening (bad ignition coil on cylinder 2) and quoted it clearly without adding fake extras. Extremely professional.',
    verified: true,
    branch: 'Bengaluru Central'
  },
  {
    id: 'rev-2',
    customerName: 'Sunita Rao',
    vehicle: 'Hyundai Creta Petrol',
    serviceCategory: 'Brake Service & AC Overhaul',
    rating: 5,
    date: '2026-10-14',
    comment: 'No mystery charges! DriveCraft sent me an estimate link with checkboxes to approve only what I wanted done. The AC is chilling at 5 degrees now and the brakes have zero squeal. Transparent pricing as promised.',
    verified: true,
    branch: 'Bengaluru Central'
  },
  {
    id: 'rev-3',
    customerName: 'Arjun Nambiar',
    vehicle: 'BMW 320d F30',
    serviceCategory: 'Suspension & Steering Overhaul',
    rating: 5,
    date: '2026-09-28',
    comment: 'Dealership quoted an astronomical price to replace the entire steering rack. Rajesh at DriveCraft diagnosed it down to a worn tie rod end and inner ball joint. Saved me over ₹65,000 with genuine OEM parts. Car drives on rails again.',
    verified: true,
    branch: 'Bengaluru Central'
  },
  {
    id: 'rev-4',
    customerName: 'Ritu Varma',
    vehicle: 'Tata Nexon EV Max',
    serviceCategory: 'Hybrid & EV Systems Check',
    rating: 5,
    date: '2026-09-18',
    comment: 'Finding a workshop with certified high-voltage technicians who actually understand EV thermal loops and cell balancing is rare. Great diagnostic report and super friendly service advisors.',
    verified: true,
    branch: 'Bengaluru Central'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'signs-your-car-needs-immediate-service',
    title: '5 Warning Signs Your Vehicle Needs Immediate Mechanic Attention',
    category: 'Preventative Care',
    readTime: '4 min read',
    date: 'Oct 28, 2026',
    author: 'Rajesh Nair',
    authorRole: 'Master Diagnostic Technician',
    excerpt: 'Ignoring subtle vehicle symptoms often turns a ₹500 seal repair into a ₹50,000 engine overhaul. Here are the top red flags every driver should recognize.',
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800',
    content: [
      'Modern vehicles are engineered with tightly interconnected mechanical and electronic systems. When a minor component starts failing, the engine control unit (ECU) often compensates quietly, masking the issue until permanent wear occurs.',
      '1. High-pitched squeal or metallic grinding when braking: This indicates your brake pads have reached their acoustic wear tabs. Continuing to drive will score your brake rotor discs, requiring costly rotor replacement.',
      '2. Flashing Check Engine Light: A steady amber check engine light signals a stored emission fault, but a flashing light means an active engine misfire is occurring, which can destroy the catalytic converter within minutes from unburned fuel.',
      '3. Sweet maple-like syrup smell inside the cabin: A sweet smell usually indicates an ethylene glycol coolant leak from the heater core or radiator hose. Coolant starvation can cause head gasket failure and engine seizure.',
      '4. Off-center steering wheel or persistent drift: Driving with misaligned wheels wears down your tire tread unevenly within 2,000 kilometers and strains wheel bearings.',
      '5. Delay when shifting gears: In automatic transmissions, hesitation or a sudden jolt into gear indicates degraded transmission fluid or slipping solenoid valves.'
    ],
    keyTakeaways: [
      'Never drive if the Check Engine Light is blinking actively.',
      'Metallic brake grinding means you are chewing through your brake disc rotors.',
      'Catching coolant leaks early prevents catastrophic cylinder head warping.'
    ],
    relatedServiceSlug: 'engine-diagnostics'
  },
  {
    id: 'blog-2',
    slug: 'understanding-digital-vehicle-inspections',
    title: 'How Digital Vehicle Inspection (DVI) Reports Protect You from Overcharging',
    category: 'Transparency & Pricing',
    readTime: '5 min read',
    date: 'Oct 15, 2026',
    author: 'Ananya Sharma',
    authorRole: 'Lead Service Advisor',
    excerpt: 'Traditional repair shops hand you a vague handwritten bill with "suspension overhaul". See how modern photo-backed digital inspection reports keep you in control.',
    imageUrl: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&q=80&w=800',
    content: [
      'For decades, visiting an auto mechanic came with anxiety: how do you know the parts they recommended are actually worn out?',
      'At DriveCraft, we pioneered the Digital Vehicle Inspection (DVI) workflow. While your car is on the hydraulic lift, our technicians document findings using high-resolution macro photography and micrometer measurements.',
      'Every item is categorized into a clear traffic light system: Green means healthy within scope; Amber means monitor or plan for next service; Red means critical safety concern requiring timely attention.',
      'The best part is customer authorization: you receive an interactive link on your mobile phone where you can review technician photos, read plain-English explanations, and tick checkboxes to approve or decline individual items before a wrench touches your car.'
    ],
    keyTakeaways: [
      'Digital inspection reports provide transparent visual proof with photos.',
      'Green/Amber/Red traffic lights distinguish urgent repairs from optional maintenance.',
      'You only pay for repairs you explicitly authorize in writing.'
    ],
    relatedServiceSlug: 'car-servicing'
  },
  {
    id: 'blog-3',
    slug: 'guide-to-synthetic-engine-oil',
    title: 'Mineral vs Synthetic Oil: What Does Your Engine Really Need?',
    category: 'Maintenance Science',
    readTime: '6 min read',
    date: 'Oct 02, 2026',
    author: 'Rajesh Nair',
    authorRole: 'Master Diagnostic Technician',
    excerpt: 'Discover why synthetic oils resist thermal breakdown in high-heat stop-and-go traffic and how choosing the correct viscosity protects turbochargers.',
    imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=800',
    content: [
      'Motor oil is the lifeblood of your engine. It lubricates moving pistons, carries away scorching combustion heat, prevents acid sludge formation, and maintains oil pressure across hydraulic lifters and variable valve timing (VVT) camshafts.',
      'While conventional mineral oil is refined directly from crude petroleum, full synthetic oils are synthesized molecularly from uniform hydrocarbon chains. This provides superior resistance to shear breakdown under extreme temperatures.',
      'If your car has a modern turbocharged direct-injection engine (such as TSI, EcoBoost, Turbo-GDi), synthetic oil is non-negotiable. Turbochargers spin at over 150,000 RPM and reach temperatures exceeding 900°C; mineral oils cook and form carbon coking in turbo feed lines.'
    ],
    keyTakeaways: [
      'Turbocharged engines strictly require API-SP or ILSAC GF-6 full synthetic oils.',
      'Synthetic oils maintain lubricating film strength across extreme heat cycles.',
      'Always replace the oil filter whenever fresh oil is poured.'
    ],
    relatedServiceSlug: 'car-servicing'
  }
];
