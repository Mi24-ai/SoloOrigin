import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, Compass, Store, Bot, Handshake, Heart, Crown, ChevronDown } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  openCart: () => void;
  openAiChat: () => void;
  wishlistCount: number;
  openWishlist: () => void;
  loyaltyPoints: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openAiChat,
  wishlistCount,
  openWishlist,
  loyaltyPoints,
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close "Lainnya" dropdown when clicking outside it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Heritage', icon: Compass },
    { id: 'matcher', label: 'Matcher', icon: Sparkles },
    { id: 'marketplace', label: 'Market', icon: ShoppingBag },
    { id: 'shops', label: 'Store', icon: Store },
  ];

  const moreNavItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'blockchain', label: 'Heritage Proof', icon: ShieldCheck },
    { id: 'partnership', label: 'Partnership', icon: Handshake },
  ];

  const isMoreActive = moreNavItems.some((item) => item.id === activeTab);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E0D5C1] transition-all duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand Identity */}
          <div
            id="brand-logo-btn"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-lg overflow-hidden shadow-md border border-[#C5A059]/40 group-hover:scale-105 transition-transform">
              <img
                src="/image/Craftea.jpg"
                alt="Craftéa Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-serif font-bold text-lg md:text-xl tracking-wider text-[#3E2723]">
              SoloOrigin
            </span>
          </div>

          {/* Desktop Navigation Links (Artistic Flair Editorial Style) */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}-btn`}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 text-xs font-sans uppercase tracking-[0.15em] transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === item.id
                      ? 'text-[#3E2723] font-bold border-b-2 border-[#3E2723]'
                      : 'text-[#5D4037]/80 hover:text-[#3E2723] border-b-2 border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#C5A059]" />
                  {item.label}
                </button>
              );
            })}

            {/* "Lainnya" Dropdown for secondary nav items */}
            <div className="relative" ref={moreRef}>
              <button
                id="nav-more-btn"
                onClick={() => setIsMoreOpen((prev) => !prev)}
                className={`px-3 py-2 text-xs font-sans uppercase tracking-[0.15em] transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isMoreActive
                    ? 'text-[#3E2723] font-bold border-b-2 border-[#3E2723]'
                    : 'text-[#5D4037]/80 hover:text-[#3E2723] border-b-2 border-transparent'
                }`}
              >
                Lainnya
                <ChevronDown className={`w-3.5 h-3.5 text-[#C5A059] transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-[#FDFBF7] border border-[#E0D5C1] rounded-xl shadow-lg overflow-hidden py-1.5 z-50">
                  {moreNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        id={`nav-more-${item.id}-btn`}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMoreOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-xs font-sans uppercase tracking-[0.1em] transition-all flex items-center gap-2.5 cursor-pointer ${
                          activeTab === item.id
                            ? 'text-[#3E2723] font-bold bg-[#F3EFE7]'
                            : 'text-[#5D4037]/80 hover:bg-[#F3EFE7] hover:text-[#3E2723]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-[#C5A059]" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* Swarna Circle (Loyalty) Chip — doubles as nav link + points display */}
            <button
              id="nav-loyalty-btn"
              onClick={() => setActiveTab('loyalty')}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-sans font-semibold transition-colors cursor-pointer ${
                activeTab === 'loyalty'
                  ? 'bg-[#3E2723] text-[#C5A059] border-[#3E2723]'
                  : 'bg-[#F3EFE7] border-[#E0D5C1] text-[#3E2723] hover:bg-[#E0D5C1]/60'
              }`}
              title="Swarna Circle"
            >
              <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{loyaltyPoints.toLocaleString('id-ID')} Poin</span>
            </button>

            {/* AI Batik Advisor Button */}
            <button
              id="open-ai-consultant-btn"
              onClick={openAiChat}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3E2723] text-[#FDFBF7] text-xs font-sans tracking-wider uppercase hover:bg-[#5D4037] shadow-xs transition-all border border-[#C5A059]/40 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Dalang AI</span>
            </button>

            {/* Wishlist Button */}
            <button
              id="open-wishlist-drawer-btn"
              onClick={openWishlist}
              className="relative p-2.5 rounded-full bg-[#F3EFE7] border border-[#E0D5C1] text-[#3E2723] hover:bg-[#E0D5C1]/60 transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 text-[#3E2723]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#3E2723] text-[#C5A059] border border-[#C5A059] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="open-cart-drawer-btn"
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-[#F3EFE7] border border-[#E0D5C1] text-[#3E2723] hover:bg-[#E0D5C1]/60 transition-colors cursor-pointer"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag className="w-4 h-4 text-[#3E2723]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#3E2723] text-[#C5A059] border border-[#C5A059] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};