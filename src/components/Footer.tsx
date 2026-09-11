import React from 'react';
import { ActiveTab } from '../types';
import { Sparkles, ShieldCheck, ShoppingBag, Heart, MapPin, Store, Compass, Handshake, Crown } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#2C1810] text-[#FDFBF7] border-t border-[#C5A059]/40 pt-16 pb-24 lg:pb-14 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-batik-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg overflow-hidden shadow-md border border-[#C5A059]/40">
                <img
                  src="/image/logo.jpg"
                  alt="Solorogin Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif font-bold text-lg text-[#FDFBF7] tracking-widest uppercase">
                Solorogin
              </span>
            </div>
            <p className="text-xs text-[#D7CCC8] font-serif leading-relaxed">
              Platform digital yang menghadirkan Batik Nusantara lengkap dengan cerita, filosofi,
              tata cara pemakaian, hingga ragam jenisnya — menghubungkan pengrajin keraton dengan
              generasi modern melalui teknologi keaslian blockchain.
            </p>
            <div className="text-[11px] text-[#C5A059] font-mono">
              Polygon Smart Contract: 0x7F2B...c94A0
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-xs text-[#C5A059] uppercase tracking-[0.25em]">
              Eksplorasi Budaya
            </h4>
            <ul className="space-y-2 text-xs text-[#D7CCC8] font-serif">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#C5A059] transition-colors flex items-center gap-2 cursor-pointer">
                  <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Solorogin Heritage</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('matcher')} className="hover:text-[#C5A059] transition-colors flex items-center gap-2 cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Solorogin Matcher</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketplace')} className="hover:text-[#C5A059] transition-colors flex items-center gap-2 cursor-pointer">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Solorogin Market</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shops')} className="hover:text-[#C5A059] transition-colors flex items-center gap-2 cursor-pointer">
                  <Store className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Solorogin Store</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blockchain')} className="hover:text-[#C5A059] transition-colors flex items-center gap-2 cursor-pointer">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Solorogin Passpor</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('loyalty')} className="hover:text-[#C5A059] transition-colors flex items-center gap-2 cursor-pointer">
                  <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Solorogin Rewards</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('partnership')} className="hover:text-[#C5A059] transition-colors flex items-center gap-2 cursor-pointer">
                  <Handshake className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Solorogin Partnership</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Wilayah Sentra Pengrajin */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-xs text-[#C5A059] uppercase tracking-[0.25em]">
              Sentra Wastra & Kriya
            </h4>
            <ul className="space-y-1.5 text-xs text-[#D7CCC8] font-serif">
              <li className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[#C5A059]" /> Surakarta: Batik Sogan Keraton & Tenun Klaten
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[#C5A059]" /> Yogyakarta: Batik Nitik Imogiri & Wayang Kulit
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[#C5A059]" /> Cirebon: Batik Megamendung Pesisiran
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[#C5A059]" /> Pekalongan: Batik Sekar Jagad & Pesisir
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[#C5A059]" /> Kudus: Batik Kudus Kretek Herritage
              </li>
            </ul>
          </div>

          {/* Col 4: Jaminan Budaya */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-xs text-[#C5A059] uppercase tracking-[0.25em]">
              Kehormatan Tradisi
            </h4>
            <div className="p-4 rounded-xl rounded-tr-[28px] bg-[#1E0F0A] border border-[#C5A059]/30 space-y-2">
              <p className="text-xs text-[#E0D5C1] font-serif italic">
                "Memayu Hayuning Bawana, Ambrasta Dur Hangkara"
              </p>
              <p className="text-[11px] text-[#A89685] font-serif leading-relaxed">
                Dukungan 100% royalti adil langsung untuk maestro dan pembatik perempuan di desa-desa sentra Jawa.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3E2723] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89685] font-sans">
          <p>© 2026 PT Solorogin Nusantara. Dilindungi Hak Cipta Kebudayaan Indonesia & UNESCO Heritage.</p>
          <div className="flex items-center gap-2">
            <span>Dibuat dengan cinta Nusantara</span>
            <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-current" />
            <span>untuk Dunia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
