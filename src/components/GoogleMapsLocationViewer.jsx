import React, { useState } from 'react';
import { MapPin, Navigation, Compass, ExternalLink, ShieldCheck, Layers, Train, Building, Hospital, School, ShoppingBag, Plane } from 'lucide-react';

export default function GoogleMapsLocationViewer({ property }) {
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' | 'satellite'

  const locality = property?.locality || 'Indiranagar';
  const city = property?.city || 'Bangalore';
  const state = property?.state || 'Karnataka';
  const address = property?.address || `${locality}, ${city}, ${state}, India`;
  const locationQuery = `${address}`;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAAKjx0dOpSXp3u_0Z_PEsBdvOg_z5g8lw';

  // Official Google Maps Embed API URL using your API Key
  const googleEmbedUrl = (apiKey && !apiKey.includes('YourActualApiKey'))
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(locationQuery)}&maptype=${mapType === 'satellite' ? 'satellite' : 'roadmap'}`
    : `https://maps.google.com/maps?q=${encodeURIComponent(locationQuery)}&t=${mapType === 'satellite' ? 'k' : 'm'}&z=14&ie=UTF8&iwloc=&output=embed`;

  const googleExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationQuery)}`;

  const nearbyLandmarks = [
    { icon: Train, title: "Metro Station", distance: "450 meters", duration: "5 min walk", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { icon: Building, title: "IT / Commercial Park", distance: "1.2 km", duration: "4 min drive", color: "text-brand-400 bg-brand-500/10 border-brand-500/30" },
    { icon: Hospital, title: "Hospital & Healthcare", distance: "1.8 km", duration: "6 min drive", color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
    { icon: School, title: "International School", distance: "1.1 km", duration: "3 min drive", color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
    { icon: ShoppingBag, title: "Shopping Mall & Supermarket", distance: "800 meters", duration: "8 min walk", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
    { icon: Plane, title: "International Airport", distance: "28 km", duration: "45 min drive", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" }
  ];

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center">
          <Navigation className="w-4 h-4 text-brand-500 mr-2" />
          Google Maps Location & Nearby Landmarks (India)
        </h3>

        {/* Map Type Switcher */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-3 py-1 rounded-lg transition-all ${
                mapType === 'roadmap' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Roadmap View
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-3 py-1 rounded-lg transition-all ${
                mapType === 'satellite' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satellite View
            </button>
          </div>

          <a
            href={googleExternalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-600 border border-brand-200 text-xs font-bold transition-all"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embedded Google Map Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-lg h-72 bg-slate-900">
        <iframe
          title={`Google Map - ${address}`}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={googleEmbedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        />

        {/* Floating Location Pill */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-white text-xs font-bold flex items-center space-x-2 shadow-xl">
          <MapPin className="w-4 h-4 text-brand-500 animate-bounce" />
          <div>
            <div className="font-extrabold text-white leading-none">{locality}, {city}</div>
            <div className="text-[10px] text-slate-300 mt-0.5">{state}, India</div>
          </div>
        </div>
      </div>

      {/* Nearby Locations Grid */}
      <div>
        <span className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5">
          Nearby Transit & Access Points in {locality}, {city}:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {nearbyLandmarks.map((lm, idx) => {
            const Icon = lm.icon;
            return (
              <div key={idx} className={`p-2.5 rounded-xl border text-left space-y-1 ${lm.color}`}>
                <div className="flex items-center justify-between">
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-black">{lm.duration}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">{lm.title}</div>
                <div className="text-[11px] font-extrabold text-slate-700">{lm.distance}</div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
