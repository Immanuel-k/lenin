import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, CheckCircle2, CreditCard, Sparkles, X, 
  Copy, Phone, Mail, UserCheck, ArrowRight 
} from 'lucide-react';

export default function PaywallModal({ property, onClose, onUnlockSuccess }) {
  if (!property) return null;

  const [processing, setProcessing] = useState(false);
  const [unlockedOwner, setUnlockedOwner] = useState(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [step, setStep] = useState(1); // 1: Paywall intro, 2: Payment simulated checkout, 3: Unlocked Contact Info

  const handleInitializePayment = async () => {
    setProcessing(true);
    try {
      // 1. Create payment order on backend
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId: property.id, userId: 'user_buyer_demo' })
      });
      const orderData = await orderRes.json();

      // 2. Simulate Razorpay checkout process (500ms delay)
      setTimeout(async () => {
        // 3. Verify payment signature on backend
        const verifyRes = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderData.orderId,
            paymentId: `pay_lenin_${Date.now()}`,
            propertyId: property.id,
            userId: 'user_buyer_demo'
          })
        });
        const verifyData = await verifyRes.json();
        
        if (verifyData.success) {
          setUnlockedOwner(verifyData.unmaskedOwnerInfo || property.ownerInfo);
          setStep(3);
          onUnlockSuccess(property.id);
        }
        setProcessing(false);
      }, 1200);

    } catch (err) {
      console.error(err);
      setProcessing(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header Badge */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>Lenin Direct Owner VIP Pass</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Unlock Direct Owner Access
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Connect directly with the owner of <strong className="text-slate-800">{property.title}</strong>
              </p>
            </div>

            {/* Savings & Benefit Checklist */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs font-bold">
                <span className="text-slate-500">Estimated Brokerage Fee:</span>
                <span className="text-red-500 line-through">₹ 1,50,000 (2%)</span>
              </div>
              <div className="flex items-center justify-between text-sm font-extrabold text-slate-900">
                <span className="text-slate-700">Lenin Premium Direct Pass:</span>
                <span className="text-brand-500 text-lg">₹ 5,000</span>
              </div>
            </div>

            {/* Bullet List */}
            <div className="space-y-2.5 text-xs text-slate-700 font-semibold">
              {[
                "100% Direct Owner Phone & Email Unlocked Immediately",
                "0% Brokerage Commission Payable Ever",
                "Instant WhatsApp & Call Connection",
                "Verified RERA & Property Title Authenticated",
                "Valid for Lifetime Access to this Property"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Payment Trigger CTA */}
            <button
              onClick={handleInitializePayment}
              disabled={processing}
              className="w-full py-4 px-6 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-black text-base shadow-xl shadow-brand-500/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing ₹5,000 Gateway...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Pay ₹5,000 & Unlock Owner Contact</span>
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-slate-400 font-medium">
              🔒 Encrypted 256-Bit SSL Checkout | Instant Refund Policy Guarantee
            </div>

          </div>
        )}

        {/* STEP 3: UNLOCKED DIRECT OWNER CONTACT */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <UserCheck className="w-10 h-10 stroke-[2.2]" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                Direct Pass Activated
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Owner Credentials Unlocked!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                You now have lifetime direct access to contact the owner of <strong className="text-slate-800">{property.title}</strong>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white text-left space-y-4 shadow-xl">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Property Owner</span>
                <div className="text-lg font-extrabold text-white">
                  {unlockedOwner?.name || property.ownerInfo?.name || "Rajesh Kumar Sharma"}
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified Direct Landlord
                </span>
              </div>

              {/* Phone Number Unmasked */}
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <Phone className="w-4 h-4 text-brand-400" />
                  <span>{unlockedOwner?.phone || "+91 98765 43210"}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(unlockedOwner?.phone || "+91 98765 43210", 'phone')}
                  className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold text-white flex items-center space-x-1 transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedPhone ? 'Copied!' : 'Copy Phone'}</span>
                </button>
              </div>

              {/* Email Unmasked */}
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <Mail className="w-4 h-4 text-brand-400" />
                  <span>{unlockedOwner?.email || "rajesh.sharma@gmail.com"}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(unlockedOwner?.email || "rajesh.sharma@gmail.com", 'email')}
                  className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold text-white flex items-center space-x-1 transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 text-white font-extrabold text-sm hover:bg-slate-800 transition-all"
            >
              Done & Return to Property
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
