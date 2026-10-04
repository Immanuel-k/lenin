import React, { useState } from 'react';
import { 
  Building2, MapPin, Maximize2, ShieldCheck, ChevronLeft, ChevronRight, 
  Eye, Lock, Sparkles, UserCheck, ArrowRight, User, Bike, Car, FileText, CheckCircle2, PhoneCall 
} from 'lucide-react';

export default function PropertyCard({ 
  property, 
  onSeeDetails, 
  onUnlockPaywall, 
  onOpenInquiry,
  isUnlocked = false
}) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = property.images && property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"];

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const isBachelors = property.category === 'Bachelors';
  const isBikes = property.category === 'Bikes';
  const isCars = property.category === 'Cars';

  return (
    <div 
      className="property-card-lift bg-white rounded-2xl border border-alabaster-200 overflow-hidden shadow-sm flex flex-col justify-between group cursor-pointer relative"
      onClick={() => onSeeDetails(property)}
    >
      
      {/* Card Header & Image Slider */}
      <div className="relative aspect-[16/10] bg-alabaster-100 overflow-hidden">
        <img
          src={images[currentImgIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Hover Pop-Up Overlay Banner: See Details */}
        <div className="absolute inset-0 bg-charcoal-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSeeDetails(property);
            }}
            className="px-5 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-black text-xs shadow-2xl shadow-brand-500/50 flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out scale-95 group-hover:scale-100"
          >
            <Eye className="w-4 h-4 stroke-[2.5]" />
            <span>See Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Image Slider Controls */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={handlePrevImg}
              className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImg}
              className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-charcoal-900/90 text-white backdrop-blur-md shadow-sm">
            {property.bhk}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-500 text-white shadow-sm">
            {property.category}
          </span>
          {property.gender && (
            <span className="px-2 py-1 rounded-lg text-[10px] font-extrabold bg-charcoal-800 text-white shadow-sm">
              {property.gender} Occupancy
            </span>
          )}
        </div>

        {/* Status / Intent Badge Overlay Right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 text-white shadow-sm uppercase">
            {property.type}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Location Field */}
          <div className="flex items-center space-x-1 text-charcoal-500 text-xs font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
            <span className="truncate">
              {isBikes || isCars ? `Located in: ${property.locality}, ${property.city}` : `${property.locality}, ${property.city}`}
            </span>
          </div>

          {/* Name / Title Field */}
          <h3 className="text-base font-extrabold text-charcoal-900 line-clamp-1 group-hover:text-brand-500 transition-colors mb-2">
            {property.title}
          </h3>

          {/* FOR BACHELORS SPECIFIC FIELDS: Hostel & PG Name, BHK, City, Price */}
          {isBachelors && (
            <div className="p-3 rounded-xl bg-alabaster-100/90 border border-alabaster-200 text-xs space-y-1.5 my-3">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-brand-600 font-bold uppercase">Hostel & PG Name:</span>
                <span className="font-extrabold text-charcoal-900 truncate max-w-[140px]">
                  {property.assignedBroker?.name || "Stanza Living Campus"}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-charcoal-500 font-semibold">City & Locality:</span>
                <span className="font-bold text-charcoal-800">{property.city} ({property.locality})</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-charcoal-500 font-semibold">BHK Configuration:</span>
                <span className="font-bold text-brand-700">{property.bhk}</span>
              </div>
            </div>
          )}

          {/* FOR BIKES SPECIFIC FIELDS */}
          {isBikes && (
            <div className="p-3 rounded-xl bg-alabaster-100/90 border border-alabaster-200 text-xs space-y-1.5 my-3">
              <div>
                <span className="text-brand-600 font-bold text-[11px] block uppercase mb-0.5">
                  Bike Condition & Description:
                </span>
                <p className="text-[11px] text-charcoal-600 line-clamp-2 font-medium">
                  {property.description || "Excellent condition, regular service history, 0 scratches."}
                </p>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-alabaster-200">
                <span className="text-charcoal-500 font-bold">Location:</span>
                <span className="font-bold text-charcoal-800 truncate max-w-[150px]">{property.locality}, {property.city}</span>
              </div>
            </div>
          )}

          {/* FOR CARS SPECIFIC FIELDS */}
          {isCars && (
            <div className="p-3 rounded-xl bg-alabaster-100/90 border border-alabaster-200 text-xs space-y-1.5 my-3">
              <div>
                <span className="text-brand-600 font-bold text-[11px] block uppercase mb-0.5">
                  Car Condition & Description:
                </span>
                <p className="text-[11px] text-charcoal-600 line-clamp-2 font-medium">
                  {property.description || "Mint condition 4x4 automatic SUV with sunroof and full company service."}
                </p>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-alabaster-200">
                <span className="text-charcoal-500 font-bold">Location:</span>
                <span className="font-bold text-charcoal-800 truncate max-w-[150px]">{property.locality}, {property.city}</span>
              </div>
            </div>
          )}

          {/* STANDARD PROPERTY METRICS */}
          {!isBachelors && !isBikes && !isCars && (
            <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl bg-alabaster-100/90 border border-alabaster-200 text-xs">
              <div>
                <span className="block text-[10px] text-charcoal-500 font-bold uppercase">Carpet Area</span>
                <span className="font-extrabold text-charcoal-900 flex items-center mt-0.5">
                  <Maximize2 className="w-3 h-3 mr-1 text-charcoal-500" />
                  {property.area} sq.ft
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-charcoal-500 font-bold uppercase">Super Built Area</span>
                <span className="font-bold text-charcoal-800 mt-0.5 block">
                  {property.superBuiltArea || Math.round(property.area * 1.2)} sq.ft
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Pricing & Contact Triggers */}
        <div className="pt-3 border-t border-alabaster-200">
          
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-charcoal-500 block">
                {property.type === 'rent' ? 'Rent Price' : 'Selling / Buy Price'}
              </span>
              <span className="text-lg font-black text-charcoal-900 tracking-tight">
                {property.priceFormatted}
              </span>
            </div>

            {/* Direct Owner Badge */}
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <UserCheck className="w-3 h-3 mr-1 text-emerald-600" />
              Direct Owner
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            
            {/* See Details Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSeeDetails(property);
              }}
              className="py-2.5 px-3 rounded-xl bg-alabaster-100 hover:bg-brand-500 hover:text-white text-charcoal-800 text-xs font-bold transition-all flex items-center justify-center space-x-1 group/btn shadow-sm border border-alabaster-200"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>See Details</span>
            </button>

            {/* Direct Contact / Call Broker Button */}
            {isUnlocked ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSeeDetails(property);
                }}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center space-x-1 shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Unlocked Details</span>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenInquiry) {
                    onOpenInquiry(property);
                  } else {
                    onUnlockPaywall(property);
                  }
                }}
                className="py-2.5 px-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all flex items-center justify-center space-x-1 shadow-sm shadow-brand-500/20"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Broker</span>
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
