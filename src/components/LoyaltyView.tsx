import React, { useState } from 'react';
import { LOYALTY_TIERS, getCurrentTier, getNextTier } from '../data/loyaltyData';
import {
  Sparkles,
  Award,
  Copy,
  CheckCircle2,
  Users,
  Crown
} from 'lucide-react';

interface LoyaltyViewProps {
  points: number;
  referralCode: string;
  characterCollectionCount: number;
}

export const LoyaltyView: React.FC<LoyaltyViewProps> = ({
  points,
  referralCode,
  characterCollectionCount
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const currentTier = getCurrentTier(points);
  const nextTier = getNextTier(points);

  const progressPercent = nextTier
    ? Math.min(100, Math.round(((points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100))
    : 100;

  const handleCopyReferral = () => {
    try {
      navigator.clipboard.writeText(referralCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Crown className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
            Swarna Circle Membership
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#3E2723]">
          Poin, Tingkatan <span className="italic font-normal">& Kehormatan Anggota</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#5D4037] font-serif leading-relaxed">
          Setiap transaksi mengumpulkan poin kehormatan yang membuka tingkatan dan keistimewaan baru.
        </p>
      </div>

      {/* Points & Tier Card */}
      <div className="bg-[#2C1810] rounded-3xl rounded-tr-[56px] p-6 sm:p-10 border border-[#C5A059] shadow-xl text-[#FDFBF7] relative overflow-hidden max-w-4xl mx-auto">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
          <div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-none bg-[#C5A059]/20 text-[#C5A059] font-sans uppercase tracking-widest border border-[#C5A059]/30">
              Tingkatan Saat Ini
            </span>
            <h3 className="text-3xl font-serif font-bold text-[#FDFBF7] mt-1.5">
              {currentTier.name}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#D7CCC8] font-sans uppercase tracking-wider block">Total Poin</span>
            <span className="text-4xl font-serif font-bold text-[#C5A059]">{points.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative space-y-2">
          <div className="w-full h-2.5 rounded-full bg-[#1C0E07] border border-[#3E2723] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C5A059] to-[#D4AF37] transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-[#D7CCC8] font-sans">
            {nextTier
              ? `${nextTier.minPoints - points} poin lagi menuju tingkat ${nextTier.name}`
              : 'Kamu telah mencapai tingkatan tertinggi — Ningrat!'}
          </p>
        </div>

        {/* Perks of current tier */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-5 mt-5 border-t border-[#3E2723]">
          {currentTier.perks.map((perk, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-sans text-[#D7CCC8]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span>{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* All Tiers Overview */}
      <div className="max-w-5xl mx-auto space-y-4">
        <h3 className="text-xl font-serif text-[#3E2723] text-center">Seluruh Tingkatan Keanggotaan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LOYALTY_TIERS.map((tier) => {
            const isActive = tier.name === currentTier.name;
            return (
              <div
                key={tier.name}
                className={`p-5 rounded-2xl border space-y-3 transition-all ${
                  isActive
                    ? 'bg-[#3E2723] border-[#C5A059] shadow-lg scale-[1.02]'
                    : 'bg-[#FDFBF7] border-[#E0D5C1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Award className={`w-5 h-5 ${isActive ? 'text-[#C5A059]' : 'text-[#8D6E63]'}`} />
                  {isActive && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#C5A059] text-[#2C1810] font-sans font-bold uppercase">
                      Aktif
                    </span>
                  )}
                </div>
                <div>
                  <h4 className={`font-serif font-bold text-base ${isActive ? 'text-[#FDFBF7]' : 'text-[#3E2723]'}`}>
                    {tier.name}
                  </h4>
                  <p className={`text-[10px] font-sans ${isActive ? 'text-[#D7CCC8]' : 'text-[#8D6E63]'}`}>
                    Min. {tier.minPoints.toLocaleString('id-ID')} poin
                  </p>
                </div>
                <ul className="space-y-1">
                  {tier.perks.map((p, i) => (
                    <li key={i} className={`text-[10px] font-serif flex items-start gap-1 ${isActive ? 'text-[#D7CCC8]' : 'text-[#5D4037]'}`}>
                      <span className="text-[#C5A059]">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Referral Program */}
      <div className="max-w-4xl mx-auto bg-[#F3EFE7] rounded-3xl rounded-tr-[48px] p-6 sm:p-8 border border-[#E0D5C1] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C5A059]" />
              <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
                Ajak Kerabat
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-light text-[#3E2723]">
              Bagikan Kode Referral, <span className="italic font-normal">Dapatkan Poin Bersama</span>
            </h3>
            <p className="text-xs text-[#5D4037] font-serif leading-relaxed">
              Setiap kerabat yang berbelanja menggunakan kodemu akan mendapat diskon 5% untuk
              pembelian pertama, dan kamu mendapat 50 poin kehormatan sebagai ucapan terima kasih.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="bg-[#FDFBF7] rounded-2xl p-5 border border-[#E0D5C1] space-y-3">
              <span className="text-[10px] text-[#8D6E63] uppercase tracking-wider font-sans font-semibold block">
                Kode Referralmu
              </span>
              <div className="flex items-center gap-2">
                <span className="flex-1 px-3 py-2.5 rounded-none bg-[#F3EFE7] border border-[#E0D5C1] font-mono text-sm text-[#3E2723] font-bold tracking-wider">
                  {referralCode}
                </span>
                <button
                  id="copy-referral-code-btn"
                  onClick={handleCopyReferral}
                  className="p-2.5 rounded-none bg-[#3E2723] text-[#FDFBF7] hover:bg-[#5D4037] transition-colors cursor-pointer shrink-0"
                  title="Salin Kode"
                >
                  {isCopied ? <CheckCircle2 className="w-4 h-4 text-[#C5A059]" /> : <Copy className="w-4 h-4 text-[#C5A059]" />}
                </button>
              </div>
              {isCopied && (
                <p className="text-[10px] text-[#2F8F4E] font-sans font-semibold">✓ Kode disalin ke clipboard!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Character Collection Gamification Teaser */}
      <div className="max-w-4xl mx-auto bg-[#3E2723] rounded-3xl rounded-tr-[48px] p-6 sm:p-8 border border-[#C5A059]/40 text-center space-y-3">
        <Sparkles className="w-6 h-6 text-[#C5A059] mx-auto" />
        <h3 className="text-xl font-serif font-light text-[#FDFBF7]">
          Koleksi Elemen Jiwamu: <span className="font-bold text-[#C5A059]">{characterCollectionCount} / 5</span>
        </h3>
        <p className="text-xs text-[#D7CCC8] font-serif max-w-md mx-auto">
          Setiap kali menyelesaikan Tes Karakter Batik dengan hasil elemen berbeda, koleksimu bertambah.
          Lengkapi kelima elemen semesta (Api, Air, Tanah, Udara, Eter) untuk membuka lencana istimewa.
        </p>
      </div>

    </div>
  );
};