import React from 'react';
import { 
  Building2, PlusCircle, UserCheck, ShieldCheck, PhoneCall, 
  User, Bike, Car, Home 
} from 'lucide-react';

export default function Navbar({ 
  activeCategory, 
  setActiveCategory, 
  onOpenPostProperty, 
  onOpenAuth,
  currentUser,
  userEntitlementsCount = 0,
  onNavigateToGrid
}) {
  const categories = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Apartment', label: 'Apartment' },
    { id: 'Villa', label: 'Villa' },
    { id: 'Flat', label: 'Flat' },
    { id: 'All Property', label: 'All Property' },
    { id: 'For Bachelors', label: 'For Bachelors', badge: 'PG/Hostel', icon: User },
    { id: 'Bikes', label: 'Bikes', badge: 'Buy/Rent/Sell', icon: Bike },
    { id: 'Cars', label: 'Cars', badge: 'Buy/Rent/Sell', icon: Car }
  ];

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    if (catId === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onNavigateToGrid) {
      onNavigateToGrid();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-alabaster-50/95 backdrop-blur-md border-b border-alabaster-200 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => {
            setActiveCategory('Home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <Building2 className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-charcoal-900 tracking-tight leading-none group-hover:text-brand-500 transition-colors">
              LENIN <span className="text-brand-500 font-bold">TECHNOLOGIES</span>
            </div>
            <div className="text-[11px] font-semibold text-charcoal-500 tracking-wider uppercase mt-1">
              Real Estate & Mobility Marketplace
            </div>
          </div>
        </div>

        {/* Center: Categorical Menu */}
        <nav className="hidden lg:flex items-center space-x-1 bg-alabaster-100 p-1.5 rounded-xl border border-alabaster-200 overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-alabaster-50'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 mr-0.5" />}
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className={`ml-1 text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-alabaster-200 text-charcoal-600'
                  }`}>
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Action Triggers */}
        <div className="flex items-center space-x-3">
          
          {userEntitlementsCount > 0 && (
            <span className="hidden xl:inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              {userEntitlementsCount} Direct Passes
            </span>
          )}

          {/* Post Listing Trigger */}
          <button
            onClick={onOpenPostProperty}
            className="flex items-center space-x-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-brand-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Post Listing</span>
            <span className="sm:hidden">Post</span>
          </button>

          {/* Broker / User Login Trigger */}
          <button
            onClick={onOpenAuth}
            className="flex items-center space-x-2 bg-alabaster-100 hover:bg-alabaster-200 text-charcoal-900 border border-alabaster-300 px-3.5 py-2 rounded-xl font-semibold text-xs transition-all duration-200 shadow-sm"
          >
            {currentUser ? (
              <>
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <div className="text-left leading-tight">
                  <div className="font-bold text-charcoal-900 max-w-[90px] truncate">{currentUser.name}</div>
                  <div className="text-[9px] font-extrabold text-brand-600 uppercase">
                    {currentUser.role === 'seller' ? 'Owner' : currentUser.role === 'buyer' ? 'Buyer/Rentee' : currentUser.role}
                  </div>
                </div>
              </>
            ) : (
              <>
                <PhoneCall className="w-4 h-4 text-brand-500" />
                <span>Broker / User Login</span>
              </>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
