import React, { useState } from 'react';
import { 
  X, MapPin, Maximize2, ShieldCheck, CheckCircle2, Lock, 
  Building2, Phone, Mail, Compass, Layers, Sparkles, Navigation, Send 
} from 'lucide-react';
import GoogleMapsLocationViewer from './GoogleMapsLocationViewer';

export default function PropertyDetailModal({ 
  property, 
  onClose, 
  onUnlockPaywall, 
  onOpenInquiry,
  isUnlocked = false 
}) {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = property.images && property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-all shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Gallery Header */}
        <div className="relative bg-slate-900 text-white">
          <div className="aspect-[21/9] w-full overflow-hidden">
            <img
              src={images[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Gallery Thumbnail Selector */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex space-x-2 overflow-x-auto p-1 bg-black/40 backdrop-blur-md rounded-xl">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    idx === activeImageIndex ? 'border-brand-500 scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Header Title & Specs */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-brand-500 text-white">
                {property.bhk}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-900 text-white">
                {property.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {property.status || 'Ready to Move'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {property.title}
            </h1>

            <div className="flex items-center space-x-1.5 text-slate-500 text-sm font-semibold mt-1">
              <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>{property.address}</span>
            </div>
          </div>

          {/* Core Quantitative Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Carpet Area</span>
              <span className="text-lg font-black text-slate-900 flex items-center mt-1">
                <Maximize2 className="w-4 h-4 mr-1 text-brand-500" />
                {property.area} sq.ft
              </span>
            </div>

            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Super Built Area</span>
              <span className="text-lg font-black text-slate-900 mt-1 block">
                {property.superBuiltArea || Math.round(property.area * 1.2)} sq.ft
              </span>
            </div>

            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Total Unit Count</span>
              <span className="text-lg font-black text-slate-900 flex items-center mt-1">
                <Building2 className="w-4 h-4 mr-1 text-slate-600" />
                {property.unitCount || 120} Units
              </span>
            </div>

            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Floor Number</span>
              <span className="text-lg font-black text-slate-900 flex items-center mt-1">
                <Layers className="w-4 h-4 mr-1 text-slate-600" />
                {property.floorNumber || '10th Floor'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-extrabold text-slate-900 mb-2">About Property</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {property.description}
            </p>
          </div>

          {/* Amenities Checklist */}
          <div>
            <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center">
              <Sparkles className="w-4 h-4 text-brand-500 mr-1.5" />
              Verified Amenities Checklist
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(property.amenities || [
                "24/7 Power Backup",
                "Reserved Parking",
                "Multi-tier Security",
                "Swimming Pool",
                "Clubhouse",
                "Gym",
                "EV Charging",
                "Landscaped Garden"
              ]).map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Maps Location Viewer & Nearby Landmarks */}
          <GoogleMapsLocationViewer property={property} />

          {/* Direct Owner Access & Broker Intermediary Footer Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold text-brand-400 uppercase tracking-wider flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" />
                Verified Direct Owner Credentials
              </span>
              <div className="text-xl font-extrabold">
                {isUnlocked ? (
                  <span className="text-white">{property.ownerInfo?.name || "Verified Owner"}</span>
                ) : (
                  <span className="text-slate-400 blur-[3px] select-none">Rajesh Kumar Sharma</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1 text-brand-400" />
                  {isUnlocked ? property.ownerInfo?.phone : property.ownerInfo?.phone || "+91 98765-XXXXX"}
                </span>
                <span className="flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1 text-brand-400" />
                  {isUnlocked ? property.ownerInfo?.email : property.ownerInfo?.email || "owner*****@gmail.com"}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => onOpenInquiry(property)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
              >
                <Send className="w-4 h-4 text-brand-400" />
                <span>Broker Enquiry</span>
              </button>

              {!isUnlocked && (
                <button
                  onClick={() => onUnlockPaywall(property)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-extrabold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-500/30"
                >
                  <Lock className="w-4 h-4" />
                  <span>Contact Seller Directly (₹5,000 Pass)</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
