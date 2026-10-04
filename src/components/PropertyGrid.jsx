import React, { useState, useMemo } from 'react';
import PropertyCard from './PropertyCard';
import { 
  SearchX, Filter, ArrowUpDown, Maximize2, SlidersHorizontal, 
  RotateCcw, User, Bike, Car, ShieldCheck, Sparkles, ShoppingBag, Key 
} from 'lucide-react';

export default function PropertyGrid({ 
  properties = [], 
  loading = false, 
  activeCategory = 'Home',
  setActiveCategory,
  onSeeDetails, 
  onUnlockPaywall, 
  onOpenInquiry,
  unlockedPropertyIds = [],
  onOpenMoreFilters,
  advancedFilters = {}
}) {
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'price-asc', 'price-desc', 'newest', 'price-sqft-asc', 'size-desc'
  
  // For Bachelors state
  const [bachelorsGender, setBachelorsGender] = useState('all'); // 'all', 'Male', 'Female'
  const [bachelorsOption, setBachelorsOption] = useState('all'); // 'all', 'PG', 'Hostel', '1 BHK', '2 BHK', '3 BHK'

  // Bikes & Cars Intent Tabs ('all', 'buy', 'rent', 'sell')
  const [vehicleIntent, setVehicleIntent] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all'); // 'all' (All Vehicles)

  // Property Filters
  const [selectedBhk, setSelectedBhk] = useState('all'); 
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  // Filter and Sort properties locally
  const processedProperties = useMemo(() => {
    let result = [...properties];

    // Category Filter
    if (activeCategory && activeCategory !== 'Home' && activeCategory !== 'All Property') {
      if (activeCategory === 'For Bachelors') {
        result = result.filter(p => p.category.toLowerCase() === 'bachelors');
      } else {
        result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
      }
    }

    // FOR BACHELORS FILTERS (Gender & Occupancy: PG, Hostel, 1 BHK, 2 BHK, 3 BHK)
    if (activeCategory === 'For Bachelors') {
      if (bachelorsGender !== 'all') {
        result = result.filter(p => p.gender && (
          p.gender.toLowerCase() === bachelorsGender.toLowerCase() || 
          p.gender.toLowerCase() === 'co-ed'
        ));
      }
      if (bachelorsOption !== 'all') {
        if (bachelorsOption === 'PG' || bachelorsOption === 'Hostel') {
          result = result.filter(p => p.subType && p.subType.toLowerCase() === bachelorsOption.toLowerCase());
        } else {
          result = result.filter(p => p.bhk === bachelorsOption);
        }
      }
    }

    // BIKES & CARS FILTERS (Buy, Sell, Rent tabs & All Vehicles)
    if (activeCategory === 'Bikes' || activeCategory === 'Cars') {
      if (vehicleIntent !== 'all') {
        result = result.filter(p => p.type.toLowerCase() === vehicleIntent.toLowerCase());
      }
      if (vehicleFilter !== 'all') {
        result = result.filter(p => p.subType && p.subType.toLowerCase() === vehicleFilter.toLowerCase());
      }
    }

    // General BHK Filter (applied for property categories)
    if (activeCategory !== 'For Bachelors' && selectedBhk !== 'all') {
      result = result.filter(p => p.bhk === selectedBhk);
    }

    // Cost / Price Filter
    if (selectedPriceRange === 'under50L') {
      result = result.filter(p => (p.price || p.rentPrice || 0) < 5000000);
    } else if (selectedPriceRange === '50Lto2Cr') {
      result = result.filter(p => (p.price || p.rentPrice || 0) >= 5000000 && (p.price || p.rentPrice || 0) <= 20000000);
    } else if (selectedPriceRange === 'above2Cr') {
      result = result.filter(p => (p.price || p.rentPrice || 0) > 20000000);
    }

    // Advanced Filters check
    if (advancedFilters.isVerified) {
      result = result.filter(p => p.isVerified === true);
    }
    if (advancedFilters.hasVideo3D) {
      result = result.filter(p => p.hasVideo3D === true);
    }
    if (advancedFilters.isDirectOwner) {
      result = result.filter(p => p.isDirectOwner === true);
    }

    // Sort By Options
    if (sortBy === 'price-asc') {
      result.sort((a, b) => (a.price || a.rentPrice || 0) - (b.price || b.rentPrice || 0));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => (b.price || b.rentPrice || 0) - (a.price || a.rentPrice || 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price-sqft-asc') {
      result.sort((a, b) => ((a.price || 0) / (a.area || 1)) - ((b.price || 0) / (b.area || 1)));
    } else if (sortBy === 'size-desc') {
      result.sort((a, b) => (b.area || 0) - (a.area || 0));
    }

    return result;
  }, [properties, activeCategory, bachelorsGender, bachelorsOption, vehicleIntent, vehicleFilter, selectedBhk, selectedPriceRange, advancedFilters, sortBy]);

  const resetFilters = () => {
    setSortBy('recommended');
    setBachelorsGender('all');
    setBachelorsOption('all');
    setVehicleIntent('all');
    setVehicleFilter('all');
    setSelectedBhk('all');
    setSelectedPriceRange('all');
  };

  return (
    <section className="py-12 bg-white min-h-[500px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-softBorder gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center">
              {activeCategory === 'For Bachelors' ? 'For Bachelors Accommodations' :
               activeCategory === 'Bikes' ? 'Bikes & Mobility Marketplace' :
               activeCategory === 'Cars' ? 'Cars & EVs Marketplace' : 'Verified Listings Marketplace'}
              {activeCategory !== 'Home' && activeCategory !== 'All Property' && (
                <span className="ml-2.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-600 border border-brand-200">
                  {activeCategory}
                </span>
              )}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {activeCategory === 'For Bachelors' ? 'Browse Male and Female PGs, Hostels, and 1, 2, 3 BHK flatshares' :
               activeCategory === 'Bikes' ? 'Buy, Rent, or Sell bikes & scooters with direct owner contacts' :
               activeCategory === 'Cars' ? 'Buy, Rent, or Sell cars & SUVs with direct owner contacts' :
               'Browse apartments, flats, villas, and land plots with direct owner access'}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenMoreFilters}
              className="flex items-center space-x-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 px-4 py-2 rounded-xl border border-slate-300 shadow-sm transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-500" />
              <span>More Filters</span>
            </button>

            <div className="flex items-center space-x-2 text-xs font-bold text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
              <Filter className="w-3.5 h-3.5 text-brand-500" />
              <span>{loading ? '...' : processedProperties.length} Listings</span>
            </div>
          </div>
        </div>

        {/* 1. FOR BACHELORS PORTION (SPECIFIC GENDER & OCCUPANCY SORT/FILTER) */}
        {activeCategory === 'For Bachelors' && (
          <div className="mb-8 p-6 bg-purple-50/80 rounded-3xl border border-purple-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-purple-200 pb-3">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-purple-900">
                <User className="w-4 h-4 text-purple-600" />
                <span>For Bachelors Options & Sort Controls</span>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Male & Female PG / Hostel / Rooms
              </span>
            </div>

            {/* Gender Selection */}
            <div>
              <span className="block text-xs font-extrabold uppercase text-purple-800 mb-2">
                1. Select Gender Occupancy:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Genders' },
                  { id: 'Male', label: 'Male Occupancy' },
                  { id: 'Female', label: 'Female Occupancy' }
                ].map(g => (
                  <button
                    key={g.id}
                    onClick={() => setBachelorsGender(g.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      bachelorsGender === g.id
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30'
                        : 'bg-white text-slate-700 border-purple-200 hover:bg-purple-100/50'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Occupancy Sub-Type Sort/Filter Options: PG, Hostel, 1 BHK, 2 BHK, 3 BHK */}
            <div>
              <span className="block text-xs font-extrabold uppercase text-purple-800 mb-2">
                2. Filter Options for {bachelorsGender === 'all' ? 'Male & Female' : bachelorsGender}:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Options' },
                  { id: 'PG', label: 'PG (Paying Guest)' },
                  { id: 'Hostel', label: 'Hostel' },
                  { id: '1 BHK', label: '1 BHK Room' },
                  { id: '2 BHK', label: '2 BHK Flatshare' },
                  { id: '3 BHK', label: '3 BHK Flatshare' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setBachelorsOption(opt.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      bachelorsOption === opt.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-700 border-purple-200 hover:bg-slate-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By Price Dropdown for Bachelors */}
            <div className="flex items-center justify-between pt-2 border-t border-purple-200/60">
              <span className="text-xs font-bold text-slate-600">
                Active Selection: <strong className="text-purple-700">{bachelorsGender === 'all' ? 'All Genders' : `${bachelorsGender} Occupancy`}</strong> • <strong className="text-purple-700">{bachelorsOption === 'all' ? 'All Accommodations' : bachelorsOption}</strong>
              </span>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-500">Sort Prices:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-purple-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="recommended">Recommended Ranking</option>
                  <option value="price-asc">Price: Low to High (Ascending)</option>
                  <option value="price-desc">Price: High to Low (Descending)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 2. BIKES PORTION (BUY, RENT, SELL TABS + ALL VEHICLES & PRICE ASCENDING SORT) */}
        {activeCategory === 'Bikes' && (
          <div className="mb-8 p-6 bg-amber-50/80 rounded-3xl border border-amber-200/80 shadow-sm space-y-5">
            
            {/* Buy, Rent, Sell Intent Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
              <div>
                <span className="text-xs font-black uppercase text-amber-900 flex items-center mb-1">
                  <Bike className="w-4 h-4 mr-1.5 text-amber-600" /> Bikes & Scooters Section
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Select Buy, Rent, or Sell listings for bikes and scooters
                </span>
              </div>

              {/* Sell, Buy, Rent Toggles */}
              <div className="flex bg-white p-1 rounded-2xl border border-amber-200 shadow-sm">
                {[
                  { id: 'all', label: 'All Bikes' },
                  { id: 'buy', label: 'Buy Bikes' },
                  { id: 'rent', label: 'Rent Bikes' },
                  { id: 'sell', label: 'Sell Bikes' }
                ].map(intent => (
                  <button
                    key={intent.id}
                    onClick={() => setVehicleIntent(intent.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      vehicleIntent === intent.id
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {intent.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Options Filter & Sort By Price Ascending */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-amber-900 mb-1.5">
                  Bike Type Filter
                </label>
                <select
                  value={vehicleFilter}
                  onChange={(e) => setVehicleFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-amber-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="all">All Vehicles</option>
                  <option value="Cruiser">Cruiser Bikes</option>
                  <option value="Electric EV">Electric EV Scooters</option>
                  <option value="Sports">Sports Bikes</option>
                  <option value="Commuter">Commuter Bikes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-amber-900 mb-1.5">
                  Sort Prices (Prices in Ascending Order)
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-amber-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="price-asc">Prices: Ascending Order (Low to High)</option>
                  <option value="price-desc">Prices: Descending Order (High to Low)</option>
                  <option value="recommended">Recommended Ranking</option>
                </select>
              </div>
            </div>

          </div>
        )}

        {/* 3. CARS PORTION (BUY, RENT, SELL TABS + ALL VEHICLES & PRICE ASCENDING SORT) */}
        {activeCategory === 'Cars' && (
          <div className="mb-8 p-6 bg-blue-50/80 rounded-3xl border border-blue-200/80 shadow-sm space-y-5">
            
            {/* Buy, Rent, Sell Intent Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-200 pb-4">
              <div>
                <span className="text-xs font-black uppercase text-blue-900 flex items-center mb-1">
                  <Car className="w-4 h-4 mr-1.5 text-blue-600" /> Cars & EVs Section
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Select Buy, Rent, or Sell listings for cars and SUVs
                </span>
              </div>

              {/* Sell, Buy, Rent Toggles */}
              <div className="flex bg-white p-1 rounded-2xl border border-blue-200 shadow-sm">
                {[
                  { id: 'all', label: 'All Cars' },
                  { id: 'buy', label: 'Buy Cars' },
                  { id: 'rent', label: 'Rent Cars' },
                  { id: 'sell', label: 'Sell Cars' }
                ].map(intent => (
                  <button
                    key={intent.id}
                    onClick={() => setVehicleIntent(intent.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      vehicleIntent === intent.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {intent.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Options Filter & Sort By Price Ascending */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-blue-900 mb-1.5">
                  Car Type Filter
                </label>
                <select
                  value={vehicleFilter}
                  onChange={(e) => setVehicleFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="all">All Vehicles</option>
                  <option value="SUV">SUV / Off-road</option>
                  <option value="EV">Electric EV Cars</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-blue-900 mb-1.5">
                  Sort Prices (Prices in Ascending Order)
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="price-asc">Prices: Ascending Order (Low to High)</option>
                  <option value="price-desc">Prices: Descending Order (High to Low)</option>
                  <option value="recommended">Recommended Ranking</option>
                </select>
              </div>
            </div>

          </div>
        )}

        {/* 4. GENERAL PROPERTY PORTION SORT & FILTER TOOLBAR */}
        {activeCategory !== 'For Bachelors' && activeCategory !== 'Bikes' && activeCategory !== 'Cars' && (
          <div className="mb-8 p-5 bg-slate-50/90 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200/60">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-700">
                <SlidersHorizontal className="w-4 h-4 text-brand-500" />
                <span>Property Sort & Filter Toolbar</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-500 flex items-center">
                  <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="recommended">Recommended (Default)</option>
                  <option value="price-asc">Cost: Low to High (Ascending)</option>
                  <option value="price-desc">Cost: High to Low (Descending)</option>
                  <option value="bhk-asc">BHK: 1 BHK to 4+ BHK</option>
                  <option value="area-asc">Sq. Feet: Smallest First</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block font-bold text-slate-500 uppercase tracking-wider text-[11px] mb-2">
                  BHK Filter
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['all', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'].map(bhk => (
                    <button
                      key={bhk}
                      onClick={() => setSelectedBhk(bhk)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        selectedBhk === bhk
                          ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {bhk === 'all' ? 'All BHKs' : bhk}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block font-bold text-slate-500 uppercase tracking-wider text-[11px] mb-2">
                  Cost Range
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All Costs' },
                    { id: 'under50L', label: '< ₹50 Lakhs' },
                    { id: '50Lto2Cr', label: '₹50L - ₹2 Cr' },
                    { id: 'above2Cr', label: '> ₹2 Cr' }
                  ].map(cost => (
                    <button
                      key={cost.id}
                      onClick={() => setSelectedPriceRange(cost.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        selectedPriceRange === cost.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {cost.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skeleton Loader State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 shadow-sm">
                <div className="w-full aspect-[16/10] rounded-xl skeleton-shimmer" />
                <div className="h-4 w-1/3 rounded skeleton-shimmer" />
                <div className="h-6 w-3/4 rounded skeleton-shimmer" />
                <div className="h-10 w-full rounded-xl skeleton-shimmer" />
              </div>
            ))}
          </div>
        ) : processedProperties.length === 0 ? (
          /* Empty Search State */
          <div className="py-16 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 max-w-2xl mx-auto my-8">
            <SearchX className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No listings match your selection</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto mb-4">
              Try resetting your filters or switching categories.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Listing Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSeeDetails={onSeeDetails}
                onUnlockPaywall={onUnlockPaywall}
                onOpenInquiry={onOpenInquiry}
                isUnlocked={unlockedPropertyIds.includes(property.id)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
