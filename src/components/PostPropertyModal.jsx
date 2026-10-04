import React, { useState } from 'react';
import { X, Upload, CheckCircle2, Shield, UserCheck, FileText, Bike, Car, Building2, User, Key } from 'lucide-react';

export default function PostPropertyModal({ onClose, onPostSuccess }) {
  const [category, setCategory] = useState('Apartment'); // Apartment, Villa, Flat, Land / Plot, Bachelors, Bikes, Cars
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [locality, setLocality] = useState('');
  const [price, setPrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [bhk, setBhk] = useState('2 BHK');
  const [description, setDescription] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [hostelPgName, setHostelPgName] = useState('');

  // Dedicated Vehicle Specific State
  const [vehicleIntent, setVehicleIntent] = useState('sell'); // 'sell', 'rent', 'buy'
  const [vehicleSubType, setVehicleSubType] = useState('Cruiser'); // Bikes: Cruiser, Electric EV, Sports, Commuter; Cars: SUV, EV, Sedan, Hatchback
  const [kmsDriven, setKmsDriven] = useState('');
  const [fuelType, setFuelType] = useState('Petrol');

  // Vehicle Documents state (Up to 10 documents, max 100MB each)
  const [documents, setDocuments] = useState([]);
  const [docUploadMsg, setDocUploadMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const isVehicle = category === 'Bikes' || category === 'Cars';

  const handleDocumentChange = (e) => {
    const files = Array.from(e.target.files);
    if (documents.length + files.length > 10) {
      setDocUploadMsg("⚠️ Maximum 10 documents allowed!");
      return;
    }

    const validFiles = [];
    for (let f of files) {
      if (f.size > 100 * 1024 * 1024) {
        setDocUploadMsg(`⚠️ File "${f.name}" exceeds maximum allowed size of 100 MB.`);
        return;
      }
      validFiles.push(f.name);
    }

    setDocuments([...documents, ...validFiles]);
    setDocUploadMsg(`✅ ${validFiles.length} document(s) attached successfully.`);
  };

  const handleRemoveDoc = (docName) => {
    setDocuments(documents.filter(d => d !== docName));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || (isVehicle ? `${vehicleSubType} ${category} in ${locality || city}` : `${bhk} ${category} in ${locality || city}`),
          category,
          type: isVehicle ? vehicleIntent : 'sell',
          subType: isVehicle ? vehicleSubType : undefined,
          bhk: isVehicle ? `${kmsDriven || '5,000'} km` : bhk,
          price: parseFloat(price || 500000),
          rentPrice: rentPrice ? parseFloat(rentPrice) : undefined,
          priceFormatted: isVehicle 
            ? (vehicleIntent === 'rent' ? `₹ ${price || 800} / day` : `₹ ${(parseFloat(price || 150000) / 100000).toFixed(2)} Lakhs`) 
            : `₹ ${(parseFloat(price || 5000000) / 100000).toFixed(2)} Lakhs`,
          city,
          locality: locality || 'Central',
          description,
          kmsDriven: isVehicle ? kmsDriven : undefined,
          fuelType: isVehicle ? fuelType : undefined,
          ownerName,
          ownerPhone,
          ownerEmail,
          hostelPgName: category === 'Bachelors' ? hostelPgName : undefined,
          documentsCount: documents.length
        })
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMsg("🎉 Your listing with owner & document details has been published live!");
        if (onPostSuccess) onPostSuccess(data.property);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Upload className="w-3.5 h-3.5 text-brand-500" />
              <span>Owner & Seller Post Portal</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Create New Listing
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Insert Property, Bachelor Accommodations, Bike, or Car details on Lenin Technologies platform.
            </p>
          </div>

          {successMsg ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-emerald-900">{successMsg}</h3>
            </div>
          ) : (
            <>
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  1. Select Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Apartment', 'Villa', 'Flat', 'Land / Plot', 'Bachelors', 'Bikes', 'Cars'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat);
                        if (cat === 'Bikes') setVehicleSubType('Cruiser');
                        if (cat === 'Cars') setVehicleSubType('SUV');
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                        category === cat
                          ? 'border-brand-500 bg-brand-50 text-brand-600 shadow-sm'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* DEDICATED VEHICLE SECTION FOR BIKES AND CARS */}
              {isVehicle ? (
                <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                    <span className="text-xs font-extrabold uppercase text-amber-900 flex items-center">
                      {category === 'Bikes' ? <Bike className="w-4 h-4 mr-1.5 text-amber-600" /> : <Car className="w-4 h-4 mr-1.5 text-amber-600" />}
                      Dedicated {category} Seller Details
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      Vehicle Specific Fields
                    </span>
                  </div>

                  {/* Vehicle Intent Selector: Buy, Rent, Sell */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-amber-900 mb-1.5">
                      Listing Purpose / Intent
                    </label>
                    <div className="flex bg-white p-1 rounded-xl border border-amber-200 shadow-sm">
                      {[
                        { id: 'sell', label: `Sell ${category}` },
                        { id: 'rent', label: `Rent Out ${category}` },
                        { id: 'buy', label: `Buy Request` }
                      ].map(intent => (
                        <button
                          key={intent.id}
                          type="button"
                          onClick={() => setVehicleIntent(intent.id)}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                            vehicleIntent === intent.id
                              ? 'bg-amber-500 text-white shadow-sm'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {intent.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Type SubType & Model Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-amber-900 mb-1">
                        {category === 'Bikes' ? 'Bike Type' : 'Car Type'}
                      </label>
                      <select
                        value={vehicleSubType}
                        onChange={(e) => setVehicleSubType(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-xl text-xs font-bold text-slate-800"
                      >
                        {category === 'Bikes' ? (
                          <>
                            <option value="Cruiser">Cruiser Bikes</option>
                            <option value="Electric EV">Electric EV Scooters</option>
                            <option value="Sports">Sports Bikes</option>
                            <option value="Commuter">Commuter Bikes</option>
                          </>
                        ) : (
                          <>
                            <option value="SUV">SUV / Off-road</option>
                            <option value="EV">Electric EV Cars</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Hatchback">Hatchback</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-900 mb-1">
                        Vehicle Brand & Model Name
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={category === 'Bikes' ? 'e.g. Royal Enfield Hunter 350' : 'e.g. Mahindra Thar LX 4x4'}
                        className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Kilometers Driven & Fuel/Power Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-amber-900 mb-1">
                        Kilometers Driven (Kms)
                      </label>
                      <input
                        type="text"
                        value={kmsDriven}
                        onChange={(e) => setKmsDriven(e.target.value)}
                        placeholder="e.g. 4,500 km"
                        className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-xl text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-900 mb-1">
                        Fuel / Power Type
                      </label>
                      <select
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-xl text-xs font-bold text-slate-800"
                      >
                        <option value="Petrol">Petrol</option>
                        <option value="Electric EV">Electric EV</option>
                        <option value="Diesel">Diesel</option>
                      </select>
                    </div>
                  </div>

                  {/* Vehicle Condition Description */}
                  <div>
                    <label className="block text-xs font-bold text-amber-900 mb-1">
                      {category} Condition & Service History
                    </label>
                    <textarea
                      rows="2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detail vehicle condition, company servicing, battery health, scratches, tires..."
                      className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-xl text-xs font-medium"
                    />
                  </div>

                  {/* Vehicle Documents Upload (Max 10 files, 100 MB limit) */}
                  <div className="space-y-2 pt-1 border-t border-amber-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold uppercase text-amber-900 flex items-center">
                        <FileText className="w-3.5 h-3.5 mr-1 text-amber-600" />
                        Upload Vehicle Documents (RC, Insurance, PUC)
                      </span>
                      <span className="text-[10px] text-amber-700">Max 10 files (Up to 100 MB)</span>
                    </div>

                    <div className="relative border-2 border-dashed border-amber-300 rounded-xl p-3 text-center bg-white hover:bg-amber-50/50 transition-colors">
                      <input
                        type="file"
                        multiple
                        onChange={handleDocumentChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                      <span className="text-xs font-bold text-slate-700 block">Click to attach vehicle documents</span>
                    </div>

                    {documents.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {documents.map(d => (
                          <span key={d} className="inline-flex items-center px-2 py-1 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                            📄 {d}
                            <button type="button" onClick={() => handleRemoveDoc(d)} className="ml-1 text-red-600 font-extrabold">×</button>
                          </span>
                        ))}
                      </div>
                    )}
                    {docUploadMsg && <p className="text-xs font-bold text-amber-800">{docUploadMsg}</p>}
                  </div>
                </div>
              ) : (
                /* PROPERTY SPECIFIC FIELDS */
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Listing Title</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Prestige Cyber Sky Villa"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">BHK Specification</label>
                      <select
                        value={bhk}
                        onChange={(e) => setBhk(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      >
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK</option>
                        <option value="4+ BHK">4+ BHK</option>
                      </select>
                    </div>
                  </div>

                  {category === 'Bachelors' && (
                    <div>
                      <label className="block text-xs font-bold text-purple-800 mb-1">Hostel & PG Name</label>
                      <input
                        type="text"
                        value={hostelPgName}
                        onChange={(e) => setHostelPgName(e.target.value)}
                        placeholder="e.g. Stanza Living Campus / Zolo Stays Male PG"
                        className="w-full px-3.5 py-2.5 bg-purple-50 border border-purple-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows="2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Property highlights, ventilation, nearby metro..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                </>
              )}

              {/* Price & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isVehicle ? (vehicleIntent === 'rent' ? 'Daily Rent Price (₹/day)' : 'Selling Price (₹)') : 'Expected Price / Rent (₹)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={isVehicle ? (vehicleIntent === 'rent' ? 'e.g. 900' : 'e.g. 175000') : 'e.g. 5000000'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  >
                    {['Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Locality & Address</label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Indiranagar 100ft Road"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              {/* OWNER CONTACT INFORMATION */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-extrabold uppercase text-slate-800 flex items-center">
                  <UserCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
                  Owner Contact Credentials
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Owner Name</label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      placeholder="owner@lenintech.com"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm shadow-xl shadow-brand-500/30 transition-all uppercase tracking-wide disabled:opacity-50"
              >
                {submitting ? 'Publishing Listing...' : `Publish ${category} Listing`}
              </button>
            </>
          )}

        </form>

      </div>
    </div>
  );
}
