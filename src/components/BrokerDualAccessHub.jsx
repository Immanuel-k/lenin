import React, { useState, useEffect } from 'react';
import { ShieldCheck, UserCheck, Eye, PhoneCall, Mail, FileText, Layers, Scale, Sparkles, Building2, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function BrokerDualAccessHub({ currentUser, properties = [], onSeeDetails }) {
  const [activeTab, setActiveTab] = useState('owners'); // 'owners' (Property Owner & Land Details) or 'buyers' (Buyer / Rentee Details)
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  return (
    <section className="my-8 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden relative">
      {/* Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4 relative z-10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Broker Dual Authority Workspace Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center">
            Registered Broker Portal & Inspector
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            As a <strong>Registered Broker</strong>, you hold dual authority to access both <strong>Property Owner & Land Details</strong> and <strong>Buyer / Rentee Inquiry Leads</strong>.
          </p>
        </div>

        {/* Dual Tab Switcher */}
        <div className="flex bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setActiveTab('owners')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'owners'
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>1. Owner & Land Details ({properties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('buyers')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'buyers'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>2. Buyer & Rentee Leads ({inquiries.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PROPERTY OWNER & LAND DETAILS */}
      {activeTab === 'owners' && (
        <div className="mt-6 space-y-4 relative z-10">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
            <span>Direct Unmasked Owner Contacts, Land Title Specifications & Vehicle Details:</span>
            <span className="text-emerald-400 font-bold">Unmasked Full Broker Access</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.slice(0, 6).map((prop) => (
              <div key={prop.id} className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 space-y-3 hover:border-brand-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-brand-500/20 text-brand-400 text-[10px] font-black uppercase">
                    {prop.category} • {prop.type.toUpperCase()}
                  </span>
                  <span className="text-xs font-extrabold text-amber-400">{prop.priceFormatted || `₹ ${prop.price}`}</span>
                </div>

                <h4 className="text-sm font-bold text-white line-clamp-1">{prop.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-1">📍 {prop.address || `${prop.locality}, ${prop.city}`}</p>

                {/* Owner Information Card */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                    <span>Owner / Land Holder:</span>
                    <span className="text-emerald-400 font-extrabold">{prop.ownerInfo?.name || "Verified Owner"}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center"><PhoneCall className="w-3 h-3 mr-1 text-emerald-400" /> Phone:</span>
                    <strong className="text-white">{prop.ownerInfo?.phone || "+91 98765 43210"}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center"><Mail className="w-3 h-3 mr-1 text-brand-400" /> Email:</span>
                    <strong className="text-white truncate max-w-[160px]">{prop.ownerInfo?.email || "owner@lenintech.com"}</strong>
                  </div>
                </div>

                <button
                  onClick={() => onSeeDetails && onSeeDetails(prop)}
                  className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1"
                >
                  <span>Inspect Full Land & Owner Files</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BUYER & RENTEE DETAILS */}
      {activeTab === 'buyers' && (
        <div className="mt-6 space-y-4 relative z-10">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
            <span>Incoming Leads from Buyers & Rentees seeking Properties & Vehicles:</span>
            <span className="text-emerald-400 font-bold">Auto-Routed Lead Intermediation</span>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-8 text-center bg-slate-800/40 rounded-2xl border border-dashed border-slate-700">
              <UserCheck className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-400 font-medium">No buyer/rentee leads recorded yet. Submitting inquiry tests will display leads here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                      New Buyer Lead
                    </span>
                    <span className="text-[10px] text-slate-400">{new Date(inq.timestamp).toLocaleDateString()}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white line-clamp-1">{inq.propertyTitle}</h4>

                  {/* Buyer Contact Details */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                      <span>Buyer / Rentee:</span>
                      <span className="text-brand-400 font-extrabold">{inq.buyerName}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center"><PhoneCall className="w-3 h-3 mr-1 text-emerald-400" /> Phone:</span>
                      <strong className="text-white">{inq.buyerPhone}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center"><Mail className="w-3 h-3 mr-1 text-brand-400" /> Email:</span>
                      <strong className="text-white truncate max-w-[160px]">{inq.buyerEmail}</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 italic bg-slate-900/50 p-2.5 rounded-xl border border-slate-800 line-clamp-2">
                    "{inq.message}"
                  </p>

                  <a
                    href={`tel:${inq.buyerPhone}`}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center space-x-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-1" />
                    <span>Call Buyer Back Directly</span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </section>
  );
}
