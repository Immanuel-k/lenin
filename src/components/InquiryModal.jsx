import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Phone, Mail, User, X, Building2 } from 'lucide-react';

export default function InquiryModal({ property, regionFilter, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [assignedBrokerResult, setAssignedBrokerResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property ? property.id : 'regional-enquiry',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || `Hi, I want to enquire about property in ${property ? property.locality : regionFilter?.city || 'Bangalore'}`
        })
      });
      const data = await response.json();
      if (data.success) {
        setAssignedBrokerResult(data.inquiry?.assignedBroker || data.assignedBroker);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!assignedBrokerResult ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5 text-brand-500" />
                <span>Broker Intermediation Gateway</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Submit Property Enquiry
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your request will be routed directly to a certified local platform broker for {property ? property.locality : regionFilter?.city || 'Bangalore'}.
              </p>
            </div>

            {property && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-400 font-bold block uppercase">Target Property:</span>
                <span className="font-extrabold text-slate-900 block mt-0.5">{property.title}</span>
                <span className="text-brand-500 font-bold">{property.priceFormatted}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aditi Sundaram"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aditi@domain.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message / Visit Preference</label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="I would like to schedule a site visit this weekend..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm shadow-xl shadow-brand-500/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {submitting ? (
                <span>Routing Enquiry to Platform Broker...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit & Route Lead to Broker</span>
                </>
              )}
            </button>

          </form>
        ) : (
          /* ASSIGNED BROKER CONFIRMATION DISPLAY */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                Lead Successfully Intermediated
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Enquiry Routed to Platform Broker
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Our automated lead-routing engine assigned your enquiry to the designated platform broker for this locality.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white text-left space-y-3 shadow-xl">
              <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider block">
                Assigned Platform Intermediary
              </span>
              <div className="text-base font-extrabold text-white">
                {assignedBrokerResult.name || assignedBrokerResult.agentName}
              </div>
              <div className="text-xs text-slate-300">
                Lead Agent: <strong className="text-white">{assignedBrokerResult.agentName}</strong>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center space-x-2 text-white">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate">{assignedBrokerResult.phone}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center space-x-2 text-white">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate">{assignedBrokerResult.email || "broker@lenintech.com"}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 text-white font-extrabold text-sm hover:bg-slate-800 transition-all"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
