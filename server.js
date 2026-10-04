import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve built static frontend files in production
app.use(express.static(path.join(__dirname, 'dist')));

// In-Memory Database with 24+ Rich Datasets across Properties, Bachelors, Bikes, and Cars
let properties = [
  // --- 1. VILLAS ---
  {
    id: "prop-101",
    title: "Prestige Cyber Towers - Sky Villa",
    type: "buy",
    category: "Villa",
    subType: "Full House",
    bhk: "3 BHK",
    price: 18500000, // ₹ 1.85 Cr
    priceFormatted: "₹ 1.85 Cr",
    rentPrice: null,
    area: 2450,
    superBuiltArea: 2900,
    unitCount: 120,
    floorNumber: "14th of 24 Floors",
    furnishing: "Furnished",
    petPolicy: "Allowed",
    leaseType: "Long-term",
    facing: "East",
    status: "Ready to Move",
    isBuilderProject: true,
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    address: "100 Feet Road, Indiranagar, Bangalore, KA 560038",
    description: "Ultra-luxury 3 BHK Sky Villa with private terrace garden, smart home automation, high-end Italian marble flooring, and uninterrupted views of Indiranagar skyline.",
    amenities: ["24/7 Power Backup", "Covered Parking", "Multi-tier Security", "Swimming Pool", "Clubhouse", "Gym", "EV Charging", "Balcony", "Lift"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Indiranagar Apex Brokers", agentName: "Vikram Malhotra", phone: "+91 98450 11223", email: "v.malhotra@leninbrokerage.in", license: "RERA/KA/BANGALORE/2024/0991", locality: "Indiranagar" },
    ownerInfo: { name: "Rajesh Kumar Sharma", phone: "+91 98765 43210", email: "rajesh.sharma.properties@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },

  // --- 2. APARTMENTS ---
  {
    id: "prop-102",
    title: "Sobha Silicon Oasis Luxury Residency",
    type: "buy",
    category: "Apartment",
    subType: "Full House",
    bhk: "2 BHK",
    price: 9200000, // ₹ 92 Lakhs
    priceFormatted: "₹ 92 Lakhs",
    rentPrice: null,
    area: 1350,
    superBuiltArea: 1600,
    unitCount: 340,
    floorNumber: "8th of 18 Floors",
    furnishing: "Semi-furnished",
    petPolicy: "Allowed",
    leaseType: "Long-term",
    facing: "North-East",
    status: "Ready to Move",
    isBuilderProject: false,
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Whitefield",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    address: "ITPL Main Road, Whitefield, Bangalore, KA 560066",
    description: "Premium 2 BHK apartment near ITPL tech parks. Features modular kitchen, wooden flooring in master bedroom, and premium bathroom fittings.",
    amenities: ["Power Backup", "Covered Parking", "Multi-tier Security", "Gym", "Balcony", "Lift"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Whitefield Tech Realty", agentName: "Ananya Rao", phone: "+91 97411 88990", email: "a.rao@leninbrokerage.in", license: "RERA/KA/WHITEFIELD/2024/0442", locality: "Whitefield" },
    ownerInfo: { name: "Suresh Menon", phone: "+91 99801 12345", email: "suresh.menon@techmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },

  // --- 3. FLATS ---
  {
    id: "prop-103",
    title: "Hiranandani Gardens Heritage Flat",
    type: "buy",
    category: "Flat",
    subType: "Full House",
    bhk: "4 BHK",
    price: 34000000, // ₹ 3.40 Cr
    priceFormatted: "₹ 3.40 Cr",
    rentPrice: null,
    area: 3100,
    superBuiltArea: 3700,
    unitCount: 88,
    floorNumber: "22nd of 28 Floors",
    furnishing: "Furnished",
    petPolicy: "Allowed",
    leaseType: "Long-term",
    facing: "Sea View / North",
    status: "Ready to Move",
    isBuilderProject: true,
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: false,
    locality: "Powai",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    address: "Central Avenue, Hiranandani Gardens, Powai, Mumbai, MH 400076",
    description: "Palatial 4 BHK flat overlooking Powai Lake. Includes maid room, 3 covered car parkings, and exclusive access to Club House & Tennis Courts.",
    amenities: ["Power Backup", "Covered Parking", "Multi-tier Security", "Swimming Pool", "Clubhouse", "Gym", "Balcony", "Lift"],
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Powai Prime Real Estate", agentName: "Karan Johar", phone: "+91 98200 44556", email: "karan.j@powairealty.com", license: "RERA/MH/POWAI/2023/8890", locality: "Powai" },
    ownerInfo: { name: "Dr. Arvind Kulkarni", phone: "+91 98199 87654", email: "arvind.kulkarni@mednet.org", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },

  // --- 4. LAND / PLOT ---
  {
    id: "prop-106",
    title: "Greenwood Enclave Prime Residential Plot",
    type: "buy",
    category: "Land / Plot",
    subType: "Land/Plot",
    bhk: "4+ BHK",
    price: 12500000, // ₹ 1.25 Cr
    priceFormatted: "₹ 1.25 Cr",
    rentPrice: null,
    area: 4000,
    superBuiltArea: 4000,
    unitCount: 1,
    floorNumber: "Plot N/A",
    furnishing: "Unfurnished",
    petPolicy: "Allowed",
    leaseType: "Long-term",
    facing: "East Facing Plot",
    status: "New Launch",
    isBuilderProject: true,
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    address: "4th Block, Koramangala, Bangalore, KA 560034",
    description: "4000 sq.ft BBMP A-Khata clear title residential plot in heart of Koramangala. Ideal for constructing custom luxury villa.",
    amenities: ["Gated Security", "Underground Electric Cabling", "Wide 40ft Asphalt Road"],
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Koramangala Land Experts", agentName: "Deepak Hegde", phone: "+91 98800 77665", email: "d.hegde@landexperts.in", license: "RERA/KA/KORA/2023/3312", locality: "Koramangala" },
    ownerInfo: { name: "B. N. Viswanathan", phone: "+91 94480 33221", email: "viswa.bn@outlook.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },

  // --- 5. FOR BACHELORS SECTION (20 FULL LISTINGS FOR MALE & FEMALE OCCUPANCY) ---
  {
    id: "bach-201",
    title: "Indiranagar Executive Male PG & 1 BHK Rooms",
    type: "rent",
    category: "Bachelors",
    subType: "PG",
    gender: "Male",
    bhk: "1 BHK",
    price: 12000,
    rentPrice: 12000,
    priceFormatted: "₹ 12,000 / mo",
    area: 350,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Short-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    hostelPgName: "Indiranagar Executive Male PG",
    address: "12th Main Road, Indiranagar, Bangalore, KA 560038",
    description: "Premium Male PG & private 1 BHK room share with high speed 300Mbps Wi-Fi, daily housekeeping, 3 times meals, and biometric access.",
    amenities: ["Wi-Fi", "Daily Meals", "Power Backup", "Washing Machine", "Gated Security", "CCTV"],
    images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Lenin Bachelors Desk", agentName: "Rohan Das", phone: "+91 98760 11223", email: "bachelors@lenintech.com", license: "RERA/LT/BACH/2026", locality: "Indiranagar" },
    ownerInfo: { name: "Anand Verma", phone: "+91 98451 99887", email: "anand.verma.pg@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-202",
    title: "Koramangala Female Luxury PG & 2 BHK Flatshare",
    type: "rent",
    category: "Bachelors",
    subType: "Hostel",
    gender: "Female",
    bhk: "2 BHK",
    price: 14500,
    rentPrice: 14500,
    priceFormatted: "₹ 14,500 / mo",
    area: 950,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    hostelPgName: "Koramangala Blossom Female Hostel",
    address: "5th Block, Koramangala, Bangalore, KA 560095",
    description: "Ultra-safe Gated Female PG and 2 BHK flatshare for working women and students. Features 24/7 security guard, biometric entry, and attached bath.",
    amenities: ["Wi-Fi", "Attached Bath", "Power Backup", "Gated Security", "Gym Access", "Balcony"],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Lenin Bachelors Desk", agentName: "Aditi Roy", phone: "+91 98760 44556", email: "female.pg@lenintech.com", license: "RERA/LT/BACH/2026", locality: "Koramangala" },
    ownerInfo: { name: "Sunita Reddy", phone: "+91 99802 33441", email: "sunita.reddy@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-203",
    title: "Whitefield Co-ed Smart 3 BHK Flatshare",
    type: "rent",
    category: "Bachelors",
    subType: "3 BHK",
    gender: "Co-ed",
    bhk: "3 BHK",
    price: 16000,
    rentPrice: 16000,
    priceFormatted: "₹ 16,000 / mo",
    area: 1650,
    furnishing: "Furnished",
    petPolicy: "Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Whitefield",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    hostelPgName: "ITPL Techie Flatshare",
    address: "ITPL Main Road, Whitefield, Bangalore, KA 560066",
    description: "Fully furnished 3 BHK co-ed flatshare near ITPL. Private bedroom with attached balcony, smart TV, washing machine, and cook option.",
    amenities: ["Wi-Fi", "Power Backup", "Balcony", "Covered Parking", "Lift", "Gym"],
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Whitefield Tech Realty", agentName: "Ananya Rao", phone: "+91 97411 88990", email: "a.rao@leninbrokerage.in", license: "RERA/KA/WHITEFIELD/2024/0442", locality: "Whitefield" },
    ownerInfo: { name: "Manish Joshi", phone: "+91 98451 22334", email: "m.joshi@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-204",
    title: "HSR Layout Elite Male Hostel & 2 BHK Stay",
    type: "rent",
    category: "Bachelors",
    subType: "Hostel",
    gender: "Male",
    bhk: "2 BHK",
    price: 13000,
    rentPrice: 13000,
    priceFormatted: "₹ 13,000 / mo",
    area: 850,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Short-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "HSR Layout",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    hostelPgName: "HSR Elite Boys Hostel",
    address: "Sector 1, HSR Layout, Bangalore, KA 560102",
    description: "High quality male hostel & 2 BHK shared living space with gaming lounge, high speed fiber wifi, and weekly laundry service.",
    amenities: ["Gaming Lounge", "Wi-Fi", "Laundry Service", "Power Backup", "CCTV Security"],
    images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "HSR Bachelors Hub", agentName: "Vijay Kumar", phone: "+91 98440 22334", email: "hsr@lenintech.com", license: "RERA/KA/HSR/2026", locality: "HSR Layout" },
    ownerInfo: { name: "Siddharth Rao", phone: "+91 98800 44551", email: "sid.rao@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-205",
    title: "Cyber City Gurgaon Female PG & 1 BHK Studio",
    type: "rent",
    category: "Bachelors",
    subType: "PG",
    gender: "Female",
    bhk: "1 BHK",
    price: 18000,
    rentPrice: 18000,
    priceFormatted: "₹ 18,000 / mo",
    area: 450,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Cyber City",
    city: "Gurugram",
    state: "Delhi NCR",
    country: "India",
    hostelPgName: "Cyber Nest Female PG",
    address: "DLF Phase 3, Cyber City, Gurugram, HR 122002",
    description: "Luxury female PG studio & 1 BHK flatlet walking distance from Cyber Hub. Features 3-tier security, power backup, and food service.",
    amenities: ["Walking to Cyber Hub", "3-Tier Security", "Food Service", "Wi-Fi", "AC"],
    images: ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Gurugram Prime Desk", agentName: "Pooja Malhotra", phone: "+91 99100 88776", email: "gurgaon@lenintech.com", license: "RERA/HR/GUR/2026", locality: "Cyber City" },
    ownerInfo: { name: "Neelam Sharma", phone: "+91 98100 99881", email: "neelam.sharma@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-206",
    title: "Bandra West Co-ed Luxury 3 BHK Shared Suite",
    type: "rent",
    category: "Bachelors",
    subType: "3 BHK",
    gender: "Co-ed",
    bhk: "3 BHK",
    price: 25000,
    rentPrice: 25000,
    priceFormatted: "₹ 25,000 / mo",
    area: 1750,
    furnishing: "Furnished",
    petPolicy: "Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    hostelPgName: "Bandra Bayview Co-ed Suite",
    address: "Hill Road, Bandra West, Mumbai, MH 400050",
    description: "Sea-facing luxury 3 BHK co-ed flatshare in prime Bandra West. Modern modular kitchen, sea breeze balconies, and housekeeping included.",
    amenities: ["Sea View", "Housekeeping", "Wi-Fi", "Power Backup", "Gym Access"],
    images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Powai Prime Real Estate", agentName: "Karan Johar", phone: "+91 98200 44556", email: "karan.j@powairealty.com", license: "RERA/MH/POWAI/2023/8890", locality: "Bandra West" },
    ownerInfo: { name: "Vikram Saxena", phone: "+91 98200 55443", email: "vikram.saxena@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-207",
    title: "Powai Lake View Male 2 BHK Bachelor Flatshare",
    type: "rent",
    category: "Bachelors",
    subType: "2 BHK",
    gender: "Male",
    bhk: "2 BHK",
    price: 21000,
    rentPrice: 21000,
    priceFormatted: "₹ 21,000 / mo",
    area: 1100,
    furnishing: "Furnished",
    petPolicy: "Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Powai",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    hostelPgName: "Powai Lakeview Male Flatshare",
    address: "Central Avenue, Powai, Mumbai, MH 400076",
    description: "Lakeview 2 BHK male flatshare in Hiranandani Powai. High speed wifi, AC in both bedrooms, daily cleaning, and swimming pool access.",
    amenities: ["Lake View", "Swimming Pool", "AC Bedrooms", "Wi-Fi", "Daily Cleaning"],
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Powai Prime Real Estate", agentName: "Karan Johar", phone: "+91 98200 44556", email: "karan.j@powairealty.com", license: "RERA/MH/POWAI/2023/8890", locality: "Powai" },
    ownerInfo: { name: "Rajesh Kulkarni", phone: "+91 98199 44332", email: "rajesh.kulkarni@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-208",
    title: "Andheri West Female PG & 1 BHK Room Share",
    type: "rent",
    category: "Bachelors",
    subType: "PG",
    gender: "Female",
    bhk: "1 BHK",
    price: 19500,
    rentPrice: 19500,
    priceFormatted: "₹ 19,500 / mo",
    area: 400,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Short-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    hostelPgName: "Andheri Orchid Female PG",
    address: "Lokhandwala Complex, Andheri West, Mumbai, MH 400053",
    description: "Gated female PG & 1 BHK room share in Lokhandwala. 3 meals daily, AC, biometric security, and walking distance to metro station.",
    amenities: ["Metro Access", "Daily 3 Meals", "Biometric Entry", "AC", "Wi-Fi"],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Powai Prime Real Estate", agentName: "Karan Johar", phone: "+91 98200 44556", email: "karan.j@powairealty.com", license: "RERA/MH/POWAI/2023/8890", locality: "Andheri West" },
    ownerInfo: { name: "Priya Merchant", phone: "+91 98201 99887", email: "priya.m@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-209",
    title: "Gachibowli HITEC City Male 3 BHK Flatshare",
    type: "rent",
    category: "Bachelors",
    subType: "3 BHK",
    gender: "Male",
    bhk: "3 BHK",
    price: 15000,
    rentPrice: 15000,
    priceFormatted: "₹ 15,000 / mo",
    area: 1600,
    furnishing: "Furnished",
    petPolicy: "Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Gachibowli",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    hostelPgName: "Gachibowli Techie Male Stay",
    address: "Financial District, Gachibowli, Hyderabad, TS 500032",
    description: "Modern 3 BHK male flatshare next to Financial District tech offices. Equipped with fiber internet, cook on request, and gym access.",
    amenities: ["Financial District Access", "Wi-Fi", "Cook Option", "Gym", "Power Backup"],
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Lenin Cyber Realtors", agentName: "Srinivas Reddy", phone: "+91 94400 55667", email: "srinivas@cyberrealtors.in", license: "RERA/TS/HYD/2026", locality: "Gachibowli" },
    ownerInfo: { name: "Venkatesh Rao", phone: "+91 98490 11223", email: "venkat.rao@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-210",
    title: "Jubilee Hills Female Luxury Hostel & 2 BHK",
    type: "rent",
    category: "Bachelors",
    subType: "Hostel",
    gender: "Female",
    bhk: "2 BHK",
    price: 17500,
    rentPrice: 17500,
    priceFormatted: "₹ 17,500 / mo",
    area: 1000,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    hostelPgName: "Jubilee Hills Empress Hostel",
    address: "Road No. 36, Jubilee Hills, Hyderabad, TS 500033",
    description: "Exclusive female hostel & 2 BHK flatlet in posh Jubilee Hills. Gated community security, organic vegetarian meals, and power backup.",
    amenities: ["Gated Security", "Veg Meals", "Power Backup", "Wi-Fi", "Balcony"],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Lenin Cyber Realtors", agentName: "Srinivas Reddy", phone: "+91 94400 55667", email: "srinivas@cyberrealtors.in", license: "RERA/TS/HYD/2026", locality: "Jubilee Hills" },
    ownerInfo: { name: "K. Kavitha", phone: "+91 98491 55443", email: "kavitha.k@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-211",
    title: "Baner Pune Techie Co-ed 1 BHK PG Studio",
    type: "rent",
    category: "Bachelors",
    subType: "PG",
    gender: "Co-ed",
    bhk: "1 BHK",
    price: 11500,
    rentPrice: 11500,
    priceFormatted: "₹ 11,500 / mo",
    area: 400,
    furnishing: "Furnished",
    petPolicy: "Allowed",
    leaseType: "Short-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Baner",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    hostelPgName: "Baner Smart Studio PG",
    address: "Baner Road, Pune, MH 411045",
    description: "Co-ed smart studio PG & 1 BHK room share in Baner. High speed wifi, working desk, breakfast included, and laundry room.",
    amenities: ["Work Desk", "Breakfast Included", "Wi-Fi", "Laundry Room", "Power Backup"],
    images: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Pune Apex Realtors", agentName: "Manoj Kulkarni", phone: "+91 98220 33445", email: "pune@lenintech.com", license: "RERA/MH/PUNE/2026", locality: "Baner" },
    ownerInfo: { name: "Sanjay Deshmukh", phone: "+91 98221 66778", email: "sanjay.d@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-212",
    title: "Viman Nagar Male 2 BHK Shared Apartment",
    type: "rent",
    category: "Bachelors",
    subType: "2 BHK",
    gender: "Male",
    bhk: "2 BHK",
    price: 13500,
    rentPrice: 13500,
    priceFormatted: "₹ 13,500 / mo",
    area: 900,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Viman Nagar",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    hostelPgName: "Viman Nagar Male Flatshare",
    address: "Symbiosis Road, Viman Nagar, Pune, MH 411014",
    description: "Male 2 BHK flatshare near Symbiosis College and IT parks. Fully furnished with sofa, TV, fridge, and covered bike parking.",
    amenities: ["Symbiosis Nearby", "Furnished Sofa/TV", "Bike Parking", "Wi-Fi", "Security"],
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Pune Apex Realtors", agentName: "Manoj Kulkarni", phone: "+91 98220 33445", email: "pune@lenintech.com", license: "RERA/MH/PUNE/2026", locality: "Viman Nagar" },
    ownerInfo: { name: "Rahul Shinde", phone: "+91 98222 11990", email: "rahul.shinde@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-213",
    title: "Velachery Chennai Female PG & 1 BHK Flatlet",
    type: "rent",
    category: "Bachelors",
    subType: "PG",
    gender: "Female",
    bhk: "1 BHK",
    price: 10500,
    rentPrice: 10500,
    priceFormatted: "₹ 10,500 / mo",
    area: 380,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Short-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Velachery",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    hostelPgName: "Velachery Lotus Female PG",
    address: "100 Feet Bypass Road, Velachery, Chennai, TN 600042",
    description: "Safe & budget friendly female PG studio & 1 BHK room share. South Indian home meals, 24/7 security guard, and power backup.",
    amenities: ["Home Meals", "24/7 Security Guard", "Power Backup", "Wi-Fi", "RO Water"],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Chennai Prime Realtors", agentName: "Karthik Subramanian", phone: "+91 98400 66778", email: "chennai@lenintech.com", license: "RERA/TN/CHN/2026", locality: "Velachery" },
    ownerInfo: { name: "Lakshmi Narayanan", phone: "+91 98401 22334", email: "lakshmi.n@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-214",
    title: "OMR IT Corridor Male 3 BHK Shared Suite",
    type: "rent",
    category: "Bachelors",
    subType: "3 BHK",
    gender: "Male",
    bhk: "3 BHK",
    price: 12500,
    rentPrice: 12500,
    priceFormatted: "₹ 12,500 / mo",
    area: 1500,
    furnishing: "Furnished",
    petPolicy: "Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "OMR",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    hostelPgName: "OMR Tech Male Suite",
    address: "Old Mahabalipuram Road, Perungudi, Chennai, TN 600096",
    description: "Fully furnished male 3 BHK flatshare on OMR tech corridor. Swimming pool, gym, washing machine, and high speed wifi included.",
    amenities: ["OMR Tech Corridor", "Swimming Pool", "Gym", "Wi-Fi", "Washing Machine"],
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Chennai Prime Realtors", agentName: "Karthik Subramanian", phone: "+91 98400 66778", email: "chennai@lenintech.com", license: "RERA/TN/CHN/2026", locality: "OMR" },
    ownerInfo: { name: "M. Ramanathan", phone: "+91 98402 55443", email: "m.rama@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-215",
    title: "Electronic City Male PG & 1 BHK Techie Hub",
    type: "rent",
    category: "Bachelors",
    subType: "PG",
    gender: "Male",
    bhk: "1 BHK",
    price: 9800,
    rentPrice: 9800,
    priceFormatted: "₹ 9,800 / mo",
    area: 320,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Short-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Electronic City",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    hostelPgName: "E-City Techie Boys PG",
    address: "Phase 1, Electronic City, Bangalore, KA 560100",
    description: "Budget male PG & 1 BHK room share near Infosys & Wipro campuses. 3 meals daily, daily room cleaning, and high speed wifi.",
    amenities: ["Near Infosys/Wipro", "Daily Meals", "Housekeeping", "Wi-Fi", "CCTV"],
    images: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Lenin Bachelors Desk", agentName: "Rohan Das", phone: "+91 98760 11223", email: "bachelors@lenintech.com", license: "RERA/LT/BACH/2026", locality: "Electronic City" },
    ownerInfo: { name: "Girish Gowda", phone: "+91 98452 77665", email: "girish.gowda@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-216",
    title: "JP Nagar Female Premium Hostel & 2 BHK Stay",
    type: "rent",
    category: "Bachelors",
    subType: "Hostel",
    gender: "Female",
    bhk: "2 BHK",
    price: 13800,
    rentPrice: 13800,
    priceFormatted: "₹ 13,800 / mo",
    area: 920,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "JP Nagar",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    hostelPgName: "JP Nagar Orchid Female Hostel",
    address: "6th Phase, JP Nagar, Bangalore, KA 560078",
    description: "Gated female hostel & 2 BHK flatshare in JP Nagar. Biometric access, power backup, attached bath, and quiet green residential area.",
    amenities: ["Biometric Access", "Attached Bath", "Power Backup", "Green Surroundings", "Wi-Fi"],
    images: ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Lenin Bachelors Desk", agentName: "Aditi Roy", phone: "+91 98760 44556", email: "female.pg@lenintech.com", license: "RERA/LT/BACH/2026", locality: "JP Nagar" },
    ownerInfo: { name: "Shalini Urs", phone: "+91 99803 11223", email: "shalini.urs@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-217",
    title: "Golf Course Road Gurgaon Male 3 BHK Flatshare",
    type: "rent",
    category: "Bachelors",
    subType: "3 BHK",
    gender: "Male",
    bhk: "3 BHK",
    price: 22000,
    rentPrice: 22000,
    priceFormatted: "₹ 22,000 / mo",
    area: 1800,
    furnishing: "Furnished",
    petPolicy: "Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Golf Course Road",
    city: "Gurugram",
    state: "Delhi NCR",
    country: "India",
    hostelPgName: "Golf Course Premium Male Flatshare",
    address: "Sector 54, Golf Course Road, Gurugram, HR 122002",
    description: "Ultra-luxury 3 BHK male flatshare on Golf Course Road. Modern interior, club house access, underground parking, and metro station nearby.",
    amenities: ["Golf Course View", "Clubhouse Access", "Metro Access", "Wi-Fi", "Underground Parking"],
    images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Gurugram Prime Desk", agentName: "Pooja Malhotra", phone: "+91 99100 88776", email: "gurgaon@lenintech.com", license: "RERA/HR/GUR/2026", locality: "Golf Course Road" },
    ownerInfo: { name: "Kapil Dev Sharma", phone: "+91 98102 33221", email: "kapil.sharma@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-218",
    title: "Thane West Female PG & 1 BHK Suite",
    type: "rent",
    category: "Bachelors",
    subType: "PG",
    gender: "Female",
    bhk: "1 BHK",
    price: 14000,
    rentPrice: 14000,
    priceFormatted: "₹ 14,000 / mo",
    area: 420,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Short-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Thane",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    hostelPgName: "Thane Blossom Female PG",
    address: "Ghopbunder Road, Thane West, Mumbai, MH 400607",
    description: "Safe & serene female PG studio & 1 BHK stay in Thane West. Includes 3 meals, daily cleaning, high speed wifi, and 24/7 security guard.",
    amenities: ["3 Meals Daily", "Wi-Fi", "Daily Cleaning", "24/7 Security", "RO Water"],
    images: ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Powai Prime Real Estate", agentName: "Karan Johar", phone: "+91 98200 44556", email: "karan.j@powairealty.com", license: "RERA/MH/POWAI/2023/8890", locality: "Thane" },
    ownerInfo: { name: "Sunita Kadam", phone: "+91 98203 44551", email: "sunita.kadam@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-219",
    title: "Kondapur Hyderabad Co-ed 2 BHK Flatshare",
    type: "rent",
    category: "Bachelors",
    subType: "2 BHK",
    gender: "Co-ed",
    bhk: "2 BHK",
    price: 14200,
    rentPrice: 14200,
    priceFormatted: "₹ 14,200 / mo",
    area: 1050,
    furnishing: "Furnished",
    petPolicy: "Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Kondapur",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    hostelPgName: "Kondapur Techie Flatshare",
    address: "Botanic Garden Road, Kondapur, Hyderabad, TS 500084",
    description: "Furnished 2 BHK co-ed flatshare near Botanical Garden & HITEC City. High speed wifi, washing machine, fridge, and cook facility.",
    amenities: ["Botanical Garden View", "Cook Facility", "Wi-Fi", "Washing Machine", "Power Backup"],
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Lenin Cyber Realtors", agentName: "Srinivas Reddy", phone: "+91 94400 55667", email: "srinivas@cyberrealtors.in", license: "RERA/TS/HYD/2026", locality: "Kondapur" },
    ownerInfo: { name: "N. Raghuveer", phone: "+91 98492 66778", email: "raghu.n@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-220",
    title: "Wakad Pune Female Hostel & 3 BHK Living",
    type: "rent",
    category: "Bachelors",
    subType: "Hostel",
    gender: "Female",
    bhk: "3 BHK",
    price: 12000,
    rentPrice: 12000,
    priceFormatted: "₹ 12,000 / mo",
    area: 1400,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Wakad",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    hostelPgName: "Wakad Grace Female Hostel",
    address: "Datta Mandir Road, Wakad, Pune, MH 411057",
    description: "Gated female hostel & 3 BHK flatshare near Hinjewadi IT Park Phase 1. 24/7 security guard, daily meals, wifi, and shuttle bus access.",
    amenities: ["Hinjewadi IT Park Access", "Daily Meals", "Biometric Entry", "Shuttle Bus", "Wi-Fi"],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80"],
    assignedBroker: { name: "Pune Apex Realtors", agentName: "Manoj Kulkarni", phone: "+91 98220 33445", email: "pune@lenintech.com", license: "RERA/MH/PUNE/2026", locality: "Wakad" },
    ownerInfo: { name: "Pratibha Patil", phone: "+91 98223 88990", email: "pratibha.patil@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-204",
    title: "HSR Layout Elite Male Hostel & 2 BHK Stay",
    type: "rent",
    category: "Bachelors",
    subType: "Hostel",
    gender: "Male",
    bhk: "2 BHK",
    price: 13000,
    rentPrice: 13000,
    priceFormatted: "₹ 13,000 / mo",
    area: 850,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Short-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "HSR Layout",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    hostelPgName: "HSR Elite Boys Hostel",
    address: "Sector 1, HSR Layout, Bangalore, KA 560102",
    description: "High quality male hostel & 2 BHK shared living space with gaming lounge, high speed fiber wifi, and weekly laundry service.",
    amenities: ["Gaming Lounge", "Wi-Fi", "Laundry Service", "Power Backup", "CCTV Security"],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "HSR Bachelors Hub", agentName: "Vijay Kumar", phone: "+91 98440 22334", email: "hsr@lenintech.com", license: "RERA/KA/HSR/2026", locality: "HSR Layout" },
    ownerInfo: { name: "Siddharth Rao", phone: "+91 98800 44551", email: "sid.rao@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bach-205",
    title: "Cyber City Gurgaon Female PG & 1 BHK Studio",
    type: "rent",
    category: "Bachelors",
    subType: "PG",
    gender: "Female",
    bhk: "1 BHK",
    price: 18000,
    rentPrice: 18000,
    priceFormatted: "₹ 18,000 / mo",
    area: 450,
    furnishing: "Furnished",
    petPolicy: "Not Allowed",
    leaseType: "Long-term",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Cyber City",
    city: "Gurugram",
    state: "Delhi NCR",
    country: "India",
    hostelPgName: "Cyber Nest Female PG",
    address: "DLF Phase 3, Cyber City, Gurugram, HR 122002",
    description: "Luxury female PG studio & 1 BHK flatlet walking distance from Cyber Hub. Features 3-tier security, power backup, and food service.",
    amenities: ["Walking to Cyber Hub", "3-Tier Security", "Food Service", "Wi-Fi", "AC"],
    images: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Gurugram Prime Desk", agentName: "Pooja Malhotra", phone: "+91 99100 88776", email: "gurgaon@lenintech.com", license: "RERA/HR/GUR/2026", locality: "Cyber City" },
    ownerInfo: { name: "Neelam Sharma", phone: "+91 98100 99881", email: "neelam.sharma@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },

  // --- 6. BIKES SECTION (BUY, RENT, SELL) ---
  {
    id: "bike-301",
    title: "Royal Enfield Hunter 350 Dapper Ash",
    type: "buy",
    category: "Bikes",
    subType: "Cruiser",
    bhk: "350 cc",
    price: 175000, // ₹ 1.75 Lakhs
    rentPrice: 900,
    priceFormatted: "₹ 1.75 Lakhs (Rent: ₹900/day)",
    area: 350,
    kmsDriven: "4,500 km",
    fuelType: "Petrol",
    furnishing: "Excellent Condition",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    address: "Indiranagar 100ft Road, Bangalore",
    description: "Mint condition 2023 Royal Enfield Hunter 350. Single owner, regular company service history, ceramic coating, helmet included.",
    amenities: ["Single Owner", "Company Service", "Dual Channel ABS", "Helmet Included", "EV/Petrol"],
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Lenin Motors Intermediary", agentName: "Karthik Raja", phone: "+91 98800 11990", email: "bikes@lenintech.com", license: "RTA/KA/0991", locality: "Indiranagar" },
    ownerInfo: { name: "Abhishek Roy", phone: "+91 98450 66778", email: "abhishek.roy@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bike-302",
    title: "Ather 450X Gen 3 Electric Scooter",
    type: "rent",
    category: "Bikes",
    subType: "Electric EV",
    bhk: "EV Motor",
    price: 135000,
    rentPrice: 550,
    priceFormatted: "₹ 550 / day (Buy: ₹ 1.35 Lakhs)",
    area: 110,
    kmsDriven: "2,100 km",
    fuelType: "Electric",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    address: "Koramangala 8th Block, Bangalore",
    description: "High speed Ather 450X EV scooter available for daily/monthly rental or purchase. 105 km true range, touch screen navigation, home charger.",
    amenities: ["Home Charger", "105km Range", "GPS Navigation", "Zero Emissions", "Helmet Included"],
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Lenin Motors Intermediary", agentName: "Karthik Raja", phone: "+91 98800 11990", email: "bikes@lenintech.com", license: "RTA/KA/0991", locality: "Koramangala" },
    ownerInfo: { name: "Divya Nair", phone: "+91 99801 77665", email: "divya.nair@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bike-303",
    title: "Yamaha YZF R15 V4 Racing Edition",
    type: "buy",
    category: "Bikes",
    subType: "Sports",
    bhk: "155 cc",
    price: 195000, // ₹ 1.95 Lakhs
    rentPrice: 1100,
    priceFormatted: "₹ 1.95 Lakhs (Rent: ₹1,100/day)",
    area: 155,
    kmsDriven: "6,200 km",
    fuelType: "Petrol",
    furnishing: "Mint Condition",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "HSR Layout",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    address: "HSR 27th Main, Bangalore",
    description: "Performance sports bike Yamaha R15 V4. Traction control, quick shifter, dual channel ABS, original company service records.",
    amenities: ["Quick Shifter", "Traction Control", "Dual Channel ABS", "LED Headlight"],
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Lenin Motors Intermediary", agentName: "Karthik Raja", phone: "+91 98800 11990", email: "bikes@lenintech.com", license: "RTA/KA/0991", locality: "HSR Layout" },
    ownerInfo: { name: "Varun Shetty", phone: "+91 98441 55667", email: "varun.shetty@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "bike-304",
    title: "Honda CB Shine 125 Commuter Bike",
    type: "rent",
    category: "Bikes",
    subType: "Commuter",
    bhk: "125 cc",
    price: 78000,
    rentPrice: 400,
    priceFormatted: "₹ 400 / day (Buy: ₹ 78,000)",
    area: 125,
    kmsDriven: "9,800 km",
    fuelType: "Petrol",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Powai",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    address: "Powai Plaza, Mumbai",
    description: "Reliable 65 kmpl mileage commuter bike available for rent or purchase. Smooth engine, newly fitted tubeless tires.",
    amenities: ["65 kmpl Mileage", "Tubeless Tires", "Disc Brake", "Helmet Included"],
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Lenin Motors Intermediary", agentName: "Sameer Khan", phone: "+91 98200 77889", email: "cars@lenintech.com", license: "RTO/MH/2024", locality: "Powai" },
    ownerInfo: { name: "Nitin Patil", phone: "+91 98201 33221", email: "nitin.patil@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },

  // --- 7. CARS SECTION (BUY, RENT, SELL) ---
  {
    id: "car-401",
    title: "Mahindra Thar LX 4x4 Hard Top Automatic",
    type: "buy",
    category: "Cars",
    subType: "SUV",
    bhk: "4 Seater SUV",
    price: 1550000, // ₹ 15.50 Lakhs
    rentPrice: 3500,
    priceFormatted: "₹ 15.50 Lakhs (Rent: ₹3,500/day)",
    area: 2200,
    kmsDriven: "14,000 km",
    fuelType: "Diesel",
    transmission: "Automatic",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Powai",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    address: "Powai Hiranandani, Mumbai",
    description: "Immaculate 2023 Mahindra Thar 4x4 Diesel Automatic. Off-road bumpers, touchscreen infotainment, alloy wheels, insurance valid.",
    amenities: ["4x4 Drive", "Automatic Transmission", "Sunroof", "Touchscreen Audio", "Alloy Wheels", "Insurance Valid"],
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Lenin Auto Intermediary", agentName: "Sameer Khan", phone: "+91 98200 77889", email: "cars@lenintech.com", license: "RTO/MH/2024", locality: "Powai" },
    ownerInfo: { name: "Rohan Kapoor", phone: "+91 98211 44556", email: "rohan.kapoor@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "car-402",
    title: "Tata Nexon EV Max Empress Dark Edition",
    type: "rent",
    category: "Cars",
    subType: "EV",
    bhk: "5 Seater EV SUV",
    price: 1480000,
    rentPrice: 2800,
    priceFormatted: "₹ 2,800 / day (Buy: ₹ 14.80 Lakhs)",
    area: 40,
    kmsDriven: "8,500 km",
    fuelType: "Electric",
    transmission: "Automatic",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Cyber City",
    city: "Gurugram",
    state: "Delhi NCR",
    country: "India",
    address: "Cyber City Phase 2, Gurugram",
    description: "437 km range Electric SUV for rent or buy. Fast charging support, ventilated seats, JBL 8-speaker sound, sun-roof.",
    amenities: ["437km EV Range", "Fast Charging", "Ventilated Seats", "Sunroof", "JBL Sound System", "Zero Emissions"],
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Gurugram Auto Intermediary", agentName: "Amitabh Sen", phone: "+91 99100 33445", email: "delhi.cars@lenintech.com", license: "RTO/HR/2024", locality: "Cyber City" },
    ownerInfo: { name: "Gaurav Malhotra", phone: "+91 98101 22334", email: "g.malhotra@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "car-403",
    title: "Honda City 5th Gen ZX i-VTEC Sedan",
    type: "buy",
    category: "Cars",
    subType: "Sedan",
    bhk: "5 Seater Sedan",
    price: 1450000, // ₹ 14.50 Lakhs
    rentPrice: 2500,
    priceFormatted: "₹ 14.50 Lakhs (Rent: ₹2,500/day)",
    area: 1500,
    kmsDriven: "11,200 km",
    fuelType: "Petrol",
    transmission: "Manual",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: true,
    isDirectOwner: true,
    locality: "Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    address: "100ft Road, Indiranagar, Bangalore",
    description: "Top-end Honda City ZX Sedan with sunroof, lane watch camera, leather upholstery, and full Honda service record.",
    amenities: ["Sunroof", "Lane Watch Camera", "Leather Seats", "Cruise Control", "Alloy Wheels"],
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Lenin Auto Intermediary", agentName: "Karthik Raja", phone: "+91 98800 11990", email: "cars@lenintech.com", license: "RTO/KA/2024", locality: "Indiranagar" },
    ownerInfo: { name: "Suresh Menon", phone: "+91 99801 12345", email: "suresh.menon@techmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  },
  {
    id: "car-404",
    title: "Hyundai i20 N Line Turbo DCT Hatchback",
    type: "buy",
    category: "Cars",
    subType: "Hatchback",
    bhk: "5 Seater Hatchback",
    price: 1020000, // ₹ 10.20 Lakhs
    rentPrice: 2000,
    priceFormatted: "₹ 10.20 Lakhs (Rent: ₹2,000/day)",
    area: 1000,
    kmsDriven: "7,800 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "Ready to Move",
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    address: "Hill Road, Bandra West, Mumbai",
    description: "Sporty 1.0L Turbo DCT Automatic i20 N Line with dual exhaust tips, paddle shifters, and Bose 7-speaker sound system.",
    amenities: ["Paddle Shifters", "Bose Audio", "Dual Exhaust", "Sunroof", "Touchscreen"],
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: { name: "Lenin Auto Intermediary", agentName: "Sameer Khan", phone: "+91 98200 77889", email: "cars@lenintech.com", license: "RTO/MH/2024", locality: "Bandra West" },
    ownerInfo: { name: "Vikram Saxena", phone: "+91 98200 55443", email: "vikram.saxena@gmail.com", verificationStatus: "Verified Direct Owner" },
    createdAt: new Date().toISOString()
  }
];

let inquiries = [];
let entitlements = new Set();

const platformBrokers = [
  {
    id: "brk-01",
    name: "Lenin Apex Brokerage - Bangalore East",
    agentName: "Vikram Malhotra",
    phone: "+91 98450 11223",
    email: "v.malhotra@leninbrokerage.in",
    cities: ["Bangalore"],
    localities: ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "Varthur Road", "Devanahalli"]
  },
  {
    id: "brk-02",
    name: "Lenin Prime Realtors - Mumbai Metro",
    agentName: "Karan Johar",
    phone: "+91 98200 44556",
    email: "karan.j@powairealty.com",
    cities: ["Mumbai"],
    localities: ["Powai", "Bandra", "Andheri", "Worli", "Dombivli"]
  },
  {
    id: "brk-03",
    name: "Lenin Capital Brokers - Delhi NCR",
    agentName: "Rohit Verma",
    phone: "+91 99100 22334",
    email: "r.verma@gurugramrentals.com",
    cities: ["Gurugram", "Delhi NCR", "Noida"],
    localities: ["Cyber City", "Golf Course Road", "Golf Course Extension", "Sector 62"]
  },
  {
    id: "brk-04",
    name: "Lenin Cyber Realtors - Telangana",
    agentName: "Srinivas Reddy",
    phone: "+91 94400 55667",
    email: "srinivas@cyberrealtors.in",
    cities: ["Hyderabad"],
    localities: ["Gachibowli", "HITEC City", "Jubilee Hills"]
  }
];

function maskPhone(phone) {
  if (!phone) return "+91 98765-XXXXX";
  return phone.replace(/(\+\d{2}\s?\d{2})\d{4}(\d{4})/, '$1-XXXX-$2');
}

function maskEmail(email) {
  if (!email) return "u*****r@gmail.com";
  const [user, domain] = email.split('@');
  return `${user.charAt(0)}*****${user.charAt(user.length - 1)}@${domain}`;
}

// REST API Endpoints

app.get('/api/properties', (req, res) => {
  const { 
    category, bhk, city, state, country, type, subType, gender,
    minPrice, maxPrice, minArea, maxArea, search, status, builderOnly,
    furnishing, petPolicy, leaseType, isVerified, hasVideo3D, isDirectOwner,
    sortBy 
  } = req.query;

  let filtered = [...properties];

  if (type && type !== 'all') {
    filtered = filtered.filter(p => p.type.toLowerCase() === type.toLowerCase());
  }

  if (category && category !== 'All Property' && category !== 'all' && category !== 'Home') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (gender && gender !== 'all') {
    filtered = filtered.filter(p => p.gender && p.gender.toLowerCase() === gender.toLowerCase());
  }

  if (bhk && bhk !== 'all') {
    filtered = filtered.filter(p => p.bhk === bhk);
  }

  if (city && city !== 'all') {
    filtered = filtered.filter(p => p.city.toLowerCase().includes(city.toLowerCase()));
  }

  if (state && state !== 'all') {
    filtered = filtered.filter(p => p.state.toLowerCase() === state.toLowerCase());
  }

  if (country && country !== 'all') {
    filtered = filtered.filter(p => p.country.toLowerCase() === country.toLowerCase());
  }

  if (subType && subType !== 'all') {
    filtered = filtered.filter(p => p.subType.toLowerCase() === subType.toLowerCase());
  }

  if (status && status !== 'all') {
    filtered = filtered.filter(p => p.status.toLowerCase() === status.toLowerCase());
  }

  if (furnishing && furnishing !== 'all') {
    filtered = filtered.filter(p => p.furnishing && p.furnishing.toLowerCase() === furnishing.toLowerCase());
  }

  if (petPolicy && petPolicy !== 'all') {
    filtered = filtered.filter(p => p.petPolicy && p.petPolicy.toLowerCase() === petPolicy.toLowerCase());
  }

  if (leaseType && leaseType !== 'all') {
    filtered = filtered.filter(p => p.leaseType && p.leaseType.toLowerCase() === leaseType.toLowerCase());
  }

  if (builderOnly === 'true') {
    filtered = filtered.filter(p => p.isBuilderProject === true);
  }

  if (isVerified === 'true') {
    filtered = filtered.filter(p => p.isVerified === true);
  }

  if (hasVideo3D === 'true') {
    filtered = filtered.filter(p => p.hasVideo3D === true);
  }

  if (isDirectOwner === 'true') {
    filtered = filtered.filter(p => p.isDirectOwner === true);
  }

  if (minPrice) {
    filtered = filtered.filter(p => (p.price || p.rentPrice || 0) >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter(p => (p.price || p.rentPrice || 0) <= parseFloat(maxPrice));
  }

  if (minArea) {
    filtered = filtered.filter(p => (p.area || 0) >= parseFloat(minArea));
  }

  if (maxArea) {
    filtered = filtered.filter(p => (p.area || 0) <= parseFloat(maxArea));
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.locality.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Sorting Logic
  if (sortBy) {
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => (a.price || a.rentPrice || 0) - (b.price || b.rentPrice || 0));
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => (b.price || b.rentPrice || 0) - (a.price || a.rentPrice || 0));
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price-sqft-asc') {
      filtered.sort((a, b) => ((a.price || 0) / (a.area || 1)) - ((b.price || 0) / (b.area || 1)));
    } else if (sortBy === 'area-desc') {
      filtered.sort((a, b) => (b.area || 0) - (a.area || 0));
    }
  }

  const responseData = filtered.map(p => {
    return {
      ...p,
      ownerInfo: {
        ...p.ownerInfo,
        phone: maskPhone(p.ownerInfo?.phone),
        email: maskEmail(p.ownerInfo?.email),
        isMasked: true
      }
    };
  });

  res.json({
    success: true,
    count: responseData.length,
    properties: responseData
  });
});

app.get('/api/properties/:id', (req, res) => {
  const property = properties.find(p => p.id === req.params.id);
  if (!property) {
    return res.status(404).json({ success: false, message: "Listing not found" });
  }

  const userId = req.headers['x-user-id'] || 'guest';
  const isPremiumUnlocked = entitlements.has(`${userId}_${property.id}`) || req.headers['x-user-premium'] === 'true';

  let ownerData = { ...property.ownerInfo };
  if (!isPremiumUnlocked) {
    ownerData = {
      ...ownerData,
      phone: maskPhone(property.ownerInfo?.phone),
      email: maskEmail(property.ownerInfo?.email),
      isMasked: true
    };
  } else {
    ownerData = {
      ...ownerData,
      isMasked: false
    };
  }

  res.json({
    success: true,
    property: {
      ...property,
      ownerInfo: ownerData,
      isUnlockedForUser: isPremiumUnlocked
    }
  });
});

app.post('/api/inquiries', (req, res) => {
  const { propertyId, name, email, phone, message } = req.body;

  const property = properties.find(p => p.id === propertyId);
  const targetCity = property ? property.city : 'Bangalore';
  const targetLocality = property ? property.locality : 'Indiranagar';

  let assignedBroker = platformBrokers.find(b => 
    b.cities.some(c => c.toLowerCase().includes(targetCity.toLowerCase())) ||
    b.localities.some(l => l.toLowerCase().includes(targetLocality.toLowerCase()))
  );

  if (!assignedBroker) {
    assignedBroker = platformBrokers[0];
  }

  const newInquiry = {
    id: `inq-${Date.now()}`,
    propertyId: propertyId || 'general',
    propertyTitle: property ? property.title : 'General Platform Enquiry',
    buyerName: name,
    buyerEmail: email,
    buyerPhone: phone,
    message: message || "I am interested in this listing. Please arrange a visit/viewing.",
    assignedBroker: {
      name: assignedBroker.name,
      agentName: assignedBroker.agentName,
      phone: assignedBroker.phone,
      email: assignedBroker.email
    },
    timestamp: new Date().toISOString()
  };

  inquiries.push(newInquiry);

  res.json({
    success: true,
    message: `Your inquiry has been logged and routed to our certified platform broker intermediary (${assignedBroker.agentName} - ${assignedBroker.name}).`,
    inquiry: newInquiry
  });
});

app.get('/api/inquiries', (req, res) => {
  res.json({
    success: true,
    inquiries: inquiries
  });
});

app.post('/api/payments/create-order', (req, res) => {
  const { propertyId, userId = 'user_guest' } = req.body;
  const orderId = `ORD_LT_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  res.json({
    success: true,
    orderId,
    amount: 5000,
    currency: "INR",
    propertyId,
    userId,
    key: "rzp_live_lenintech_demo_key"
  });
});

app.post('/api/payments/verify', (req, res) => {
  const { orderId, paymentId, propertyId, userId = 'user_guest' } = req.body;

  const key = `${userId}_${propertyId}`;
  entitlements.add(key);

  const property = properties.find(p => p.id === propertyId);

  res.json({
    success: true,
    message: "Payment verified successfully. Direct Owner Access Granted!",
    unlockedToken: `TOK_${orderId}`,
    unmaskedOwnerInfo: property ? property.ownerInfo : null
  });
});

app.post('/api/properties', (req, res) => {
  const {
    title,
    type = 'buy',
    category = 'Apartment',
    subType = 'Full House',
    bhk = '2 BHK',
    price,
    rentPrice,
    area = 1200,
    superBuiltArea = 1500,
    city = 'Bangalore',
    locality = 'Indiranagar',
    address = '',
    ownerName,
    ownerPhone,
    ownerEmail,
    brokerPreference = 'direct'
  } = req.body;

  const newPropId = `prop-${Date.now()}`;
  const formattedPrice = type === 'rent' ? `₹ ${Number(rentPrice || price).toLocaleString('en-IN')} / mo` : `₹ ${(Number(price) / 100000).toFixed(2)} Lakhs`;

  const newProperty = {
    id: newPropId,
    title: title || `${bhk} ${category} in ${locality}`,
    type,
    category,
    subType,
    bhk,
    price: Number(price),
    rentPrice: type === 'rent' ? Number(rentPrice || price) : null,
    priceFormatted: formattedPrice,
    area: Number(area),
    superBuiltArea: Number(superBuiltArea),
    unitCount: 50,
    floorNumber: "4th Floor",
    furnishing: "Semi-furnished",
    facing: "East",
    status: "Ready to Move",
    isBuilderProject: false,
    isVerified: true,
    hasVideo3D: false,
    isDirectOwner: true,
    locality,
    city,
    state: "Karnataka",
    country: "India",
    address: address || `${locality}, ${city}`,
    description: `Beautiful ${bhk} ${category} listed directly on Lenin Technologies real estate platform. High quality ventilation, prime locality.`,
    amenities: ["24/7 Power Backup", "Covered Parking", "Multi-tier Security", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    assignedBroker: {
      name: "Lenin Certified Intermediary Desk",
      agentName: brokerPreference === 'broker' ? "Assigned Platform Broker" : "Direct Owner Gateway",
      phone: "+91 98450 11223",
      email: "help@lenintech.com",
      license: "RERA/LT/PLATFORM/2026",
      locality
    },
    ownerInfo: {
      name: ownerName || "Verified Property Owner",
      phone: ownerPhone || "+91 98765 43210",
      email: ownerEmail || "owner@lenintech.com",
      verificationStatus: "Verified Direct Owner"
    },
    createdAt: new Date().toISOString()
  };

  properties.unshift(newProperty);

  res.status(201).json({
    success: true,
    message: "Listing successfully posted on Lenin Technologies platform!",
    property: newProperty
  });
});

// SPA Wildcard Fallback Route for React Client Routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Lenin Technologies Backend running on http://localhost:${PORT}`);
});
