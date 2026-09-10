import { LoyaltyTierInfo } from '../types';

// 1 poin didapat untuk setiap kelipatan Rp 10.000 transaksi berhasil.
export const POINTS_PER_RUPIAH = 1 / 10000;

export const LOYALTY_TIERS: LoyaltyTierInfo[] = [
  {
    name: 'Sentana',
    minPoints: 0,
    perks: ['Akses katalog & filosofi lengkap', 'Notifikasi motif baru sesuai karakter']
  },
  {
    name: 'Priyayi',
    minPoints: 200,
    perks: ['Diskon 5% kotak kayu jati Jepara', 'Undangan preview koleksi terbatas']
  },
  {
    name: 'Bangsawan',
    minPoints: 600,
    perks: ['Diskon 10% seluruh transaksi', 'Gratis ongkos kirim asuransi', 'Akses pre-order motif langka']
  },
  {
    name: 'Ningrat',
    minPoints: 1500,
    perks: ['Diskon 15% seluruh transaksi', 'Kurator personal 1-on-1', 'Undangan kunjungan sanggar mitra']
  }
];

export const getCurrentTier = (points: number): LoyaltyTierInfo => {
  let current = LOYALTY_TIERS[0];
  for (const tier of LOYALTY_TIERS) {
    if (points >= tier.minPoints) current = tier;
  }
  return current;
};

export const getNextTier = (points: number): LoyaltyTierInfo | null => {
  const next = LOYALTY_TIERS.find(t => t.minPoints > points);
  return next || null;
};

export const generateReferralCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 5; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SWARNA-${suffix}`;
};