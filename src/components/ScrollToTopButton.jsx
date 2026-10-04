import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to Top"
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-xl shadow-brand-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20 ${
        visible
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-75 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-6 h-6 stroke-[2.5]" />
    </button>
  );
}
