import React, { useState } from 'react';
import { X, UserCheck, Shield, Phone, Mail, Building2, KeyRound, Eye, PlusCircle, Scale, Sparkles } from 'lucide-react';

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [role, setRole] = useState('broker'); // buyer, seller, broker, admin
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const roleAuthorities = {
    buyer: {
      title: "Buyer / Rentee",
      btnText: "Sign In to BUYER / RENTEE Portal",
      defaultName: "Aditi Sharma",
      defaultEmail: "buyer@lenintech.com",
      icon: Eye,
      authorityText: "👁️ View & Call Broker Authority: Access property & vehicle viewable details, click to call assigned broker directly."
    },
    seller: {
      title: "Property Owner",
      btnText: "Sign In to PROPERTY OWNER Portal",
      defaultName: "Rajesh Kumar Sharma",
      defaultEmail: "owner@lenintech.com",
      icon: PlusCircle,
      authorityText: "✍️ Insertion Authority: Insert property & vehicle information, pricing, payment details, and vehicle documents (up to 10 files, 100MB)."
    },
    broker: {
      title: "Registered Broker",
      btnText: "Sign In to BROKER Portal",
      defaultName: "Vikram Malhotra (Broker)",
      defaultEmail: "broker@lenintech.com",
      icon: Scale,
      authorityText: "⚖️ Dual Authority: View BOTH Property Owner & Land details AND Buyer/Rentee lead inquiries & contact details."
    },
    admin: {
      title: "Platform Admin",
      btnText: "Sign In to ADMIN Portal",
      defaultName: "Platform Admin",
      defaultEmail: "admin@lenintech.com",
      icon: Shield,
      authorityText: "⚡ Full Governance: Platform-wide control over listings, lead routing, payments, and system operations."
    }
  };

  const currentAuth = roleAuthorities[role];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      name: name || currentAuth.defaultName,
      email: email || currentAuth.defaultEmail,
      role: role,
      authorityDesc: currentAuth.authorityText
    };
    onLoginSuccess(userObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-brand-500/30">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Broker / User Portal
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Sign in to manage listings, track broker lead assignments, and unlock entitlements.
            </p>
          </div>

          {/* Role Switcher matching media_1791122900375.png */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select User Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'broker', label: 'Registered Broker' },
                { id: 'buyer', label: 'Buyer / Rentee' },
                { id: 'seller', label: 'Property Owner' },
                { id: 'admin', label: 'Platform Admin' }
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                    role === r.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Dynamic Authority Explanation Banner */}
            <div className="mt-3 p-3 rounded-xl bg-brand-50/80 border border-brand-200/80 text-[11px] text-brand-900 font-medium leading-relaxed">
              {currentAuth.authorityText}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={currentAuth.defaultName}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Credentials</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={currentAuth.defaultEmail}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm shadow-xl shadow-brand-500/30 transition-all uppercase tracking-wide"
          >
            {currentAuth.btnText}
          </button>

        </form>

      </div>
    </div>
  );
}
