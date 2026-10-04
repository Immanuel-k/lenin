import React from 'react';
import { Building2, Sparkles } from 'lucide-react';

export default function BrandedLoader({ message = "Loading Properties..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md">
      <div className="flex flex-col items-center space-y-4">
        {/* Pulsing Logo Banner */}
        <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-500 text-white shadow-xl shadow-brand-500/30 animate-pulse">
          <Building2 className="w-10 h-10 stroke-[2.2]" />
          <div className="absolute -top-1 -right-1 bg-amber-400 p-1 rounded-full text-slate-900 shadow">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
        
        {/* Brand Text */}
        <div className="text-center">
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            LENIN <span className="text-brand-500 font-normal">TECHNOLOGIES</span>
          </div>
          <p className="text-xs font-medium text-slate-500 tracking-wider uppercase mt-1">
            Real Estate Technology Platform
          </p>
        </div>

        {/* Pulsing Shimmer Bar */}
        <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden relative mt-2">
          <div className="absolute inset-y-0 bg-gradient-to-r from-brand-500 to-amber-400 rounded-full animate-shimmer" style={{ width: '60%' }}></div>
        </div>

        <p className="text-sm font-semibold text-slate-600 animate-pulse mt-2">{message}</p>
      </div>
    </div>
  );
}
