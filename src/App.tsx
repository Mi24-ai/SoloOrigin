import React, { useState, useEffect } from 'react';
import { ActiveTab, Product, BatikMotif, CartItem } from './types';
import { PRODUCTS } from './data/batikData';
import { generateReferralCode, POINTS_PER_RUPIAH } from './data/loyaltyData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { HeritageExplorer } from './components/HeritageExplorer';
import { PersonalityMatcher } from './components/PersonalityMatcher';
import { Marketplace } from './components/Marketplace';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BlockchainVerifier } from './components/BlockchainVerifier';
import { ArtisanShopsView } from './components/ArtisanShopsView';
import { CartDrawer } from './components/CartDrawer';
import { AIBatikConsultant } from './components/AIBatikConsultant';
import { MobileAppBottomNav } from './components/MobileAppBottomNav';
import { Footer } from './components/Footer';
import { PartnershipView } from './components/PartnershipView';
import { WishlistDrawer } from './components/WishlistDrawer';
import { LoyaltyView } from './components/LoyaltyView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedMotifFilter, setSelectedMotifFilter] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('swarna_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [blockchainTokenToInspect, setBlockchainTokenToInspect] = useState<string | null>(null);

  // --- WISHLIST STATE ---
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('swarna_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // --- LOYALTY & REFERRAL STATE ---
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('swarna_loyalty_points');
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [referralCode] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('swarna_referral_code');
      if (saved) return saved;
      const generated = generateReferralCode();
      localStorage.setItem('swarna_referral_code', generated);
      return generated;
    } catch {
      return generateReferralCode();
    }
  });

  // --- PERSONALITY MATCHER GAMIFICATION STATE ---
  const [characterCollection, setCharacterCollection] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('swarna_character_collection');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('swarna_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('swarna_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {}
  }, [wishlistItems]);

  useEffect(() => {
    try {
      localStorage.setItem('swarna_loyalty_points', JSON.stringify(loyaltyPoints));
    } catch (e) {}
  }, [loyaltyPoints]);

  useEffect(() => {
    try {
      localStorage.setItem('swarna_character_collection', JSON.stringify(characterCollection));
    } catch (e) {}
  }, [characterCollection]);

  const handleAddToCart = (
    product: Product,
    options?: { woodenBox?: boolean; nfcSeal?: boolean; giftWrap?: boolean }
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        if (options?.woodenBox !== undefined) copy[existingIdx].woodenBoxPackaging = options.woodenBox;
        if (options?.giftWrap !== undefined) copy[existingIdx].giftWrap = options.giftWrap;
        return copy;
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          woodenBoxPackaging: options?.woodenBox || false,
          customNfcSeal: options?.nfcSeal || true,
          giftWrap: options?.giftWrap || false
        }
      ];
    });
    // Otomatis lepas dari wishlist begitu masuk keranjang
    setWishlistItems((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectMotifFromHeritage = (motif: BatikMotif) => {
    setSelectedMotifFilter(motif.id);
  };

  const handleOpenBlockchainPassport = (tokenId: string) => {
    setBlockchainTokenToInspect(tokenId);
    setActiveTab('blockchain');
  };

  // --- WISHLIST HANDLERS ---
  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId: string) => wishlistItems.some((p) => p.id === productId);

  // --- LOYALTY HANDLER ---
  // Dipanggil CartDrawer setiap checkout sukses; 1 poin per Rp 10.000 transaksi.
  const handleEarnLoyaltyPoints = (grandTotal: number) => {
    const earned = Math.max(1, Math.round(grandTotal * POINTS_PER_RUPIAH));
    setLoyaltyPoints((prev) => prev + earned);
  };

  // --- PERSONALITY MATCHER GAMIFICATION HANDLER ---
  const handleCollectCharacterElement = (element: string) => {
    setCharacterCollection((prev) => (prev.includes(element) ? prev : [...prev, element]));
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalWishlistCount = wishlistItems.length;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3E2723] flex flex-col font-serif selection:bg-[#C5A059]/30">

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openAiChat={() => setIsAiChatOpen(true)}
        wishlistCount={totalWishlistCount}
        openWishlist={() => setIsWishlistOpen(true)}
        loyaltyPoints={loyaltyPoints}
      />

      <main className="flex-1 pb-16 lg:pb-0">
        {activeTab === 'home' && (
          <>
            <HeroBanner onNavigate={setActiveTab} />
            <HeritageExplorer
              onSelectMotif={handleSelectMotifFromHeritage}
              onNavigate={setActiveTab}
            />
          </>
        )}

        {activeTab === 'matcher' && (
          <PersonalityMatcher
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigate={setActiveTab}
            onCollectCharacterElement={handleCollectCharacterElement}
            characterCollectionCount={characterCollection.length}
          />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            onNavigate={setActiveTab}
            selectedMotifFilter={selectedMotifFilter}
            wishlistIds={wishlistItems.map((p) => p.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeTab === 'shops' && (
          <ArtisanShopsView
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'blockchain' && (
          <BlockchainVerifier
            initialTokenId={blockchainTokenToInspect}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {activeTab === 'partnership' && (
          <PartnershipView />
        )}

        {activeTab === 'loyalty' && (
          <LoyaltyView
            points={loyaltyPoints}
            referralCode={referralCode}
            characterCollectionCount={characterCollection.length}
          />
        )}
      </main>

      <Footer onNavigate={setActiveTab} />

      {/* Bottom Nav for mobile screens */}
      <MobileAppBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
      />

      {/* MODALS AND DRAWERS */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onNavigate={setActiveTab}
        onOpenBlockchainPassport={handleOpenBlockchainPassport}
        isInWishlist={selectedProduct ? isInWishlist(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckoutSuccess={handleEarnLoyaltyPoints}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemove={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsWishlistOpen(false);
        }}
      />

      <AIBatikConsultant
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
      />

    </div>
  );
}