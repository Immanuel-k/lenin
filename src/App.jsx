import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSearchConsole from './components/HeroSearchConsole';
import RegionalExplorer from './components/RegionalExplorer';
import PropertyGrid from './components/PropertyGrid';
import PropertyDetailModal from './components/PropertyDetailModal';
import PaywallModal from './components/PaywallModal';
import InquiryModal from './components/InquiryModal';
import AuthModal from './components/AuthModal';
import MoreFiltersModal from './components/MoreFiltersModal';
import PostPropertyModal from './components/PostPropertyModal';
import BrokerDualAccessHub from './components/BrokerDualAccessHub';
import RoleRestrictionModal from './components/RoleRestrictionModal';
import StackSpread from './components/ui/stack-spread';
import ScrollToTopButton from './components/ScrollToTopButton';
import BrandedLoader from './components/BrandedLoader';
import { 
  Building2, ShieldCheck, HeartHandshake, Zap, Sparkles, 
  MapPin, CheckCircle, ArrowRight 
} from 'lucide-react';

export default function App() {
  const [initialBooting, setInitialBooting] = useState(true);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Read initial category & params from URL query string
  const getInitialUrlParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      category: searchParams.get('category') || 'Home',
      type: searchParams.get('type') || 'all',
      bhk: searchParams.get('bhk') || 'all',
      gender: searchParams.get('gender') || 'all',
      city: searchParams.get('city') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sort: searchParams.get('sort') || 'recommended'
    };
  };

  const initialUrl = getInitialUrlParams();
  const [activeCategory, setActiveCategory] = useState(initialUrl.category);
  const [activeBhk, setActiveBhk] = useState(initialUrl.bhk);
  const [unlockedPropertyIds, setUnlockedPropertyIds] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Advanced Filters State
  const [advancedFilters, setAdvancedFilters] = useState({
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
  });

  // Modal States
  const [detailModalProperty, setDetailModalProperty] = useState(null);
  const [paywallModalProperty, setPaywallModalProperty] = useState(null);
  const [inquiryModalData, setInquiryModalData] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
  const [isPostPropertyOpen, setIsPostPropertyOpen] = useState(false);
  const [isRoleRestrictionOpen, setIsRoleRestrictionOpen] = useState(false);

  // Search Filter Params
  const [currentFilters, setCurrentFilters] = useState({});

  const scrollToGrid = () => {
    setTimeout(() => {
      const gridElem = document.getElementById('listing-grid-section');
      if (gridElem) {
        gridElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Two-way sync with URL search params
  const updateUrlParams = (cat, filters = {}, advFilters = {}) => {
    const params = new URLSearchParams();
    if (cat && cat !== 'Home') params.set('category', cat);
    if (filters.type && filters.type !== 'all') params.set('type', filters.type);
    if (filters.city) params.set('city', filters.city);
    if (filters.bhk && filters.bhk !== 'all') params.set('bhk', filters.bhk);
    if (advFilters.isVerified) params.set('isVerified', 'true');
    if (advFilters.isDirectOwner) params.set('isDirectOwner', 'true');

    const newRelativePathQuery = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.pushState(null, '', newRelativePathQuery);
  };

  // Fetch properties from Express backend API
  const loadProperties = async (filters = {}, category = activeCategory, bhk = activeBhk) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category && category !== 'Home' && category !== 'All Property') {
        params.append('category', category);
      }
      
      const targetBhk = filters.bhk || bhk;
      if (targetBhk && targetBhk !== 'all') {
        params.append('bhk', targetBhk);
      }

      if (filters.type) params.append('type', filters.type);
      if (filters.city) params.append('city', filters.city);
      if (filters.subType && filters.subType !== 'Full House') params.append('subType', filters.subType);
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.builderOnly) params.append('builderOnly', 'true');
      if (filters.localities && filters.localities.length > 0) {
        params.append('search', filters.localities[0]);
      }

      // Advanced Filters
      if (advancedFilters.furnishing && advancedFilters.furnishing !== 'all') params.append('furnishing', advancedFilters.furnishing);
      if (advancedFilters.petPolicy && advancedFilters.petPolicy !== 'all') params.append('petPolicy', advancedFilters.petPolicy);
      if (advancedFilters.leaseType && advancedFilters.leaseType !== 'all') params.append('leaseType', advancedFilters.leaseType);
      if (advancedFilters.isVerified) params.append('isVerified', 'true');
      if (advancedFilters.hasVideo3D) params.append('hasVideo3D', 'true');
      if (advancedFilters.isDirectOwner) params.append('isDirectOwner', 'true');
      if (advancedFilters.minArea) params.append('minArea', advancedFilters.minArea);
      if (advancedFilters.maxArea) params.append('maxArea', advancedFilters.maxArea);

      const response = await fetch(`/api/properties?${params.toString()}`);
      const data = await response.json();
      if (data.success) {
        setProperties(data.properties);
      }
    } catch (err) {
      console.error("Failed to load properties:", err);
    } finally {
      setLoading(false);
      if (initialBooting) setInitialBooting(false);
    }
  };

  useEffect(() => {
    updateUrlParams(activeCategory, currentFilters, advancedFilters);
    loadProperties(currentFilters, activeCategory, activeBhk);
  }, [activeCategory, activeBhk, advancedFilters]);

  const handleHeroSearch = (filters) => {
    setCurrentFilters(filters);
    if (filters.bhk) setActiveBhk(filters.bhk);
    loadProperties(filters, activeCategory, filters.bhk || activeBhk);
    updateUrlParams(activeCategory, filters, advancedFilters);
    scrollToGrid();
  };

  const handleRegionFilterSelect = (cityName, stateName, countryName) => {
    const filters = { city: cityName, state: stateName, country: countryName };
    setCurrentFilters(filters);
    loadProperties(filters, activeCategory, activeBhk);
    scrollToGrid();
  };

  const handleUnlockSuccess = (propertyId) => {
    if (!unlockedPropertyIds.includes(propertyId)) {
      setUnlockedPropertyIds([...unlockedPropertyIds, propertyId]);
    }
  };

  const handlePostPropertySuccess = (newProperty) => {
    setProperties([newProperty, ...properties]);
    scrollToGrid();
  };

  return (
    <div className="min-h-screen bg-alabaster-50 text-charcoal-900 flex flex-col selection:bg-brand-500 selection:text-white font-sans">
      
      {/* Branded Loading Overlay on Boot */}
      {initialBooting && <BrandedLoader message="Initializing Lenin Marketplace Platform..." />}

      {/* Sticky Navigation Bar */}
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeBhk={activeBhk}
        setActiveBhk={setActiveBhk}
        onOpenPostProperty={() => {
          if (currentUser && currentUser.role === 'buyer') {
            setIsRoleRestrictionOpen(true);
          } else {
            setIsPostPropertyOpen(true);
          }
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        userEntitlementsCount={unlockedPropertyIds.length}
        onNavigateToGrid={scrollToGrid}
      />

      {/* Hero Search Console */}
      <div id="hero-search-section">
        <HeroSearchConsole
          onSearch={handleHeroSearch}
          onPostSuccess={handlePostPropertySuccess}
          currentUser={currentUser}
        />
      </div>

      {/* Interactive Stack Spread Glass Showcase */}
      {activeCategory === 'Home' && <StackSpread />}

      {/* Global Discovery & Enquiry Section */}
      <RegionalExplorer
        onOpenInquiry={(regionData) => setInquiryModalData({ regionFilter: regionData })}
        onSelectRegionFilter={handleRegionFilterSelect}
      />

      {/* Broker Dual Access Workspace (For Registered Brokers & Admins) */}
      {currentUser && (currentUser.role === 'broker' || currentUser.role === 'admin') && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BrokerDualAccessHub
            currentUser={currentUser}
            properties={properties}
            onSeeDetails={(prop) => setDetailModalProperty(prop)}
          />
        </div>
      )}

      {/* Property & Marketplace Grid */}
      <div id="listing-grid-section">
        <PropertyGrid
          properties={properties}
          loading={loading}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onSeeDetails={(prop) => setDetailModalProperty(prop)}
          onUnlockPaywall={(prop) => setPaywallModalProperty(prop)}
          onOpenInquiry={(prop) => setInquiryModalData({ property: prop })}
          unlockedPropertyIds={unlockedPropertyIds}
          onOpenMoreFilters={() => setIsMoreFiltersOpen(true)}
          advancedFilters={advancedFilters}
        />
      </div>

      {/* Trust & Platform Feature Highlights Banner */}
      <section className="py-16 bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-charcoal-900 text-alabaster-50 border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Why Homeowners, Buyers & Renters Choose <span className="text-brand-500">Lenin Technologies</span>
            </h2>
            <p className="text-alabaster-300 text-sm mt-2 font-medium">
              Revolutionizing Real Estate, Bachelors Accommodations, and Vehicle Marketplaces with direct owner access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-charcoal-800/60 border border-charcoal-700/80 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">0% Brokerage Direct Owner Access</h3>
              <p className="text-xs text-alabaster-300 leading-relaxed font-medium">
                Unlock direct verified owner phone numbers & emails with a simple ₹5,000 pass and save up to ₹1.5 Lakhs in brokerage commissions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-charcoal-800/60 border border-charcoal-700/80 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Bachelors & Multi-Category Hub</h3>
              <p className="text-xs text-alabaster-300 leading-relaxed font-medium">
                Browse Male & Female PGs, Hostels, Flatshares, and Buy/Rent Bikes and Cars all in one place with advanced filters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-charcoal-800/60 border border-charcoal-700/80 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Verified Listings & 3D Tours</h3>
              <p className="text-xs text-alabaster-300 leading-relaxed font-medium">
                Filter exclusive 100% verified properties and vehicles with 3D virtual video walkthroughs and instant inquiry routing.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-950 text-alabaster-300 py-12 border-t border-charcoal-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-extrabold text-sm tracking-tight">
                LENIN <span className="text-brand-500">TECHNOLOGIES</span>
              </div>
              <div className="text-[10px] text-charcoal-400">
                © {new Date().getFullYear()} Lenin Technologies Marketplace Platform. All rights reserved.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-semibold">
            <button onClick={() => { setActiveCategory('Home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => { setActiveCategory('Apartment'); scrollToGrid(); }} className="hover:text-white transition-colors">Apartments</button>
            <button onClick={() => { setActiveCategory('Villa'); scrollToGrid(); }} className="hover:text-white transition-colors">Villas</button>
            <button onClick={() => { setActiveCategory('Bachelors'); scrollToGrid(); }} className="hover:text-white transition-colors">Bachelors PG/Hostels</button>
            <button onClick={() => { setActiveCategory('Bikes'); scrollToGrid(); }} className="hover:text-white transition-colors">Bikes</button>
            <button onClick={() => { setActiveCategory('Cars'); scrollToGrid(); }} className="hover:text-white transition-colors">Cars</button>
            <button onClick={() => setIsAuthOpen(true)} className="hover:text-white transition-colors">Login</button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {detailModalProperty && (
        <PropertyDetailModal
          property={detailModalProperty}
          onClose={() => setDetailModalProperty(null)}
          onUnlockPaywall={(prop) => {
            setDetailModalProperty(null);
            setPaywallModalProperty(prop);
          }}
          onOpenInquiry={(prop) => {
            setDetailModalProperty(null);
            setInquiryModalData({ property: prop });
          }}
          isUnlocked={unlockedPropertyIds.includes(detailModalProperty.id)}
        />
      )}

      {paywallModalProperty && (
        <PaywallModal
          property={paywallModalProperty}
          onClose={() => setPaywallModalProperty(null)}
          onUnlockSuccess={handleUnlockSuccess}
        />
      )}

      {inquiryModalData && (
        <InquiryModal
          property={inquiryModalData.property}
          regionFilter={inquiryModalData.regionFilter}
          onClose={() => setInquiryModalData(null)}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(user) => setCurrentUser(user)}
        />
      )}

      {isMoreFiltersOpen && (
        <MoreFiltersModal
          filters={advancedFilters}
          setFilters={setAdvancedFilters}
          onClose={() => setIsMoreFiltersOpen(false)}
          totalResultsCount={properties.length}
        />
      )}

      {isPostPropertyOpen && (
        <PostPropertyModal
          onClose={() => setIsPostPropertyOpen(false)}
          onPostSuccess={handlePostPropertySuccess}
        />
      )}

      {isRoleRestrictionOpen && (
        <RoleRestrictionModal
          currentUser={currentUser}
          onClose={() => setIsRoleRestrictionOpen(false)}
          onSwitchToOwner={() => {
            setCurrentUser({
              name: currentUser?.name || "Rajesh Kumar Sharma",
              email: currentUser?.email || "owner@lenintech.com",
              role: 'seller'
            });
            setIsPostPropertyOpen(true);
          }}
        />
      )}

      {/* Floating Scroll-To-Top Button */}
      <ScrollToTopButton />

    </div>
  );
}
