import React, { useState } from 'react';
import { MapPin, Sparkles, Send, Building, ShieldCheck, Flag } from 'lucide-react';

const INDIA_STATES = [
  {
    name: "Karnataka",
    districts: [
      {
        districtName: "Bangalore Urban District",
        cities: [
          { name: "Bangalore", count: "1,240 Verified Listings", highlight: "Indiranagar, Whitefield, Koramangala, HSR Layout" }
        ]
      },
      {
        districtName: "Mysore District",
        cities: [
          { name: "Mysore", count: "310 Verified Listings", highlight: "Gokulam, Vijayanagar" }
        ]
      }
    ]
  },
  {
    name: "Maharashtra",
    districts: [
      {
        districtName: "Mumbai Suburban District",
        cities: [
          { name: "Mumbai", count: "2,150 Verified Listings", highlight: "Powai, Bandra West, Andheri West, Worli" }
        ]
      },
      {
        districtName: "Thane District",
        cities: [
          { name: "Thane", count: "640 Verified Listings", highlight: "Ghodbunder Road, Thane West" }
        ]
      },
      {
        districtName: "Pune District",
        cities: [
          { name: "Pune", count: "980 Verified Listings", highlight: "Baner, Wakad, Viman Nagar" }
        ]
      }
    ]
  },
  {
    name: "Delhi NCR",
    districts: [
      {
        districtName: "Gurugram District",
        cities: [
          { name: "Gurugram", count: "1,890 Verified Listings", highlight: "Cyber City, Golf Course Road, DLF Phase 3" }
        ]
      },
      {
        districtName: "Gautam Buddha Nagar District",
        cities: [
          { name: "Noida", count: "860 Verified Listings", highlight: "Sector 62, Sector 150" }
        ]
      }
    ]
  },
  {
    name: "Telangana",
    districts: [
      {
        districtName: "Hyderabad District",
        cities: [
          { name: "Hyderabad", count: "1,420 Verified Listings", highlight: "Gachibowli, HITEC City, Jubilee Hills, Kondapur" }
        ]
      }
    ]
  },
  {
    name: "Tamil Nadu",
    districts: [
      {
        districtName: "Chennai District",
        cities: [
          { name: "Chennai", count: "1,100 Verified Listings", highlight: "Velachery, OMR, Anna Nagar, Adyar" }
        ]
      }
    ]
  }
];

export default function RegionalExplorer({ onOpenInquiry, onSelectRegionFilter }) {
  const [selectedState, setSelectedState] = useState("Karnataka");

  const currentState = INDIA_STATES.find(s => s.name === selectedState) || INDIA_STATES[0];

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Flag className="w-3.5 h-3.5" />
              <span>India Marketplace Regional Explorer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Properties & Mobility Across States, Districts & Cities in India
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              100% India-wide coverage across verified real estate properties, bachelors accommodations, bikes, and cars.
            </p>
          </div>

          {/* India Tag Badge */}
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-black text-slate-800">
            <span className="text-base">🇮🇳</span>
            <span>All Listings Located in India</span>
          </div>
        </div>

        {/* State Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex-shrink-0">
            Select State:
          </span>
          {INDIA_STATES.map(s => (
            <button
              key={s.name}
              onClick={() => setSelectedState(s.name)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 border ${
                selectedState === s.name
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Districts & Cities Cards Grid */}
        <div className="space-y-6">
          {currentState.districts.map((dist) => (
            <div key={dist.districtName} className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-brand-500" />
                <span>District: <strong className="text-slate-900">{dist.districtName}</strong></span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dist.cities.map((city) => (
                  <div
                    key={city.name}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-brand-500 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-brand-500 transition-colors">
                          {city.name}
                        </h3>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mt-1 border border-emerald-200">
                          {city.count}
                        </span>
                      </div>

                      <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                        <Building className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 mt-3 line-clamp-1 font-medium">
                      Key Localities: <strong className="text-slate-700">{city.highlight}</strong>
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => onSelectRegionFilter && onSelectRegionFilter(city.name, currentState.name, "India")}
                        className="text-xs font-extrabold text-brand-500 hover:text-brand-600 flex items-center"
                      >
                        <span>Browse {city.name} Listings</span>
                        <span className="ml-1">→</span>
                      </button>

                      <button
                        onClick={() => onOpenInquiry && onOpenInquiry({ city: city.name, state: currentState.name, country: "India" })}
                        className="p-1.5 text-slate-400 hover:text-brand-500 transition-colors"
                        title="Quick Regional Inquiry"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
