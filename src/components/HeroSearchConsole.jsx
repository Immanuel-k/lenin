import React, { useState } from 'react';
import { 
  Search, MapPin, Building, Home, CheckSquare, Sparkles, 
  ArrowRight, Shield, Layers, DollarSign, UserCheck, CheckCircle2,
  Bike, Car, User, PlusCircle
} from 'lucide-react';

const CITIES = ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai"];

const POPULAR_LOCALITIES = {
  "Bangalore": ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "Electronic City", "JP Nagar"],
  "Mumbai": ["Powai", "Bandra West", "Andheri West", "Worli", "Thane", "Juhu"],
  "Delhi NCR": ["Cyber City", "Golf Course Road", "Sector 62", "Dwarka", "Vasant Kunj"],
  "Hyderabad": ["Gachibowli", "HITEC City", "Jubilee Hills", "Banjara Hills", "Kondapur"],
  "Pune": ["Wakad", "Baner", "Viman Nagar", "Kharadi"],
  "Chennai": ["Velachery", "OMR", "Anna Nagar", "Adyar"]
};

export default function HeroSearchConsole({ onSearch, onPostSuccess, currentUser }) {
  const [consoleMode, setConsoleMode] = useState('Properties'); // 'Properties' | 'Bachelors' | 'Bikes' | 'Cars'
  const [activeTab, setActiveTab] = useState('buy'); // 'buy' | 'rent' | 'sell'

  const isBuyerRole = currentUser && currentUser.role === 'buyer';

  // Buy Tab State
  const [buyCity, setBuyCity] = useState('Bangalore');
  const [buyLocalities, setBuyLocalities] = useState(['Indiranagar']);
  const [localityInput, setLocalityInput] = useState('');
  const [buyPropertyType, setBuyPropertyType] = useState('Full House'); // 'Full House' | 'Land/Plot'
  const [buyBhk, setBuyBhk] = useState('all'); // 'all', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'
  const [buyStatus, setBuyStatus] = useState('all');

  // Rent Tab State
  const [rentCity, setRentCity] = useState('Bangalore');
  const [rentLocalities, setRentLocalities] = useState(['Whitefield']);
  const [rentLocalityInput, setRentLocalityInput] = useState('');
  const [rentType, setRentType] = useState('Full House');
  const [rentBhk, setRentBhk] = useState('all');

  // For Bachelors Console State
  const [bachelorsGender, setBachelorsGender] = useState('all'); // 'all', 'Male', 'Female'
  const [bachelorsOption, setBachelorsOption] = useState('all'); // 'all', 'PG', 'Hostel', '1 BHK', '2 BHK', '3 BHK'

  // Vehicle Console State
  const [vehicleFilter, setVehicleFilter] = useState('all'); // Subtype

  const handleAddLocality = (city, locality, setList, currentList) => {
    if (locality && !currentList.includes(locality)) {
      setList([...currentList, locality]);
    }
  };

  const handleRemoveLocality = (locality, setList, currentList) => {
    setList(currentList.filter(l => l !== locality));
  };

  const handlePropertySearchSubmit = (e) => {
    e.preventDefault();
    onSearch({
      category: 'Home',
      type: activeTab,
      city: buyCity,
      localities: buyLocalities,
      subType: buyPropertyType,
      bhk: buyBhk,
      status: buyStatus
    });
  };

  const handleBachelorsSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({
      category: 'Bachelors',
      gender: bachelorsGender,
      subType: (bachelorsOption === 'PG' || bachelorsOption === 'Hostel') ? bachelorsOption : undefined,
      bhk: (bachelorsOption !== 'PG' && bachelorsOption !== 'Hostel') ? bachelorsOption : undefined,
      city: buyCity,
      localities: buyLocalities
    });
  };

  const handleVehicleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({
      category: consoleMode, // 'Bikes' or 'Cars'
      type: activeTab,
      city: buyCity,
      localities: buyLocalities,
      subType: vehicleFilter,
      sort: 'price-asc'
    });
  };

  return (
    <section className="relative pt-10 pb-16 bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-950 text-alabaster-50 overflow-hidden transition-colors duration-300">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2c354215_1px,transparent_1px),linear-gradient(to_bottom,#2c354215_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Tagline Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lenin Real Estate & Mobility Console</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Find Real Estate, Bachelors Stay & Mobility with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-amber-400">Zero Brokerage</span>
          </h1>
          <p className="mt-3 text-alabaster-300 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            India's most transparent technology platform connecting buyers, sellers, rentees, and verified brokers seamlessly.
          </p>
        </div>

        {/* PRIMARY MARKETPLACE MODE SWITCHER TABS (Properties, For Bachelors, Bikes, Cars) */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-charcoal-900/90 p-1.5 rounded-2xl border border-charcoal-700 shadow-2xl gap-1 overflow-x-auto scrollbar-none">
            {[
              { id: 'Properties', label: 'Properties', icon: Home },
              { id: 'Bachelors', label: 'For Bachelors', icon: User, badge: 'Male & Female' },
              { id: 'Bikes', label: 'Bikes & Scooters', icon: Bike, badge: 'Buy/Rent/Sell' },
              { id: 'Cars', label: 'Cars & EVs', icon: Car, badge: 'Buy/Rent/Sell' }
            ].map(m => {
              const Icon = m.icon;
              const isActive = consoleMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setConsoleMode(m.id);
                    setActiveTab('buy');
                  }}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 scale-[1.02]'
                      : 'text-alabaster-300 hover:text-white hover:bg-charcoal-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{m.label}</span>
                  {m.badge && (
                    <span className={`hidden sm:inline-block ml-1 text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                      isActive ? 'bg-white/20 text-white' : 'bg-charcoal-800 text-alabaster-300'
                    }`}>
                      {m.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Search Console Card */}
        <div className="bg-alabaster-50 text-charcoal-900 rounded-3xl shadow-hero border border-alabaster-200 overflow-hidden">
          
          {/* TAB BAR FOR PROPERTIES, BIKES & CARS */}
          {consoleMode !== 'Bachelors' && (
            <div className="flex border-b border-alabaster-200 bg-alabaster-100/80 p-2">
              {[
                { id: 'buy', label: `Buy ${consoleMode === 'Properties' ? '' : consoleMode}`, icon: Home },
                { id: 'rent', label: `Rent ${consoleMode === 'Properties' ? '' : consoleMode}`, icon: Building },
                ...(!isBuyerRole ? [{ id: 'sell', label: `Sell / List ${consoleMode === 'Properties' ? '' : consoleMode}`, icon: Layers }] : [])
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3.5 px-4 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 scale-[1.01]'
                        : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-alabaster-200/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* 1. PROPERTIES CONSOLE MODE */}
          {consoleMode === 'Properties' && (
            <form onSubmit={handlePropertySearchSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* City Selector */}
                <div className="md:col-span-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                    Select City
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-500" />
                    <select
                      value={buyCity}
                      onChange={(e) => {
                        setBuyCity(e.target.value);
                        setBuyLocalities([POPULAR_LOCALITIES[e.target.value]?.[0] || 'Center']);
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-alabaster-300 rounded-xl text-charcoal-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>
                </div>

                {/* Localities Autocomplete */}
                <div className="md:col-span-8">
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                    Search Localities in {buyCity}
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-charcoal-400" />
                    <input
                      type="text"
                      value={localityInput}
                      onChange={(e) => setLocalityInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (localityInput.trim()) {
                            handleAddLocality(buyCity, localityInput.trim(), setBuyLocalities, buyLocalities);
                            setLocalityInput('');
                          }
                        }
                      }}
                      placeholder="Type locality (e.g. Indiranagar, Whitefield) & press Enter..."
                      className="w-full pl-10 pr-4 py-3 bg-white border border-alabaster-300 rounded-xl text-charcoal-900 font-medium placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {buyLocalities.map(loc => (
                      <span key={loc} className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                        {loc}
                        <button type="button" onClick={() => handleRemoveLocality(loc, setBuyLocalities, buyLocalities)} className="ml-1.5 text-brand-500 hover:text-brand-800 font-extrabold">×</button>
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Property Type & BHK Type */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-alabaster-100 p-4 rounded-2xl border border-alabaster-200">
                <div className="lg:col-span-4">
                  <span className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">Property Type</span>
                  <div className="flex space-x-2">
                    {['Full House', 'Land/Plot'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setBuyPropertyType(t)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          buyPropertyType === t ? 'bg-brand-500 text-white border-brand-500 shadow-sm' : 'bg-white text-charcoal-700 border-alabaster-300 hover:border-alabaster-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <span className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">BHK Type</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['all', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((bhk) => (
                      <button
                        key={bhk}
                        type="button"
                        onClick={() => setBuyBhk(bhk)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                          buyBhk === bhk ? 'bg-charcoal-900 text-white border-charcoal-900 shadow-sm' : 'bg-white text-charcoal-700 border-alabaster-300 hover:border-alabaster-400'
                        }`}
                      >
                        {bhk === 'all' ? 'Any BHK' : bhk}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-2xl font-extrabold text-sm shadow-xl shadow-brand-500/30 transition-all hover:scale-[1.02]"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          )}

          {/* 2. FOR BACHELORS CONSOLE MODE */}
          {consoleMode === 'Bachelors' && (
            <form onSubmit={handleBachelorsSearchSubmit} className="p-6 space-y-6 bg-alabaster-100/60">
              <div className="flex items-center justify-between border-b border-alabaster-200 pb-3">
                <span className="text-xs font-black uppercase text-charcoal-900 flex items-center">
                  <User className="w-4 h-4 mr-1.5 text-brand-500" /> For Bachelors Search Console
                </span>
                <span className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                  Male & Female PG / Hostel / 1, 2, 3 BHK
                </span>
              </div>

              {/* Gender Occupancy Selector */}
              <div>
                <label className="block text-xs font-extrabold uppercase text-charcoal-700 mb-2">
                  Select Occupancy Gender:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'All Genders' },
                    { id: 'Male', label: 'Male Occupancy' },
                    { id: 'Female', label: 'Female Occupancy' }
                  ].map(g => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setBachelorsGender(g.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        bachelorsGender === g.id
                          ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/30'
                          : 'bg-white text-charcoal-700 border-alabaster-300 hover:bg-alabaster-200'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occupancy Type Selector */}
              <div>
                <label className="block text-xs font-extrabold uppercase text-charcoal-700 mb-2">
                  Select Accommodations / BHK Type:
                </label>
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
                      type="button"
                      onClick={() => setBachelorsOption(opt.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        bachelorsOption === opt.id
                          ? 'bg-charcoal-900 text-white border-charcoal-900 shadow-sm'
                          : 'bg-white text-charcoal-700 border-alabaster-300 hover:bg-alabaster-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City & Search */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-2 border-t border-alabaster-200">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">City</label>
                  <select
                    value={buyCity}
                    onChange={(e) => setBuyCity(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-alabaster-300 rounded-xl text-charcoal-900 font-semibold"
                  >
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="sm:col-span-4 flex items-end">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Bachelors</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* 3 & 4. BIKES & CARS CONSOLE MODE */}
          {(consoleMode === 'Bikes' || consoleMode === 'Cars') && (
            <form onSubmit={handleVehicleSearchSubmit} className="p-6 space-y-6 bg-alabaster-100/60">
              <div className="flex items-center justify-between border-b border-alabaster-200 pb-3">
                <span className="text-xs font-black uppercase text-charcoal-900 flex items-center">
                  {consoleMode === 'Bikes' ? <Bike className="w-4 h-4 mr-1.5 text-brand-500" /> : <Car className="w-4 h-4 mr-1.5 text-brand-500" />}
                  {consoleMode} Marketplace Search Console
                </span>
                <span className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                  Buy, Rent, or Sell {consoleMode}
                </span>
              </div>

              {/* Vehicle SubType Filter */}
              <div>
                <label className="block text-xs font-extrabold uppercase text-charcoal-700 mb-2">
                  Select {consoleMode} Type:
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setVehicleFilter('all')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      vehicleFilter === 'all' ? 'bg-brand-500 text-white border-brand-500 shadow-sm' : 'bg-white text-charcoal-700 border-alabaster-300'
                    }`}
                  >
                    All Vehicles
                  </button>
                  {(consoleMode === 'Bikes' ? ['Cruiser', 'Electric EV', 'Sports', 'Commuter'] : ['SUV', 'EV', 'Sedan', 'Hatchback']).map(sub => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setVehicleFilter(sub)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        vehicleFilter === sub ? 'bg-brand-500 text-white border-brand-500 shadow-sm' : 'bg-white text-charcoal-700 border-alabaster-300'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* City & Search */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-2 border-t border-alabaster-200">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">City</label>
                  <select
                    value={buyCity}
                    onChange={(e) => setBuyCity(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-alabaster-300 rounded-xl text-charcoal-900 font-semibold"
                  >
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="sm:col-span-4 flex items-end">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search {consoleMode}</span>
                  </button>
                </div>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
