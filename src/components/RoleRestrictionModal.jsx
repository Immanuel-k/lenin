import React from 'react';
import { X, ShieldAlert, ArrowRight, UserCheck, PlusCircle, Building2 } from 'lucide-react';

export default function RoleRestrictionModal({ currentUser, onClose, onSwitchToOwner }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-5 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center mx-auto shadow-md">
            <ShieldAlert className="w-7 h-7 stroke-[2.2]" />
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Buyer / Rentee View-Only Authority
            </h3>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed font-medium">
              You are currently signed in as <strong>{currentUser?.name || "Buyer / Rentee"}</strong> with <strong>View & Call Broker Authority</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
            <div className="font-bold text-slate-800 flex items-center">
              <span className="w-2 h-2 rounded-full bg-amber-500 mr-2" />
              Role Permission Rules:
            </div>
            <ul className="text-slate-600 space-y-1.5 pl-4 list-disc text-[11px] leading-relaxed">
              <li><strong>Buyer / Rentee Role:</strong> View property & vehicle details, call broker, and submit lead inquiries.</li>
              <li><strong>Property Owner Role:</strong> Full authority to insert property details, vehicle info, pricing, payment data & documents.</li>
            </ul>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                onClose();
                onSwitchToOwner();
              }}
              className="w-full py-3 px-5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Switch to Property Owner Account</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
            >
              Continue as Buyer / Rentee
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
