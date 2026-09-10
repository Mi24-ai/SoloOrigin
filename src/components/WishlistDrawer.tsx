import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2, Sparkles } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemove,
  onAddToCart,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FDFBF7] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#C5A059] relative">

        {/* Header */}
        <div className="p-6 border-b border-[#E0D5C1] flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C5A059] fill-[#C5A059]" />
            <h3 className="font-serif text-xl text-[#3E2723]">
              Wishlist ({wishlistItems.length})
            </h3>
          </div>
          <button
            id="close-wishlist-drawer-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F3EFE7] text-[#3E2723] hover:bg-[#E0D5C1] flex items-center justify-center transition-colors cursor-pointer border border-[#E0D5C1]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 text-[#C5A059] mx-auto opacity-70" />
              <h4 className="font-serif text-xl text-[#3E2723]">Wishlist Masih Kosong</h4>
              <p className="text-xs text-[#5D4037] font-serif max-w-xs mx-auto">
                Tandai karya yang membuatmu jatuh hati agar mudah ditemukan kembali, meski belum siap membelinya sekarang.
              </p>
            </div>
          ) : (
            wishlistItems.map((product) => (
              <div
                key={product.id}
                id={`wishlist-item-${product.id}`}
                className="p-4 rounded-xl bg-[#FDFBF7] border border-[#E0D5C1] shadow-xs space-y-3"
              >
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-16 h-16 rounded-lg overflow-hidden bg-[#2C1810] shrink-0 border border-[#E0D5C1] cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-serif font-bold text-[#3E2723] truncate">
                      {product.title}
                    </h4>
                    <p className="text-[11px] font-sans text-[#8D6E63]">Motif: {product.motifName}</p>
                    <p className="text-xs font-serif font-bold text-[#3E2723] mt-0.5">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E0D5C1]">
                  <button
                    id={`wishlist-move-cart-${product.id}`}
                    onClick={() => onAddToCart(product)}
                    className="text-xs font-sans font-semibold text-[#3E2723] hover:text-[#C5A059] flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Pindah ke Keranjang</span>
                  </button>

                  <button
                    id={`wishlist-remove-${product.id}`}
                    onClick={() => onRemove(product.id)}
                    className="text-xs text-[#8D6E63] hover:text-red-700 font-sans flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistItems.length > 0 && (
          <div className="p-5 bg-[#F3EFE7] border-t border-[#E0D5C1] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#5D4037] font-serif leading-relaxed">
              Stok karya batik tulis terbatas & tidak diproduksi ulang persis sama. Amankan segera sebelum kehabisan.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};