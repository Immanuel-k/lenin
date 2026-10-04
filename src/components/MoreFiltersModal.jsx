import React, { useState } from 'react';
import { X, SlidersHorizontal, CheckCircle2, RotateCcw, ShieldCheck, Video, UserCheck } from 'lucide-react';

export default function MoreFiltersModal({ 
  filters, 
  setFilters, 
  onClose, 
  totalResultsCount = 0 
}) {
  const [localFilters, setLocalFilters] = useState({ ...filters });

  const handleToggleAmenity = (amenity) => {
    const current = localFilters.amenities || [];
    if (current.includes(amenity)) {
      setLocalFilters({ ...localFilters, amenities: current.filter(a => a !== amenity) });
    } else {
      setLocalFilters({ ...localFilters, amenities: [...current, amenity] });
    }
  };

  const handleReset = () => {
    const resetState = {
      furnishing: 'all',
      petPolicy: 'all',
      leaseType: 'all',
      status: 'all',
      isVerified: false,
      hasVideo3D: false,
      isDirectOwner: false,
      minArea: '',
      maxArea: '',
      amenities: []
    };
    setLocalFilters(resetState);
    setFilters(resetState);
  };

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-lg">
            <SlidersHorizontal className="w-5 h-5 text-brand-500" />
            <span>Advanced Search & Filters</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* 1. VERIFICATION & MEDIA TOGGLES */}
          <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200/60 space-y-3">
            <h4 className="text-xs font-black text-brand-700 uppercase tracking-wider">
              Verification & Media Controls
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={localFilters.isVerified || false}
                  onChange={(e) => setLocalFilters({ ...localFilters, isVerified: e.target.checked })}
                  className="w-4 h-4 text-brand-500 rounded focus:ring-brand-500"
                />
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>Verified Listings Only</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={localFilters.hasVideo3D || false}
                  onChange={(e) => setLocalFilters({ ...localFilters, hasVideo3D: e.target.checked })}
                  className="w-4 h-4 text-brand-500 rounded focus:ring-brand-500"
                />
                <Video className="w-4 h-4 text-amber-500" />
                <span>3D Tour / Video</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={localFilters.isDirectOwner || false}
                  onChange={(e) => setLocalFilters({ ...localFilters, isDirectOwner: e.target.checked })}
                  className="w-4 h-4 text-brand-500 rounded focus:ring-brand-500"
                />
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Brokerage / Direct Owner</span>
              </label>
            </div>
          </div>

          {/* 2. RENTAL-SPECIFIC FILTERS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Rental Preferences
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Furnishing Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Furnishing Status</label>
                <select
                  value={localFilters.furnishing || 'all'}
                  onChange={(e) => setLocalFilters({ ...localFilters, furnishing: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="all">Any Furnishing</option>
                  <option value="Furnished">Fully Furnished</option>
                  <option value="Semi-furnished">Semi-furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              {/* Pet Policy */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Pet Policy</label>
                <select
                  value={localFilters.petPolicy || 'all'}
                  onChange={(e) => setLocalFilters({ ...localFilters, petPolicy: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="all">Any Pet Policy</option>
                  <option value="Allowed">Pets Allowed</option>
                  <option value="Not Allowed">Pets Not Allowed</option>
                </select>
              </div>

              {/* Lease Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Lease Type</label>
                <select
                  value={localFilters.leaseType || 'all'}
                  onChange={(e) => setLocalFilters({ ...localFilters, leaseType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="all">Any Duration</option>
                  <option value="Long-term">Long-term (1 Year+)</option>
                  <option value="Short-term">Short-term / Flexible</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. SALE-SPECIFIC FILTERS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Sale & Construction Status
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Construction Status</label>
                <select
                  value={localFilters.status || 'all'}
                  onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="all">All Construction Status</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="New Launch">New Launch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Min - Max Sq. Footage Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={localFilters.minArea || ''}
                    onChange={(e) => setLocalFilters({ ...localFilters, minArea: e.target.value })}
                    placeholder="Min sq.ft"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                  <span className="text-slate-400">-</span>
                  <input
                    type="number"
                    value={localFilters.maxArea || ''}
                    onChange={(e) => setLocalFilters({ ...localFilters, maxArea: e.target.value })}
                    placeholder="Max sq.ft"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. AMENITIES CHECKBOXES */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Amenities & Features
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold text-slate-700">
              {[
                "Covered Parking",
                "Power Backup",
                "Lift",
                "Gym",
                "Balcony",
                "Multi-tier Security",
                "EV Charging",
                "Swimming Pool",
                "Wi-Fi"
              ].map(amenity => {
                const checked = (localFilters.amenities || []).includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => handleToggleAmenity(amenity)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      checked
                        ? 'border-brand-500 bg-brand-50 text-brand-600 font-extrabold shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>{amenity}</span>
                    {checked && <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-slate-50/80">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-200/80 text-xs font-bold transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset / Clear All</span>
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-xl shadow-brand-500/30 transition-all flex items-center space-x-2"
          >
            <span>Show {totalResultsCount} Properties</span>
          </button>
        </div>

      </div>
    </div>
  );
}
