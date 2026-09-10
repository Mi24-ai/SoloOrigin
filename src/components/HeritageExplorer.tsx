import React, { useState } from 'react';
import { BATIK_MOTIFS } from '../data/batikData';
import { BatikMotif, ActiveTab } from '../types';
import {
  Sparkles,
  MapPin,
  Eye,
  ChevronRight,
  CheckCircle2,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Moon,
  ScrollText,
  Award,
  CalendarDays,
  PlayCircle,
  Scissors,
  Stamp,
  Layers,
  Palette,
  PrinterCheck,
  Search,
  XCircle
} from 'lucide-react';

interface HeritageExplorerProps {
  onSelectMotif: (motif: BatikMotif) => void;
  onNavigate: (tab: ActiveTab) => void;
}

// ID video YouTube dokumentasi proses membatik & video cara mengolah batik.
// Ganti nilai ini dengan ID video YouTube-mu (bagian setelah "v=" atau setelah "youtu.be/").
const PROCESS_VIDEO_YOUTUBE_ID = 'Cu-UlVxKfj0';
const HOW_TO_PROCESS_VIDEO_YOUTUBE_ID = 'cQ23gLNBVRs';

// 6 Tahapan Pembuatan Batik Tulis Tradisional — lengkap dengan gambar ilustrasi tiap tahap.
// Ganti path gambar di bawah (folder /public/image/) dengan foto/dokumentasi asli sanggar mitra.
const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Nyorek (Memola)',
    desc: 'Menggambar pola ragam hias motif di atas kain mori primissima menggunakan pensil dengan memperhatikan proporsi sakral.',
    time: '1-3 Hari',
    image: '/image/nyorek.jpg'
  },
  {
    step: '02',
    title: 'Nglowong (Canting Pokok)',
    desc: 'Mencantingkan lilin malam panas tembaga mengikuti garis pola utama dengan ketelitian nafas yang tenang dan stabil.',
    time: '14-30 Hari',
    image: '/image/nglowong.jpg'
  },
  {
    step: '03',
    title: 'Nembok & Nyolet',
    desc: 'Menutup bagian bidang motif yang akan dibiarkan tetap putih/terang dengan malam tebal agar tidak terkena rembesan pewarna.',
    time: '7-14 Hari',
    image: '/image/nyolet.jpg'
  },
  {
    step: '04',
    title: 'Medel (Pencelupan Biru)',
    desc: 'Mencelupkan kain ke dalam bejana pasta daun Indigofera alami berulang kali hingga meresap sempurna ke serat kain terdalam.',
    time: '5-10 Hari',
    image: '/image/medel.jpg'
  },
  {
    step: '05',
    title: 'Mbabar (Pewarnaan Sogan)',
    desc: 'Pencelupan sakral ke dalam sari rebusan kulit kayu Mahoni, Tingi, dan Tegeran untuk menghasilkan warna coklat sogan keraton.',
    time: '10-20 Hari',
    image: '/image/mbabar.jpg'
  },
  {
    step: '06',
    title: 'Nglorot (Pelepasan Malam)',
    desc: 'Merebus kain dalam air mendidih untuk meluruhkan seluruh malam, membilas dengan air sumur jernih, dan menjemur di angin sepoi.',
    time: '2-4 Hari',
    image: '/image/nglorot.jpg'
  }
];

// Jenis-jenis batik berdasarkan teknik pembuatan — sekaligus panduan membedakan batik asli vs cap vs printing.
// Ganti path gambar dengan foto asli tiap teknik bila sudah tersedia.
const BATIK_TECHNIQUES = [
  {
    id: 'tulis',
    name: 'Batik Tulis',
    subtitle: '100% Canting Tangan',
    desc: 'Seluruh motif digoreskan tangan menggunakan canting berisi malam panas, helai demi helai, tanpa bantuan alat cetak. Inilah yang diakui UNESCO sebagai Warisan Budaya Takbenda Dunia.',
    time: '1 - 6 Bulan / lembar',
    price: 'Rp 800.000 - puluhan juta',
    identify: [
      'Motif tembus & nyaris identik di kedua sisi kain',
      'Ada sedikit ketidaksempurnaan garis — jejak khas tangan manusia',
      'Beraroma malam/lilin dan pewarna alami',
      'Tidak ada dua lembar yang benar-benar identik'
    ],
    icon: Scissors,
    image: '/image/tulis.jpg'
  },
  {
    id: 'cap',
    name: 'Batik Cap',
    subtitle: 'Cetak Tembaga Berulang',
    desc: 'Motif dicetak menggunakan cap (canting cap) dari lempeng tembaga berisi malam panas, ditekan berulang ke kain sesuai pola grid. Tetap menggunakan malam, sehingga masih tergolong batik asli.',
    time: '2 - 5 Hari / lembar',
    price: 'Rp 150.000 - 500.000',
    identify: [
      'Motif berulang secara presisi dan simetris',
      'Garis lebih tebal, rapi, dan seragam dibanding batik tulis',
      'Tetap beraroma malam, namun proses jauh lebih cepat'
    ],
    icon: Stamp,
    image: '/image/cap.jpg'
  },
  {
    id: 'kombinasi',
    name: 'Batik Kombinasi',
    subtitle: 'Perpaduan Cap & Tulis',
    desc: 'Motif utama dicetak dengan cap untuk efisiensi, lalu isian dan detail akhir disempurnakan dengan canting tangan. Memadukan kecepatan produksi dengan sentuhan personal.',
    time: '2 - 4 Minggu / lembar',
    price: 'Rp 400.000 - 2.000.000',
    identify: [
      'Kerangka motif sangat presisi (bekas cap)',
      'Namun ada detail isen-isen halus yang terasa digoreskan tangan',
      'Harga di tengah antara batik cap dan batik tulis'
    ],
    icon: Layers,
    image: '/image/kombinasi.jpg'
  },
  {
    id: 'jumputan',
    name: 'Batik Jumputan',
    subtitle: 'Teknik Ikat Celup',
    desc: 'Kain diikat kencang dengan tali di titik-titik tertentu lalu dicelup warna. Bagian yang terikat akan tertahan warnanya, menghasilkan motif bulat bergradasi yang ceria. Tidak memakai canting maupun malam.',
    time: '3 - 7 Hari / lembar',
    price: 'Rp 100.000 - 350.000',
    identify: [
      'Motif berbentuk bulat/gradasi khas bekas ikatan tali',
      'Warna umumnya cerah dan playful',
      'Tidak ada jejak malam atau canting sama sekali'
    ],
    icon: Palette,
    image: '/image/jumputan.jpg'
  },
  {
    id: 'printing',
    name: 'Batik Printing',
    subtitle: 'Cetak Mesin / Sablon Digital',
    desc: 'Secara istilah budaya, ini bukan "batik" karena tidak melalui proses perintangan warna dengan malam — melainkan tekstil bermotif batik yang dicetak mesin atau sablon digital secara massal.',
    time: 'Hitungan jam (massal)',
    price: 'Rp 30.000 - 150.000',
    identify: [
      'Motif hanya tampak di satu sisi kain, sisi belakang polos/pudar',
      'Warna sangat rata dan tajam seperti hasil print',
      'Tidak beraroma malam sama sekali',
      'Harga jauh lebih murah dari batik tulis/cap'
    ],
    icon: PrinterCheck,
    image: '/image/printing.jpg'
  }
];

export const HeritageExplorer: React.FC<HeritageExplorerProps> = ({ onSelectMotif, onNavigate }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeMotifModal, setActiveMotifModal] = useState<BatikMotif | null>(null);

  const regions = [
    { id: 'all', name: 'Semua Wilayah' },
    { id: 'Surakarta (Solo)', name: 'Surakarta (Solo)' },
    { id: 'Yogyakarta', name: 'Yogyakarta' },
    { id: 'Cirebon', name: 'Cirebon' },
    { id: 'Pekalongan', name: 'Pekalongan' }
  ];

  const filteredMotifs = selectedRegion === 'all'
    ? BATIK_MOTIFS
    : BATIK_MOTIFS.filter(m => m.originCity === selectedRegion);

  const getElementIcon = (elem: string) => {
    if (elem.includes('Api')) return <Flame className="w-3.5 h-3.5 text-amber-600" />;
    if (elem.includes('Air')) return <Droplets className="w-3.5 h-3.5 text-sky-600" />;
    if (elem.includes('Udara')) return <Wind className="w-3.5 h-3.5 text-emerald-600" />;
    if (elem.includes('Tanah')) return <Mountain className="w-3.5 h-3.5 text-amber-800" />;
    return <Moon className="w-3.5 h-3.5 text-purple-600" />;
  };

  return (
    <div className="space-y-16 py-8">

      {/* SECTION 0: Page Intro Badge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
              Pusat Edukasi & Ensiklopedia Batik
            </span>
            <div className="w-8 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#3E2723]">
            Menyelami Jiwa <span className="italic font-normal">Batik Nusantara</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5D4037] font-serif leading-relaxed">
            Sebelum membeli atau mengoleksi, kenali dahulu ceritanya. Dari sejarah kelahirannya,
            filosofi tiap motif, tahapan canting yang penuh kesabaran, hingga cara membedakan
            batik tulis asli dari batik cetakan pabrik.
          </p>
        </div>
      </section>

      {/* SECTION 1: Cerita & Sejarah Batik */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          <div className="lg:col-span-6 order-2 lg:order-1 space-y-5">
            <div className="flex items-center gap-2">
              <ScrollText className="w-4 h-4 text-[#C5A059]" />
              <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
                Cerita di Balik Kain
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#3E2723]">
              Sejarah Panjang <span className="italic font-normal">Seni Membatik</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#5D4037] font-serif leading-relaxed">
              <p>
                Kata "batik" dipercaya berasal dari bahasa Jawa <em>"amba"</em> (menulis) dan
                <em> "titik"</em> (titik), yang secara harfiah berarti "menulis titik-titik".
                Seni ini telah tumbuh di lingkungan keraton Jawa sejak masa Kerajaan Majapahit,
                lalu berkembang pesat dan menjadi seni istana yang dijaga ketat di Keraton
                Surakarta dan Yogyakarta.
              </p>
              <p>
                Pada mulanya, banyak motif batik berstatus <em>awisan dalem</em> atau motif
                larangan — hanya boleh dikenakan oleh raja dan kerabat keraton. Seiring waktu,
                batik menyebar ke wilayah pesisir seperti Pekalongan dan Cirebon, berakulturasi
                dengan budaya pendatang (Tiongkok, Arab, Eropa), melahirkan corak pesisiran yang
                lebih bebas dan berwarna cerah.
              </p>
              <p>
                Pada <strong className="text-[#3E2723]">2 Oktober 2009</strong>, UNESCO resmi
                menetapkan Batik Indonesia sebagai <em>Representative List of the Intangible
                Cultural Heritage of Humanity</em>. Sejak itu, tanggal tersebut diperingati
                sebagai Hari Batik Nasional — momen mengenang bahwa batik bukan sekadar kain,
                melainkan identitas dan warisan budaya bangsa.
              </p>
            </div>

            {/* Quick Fact Chips */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#F3EFE7] border border-[#E0D5C1] flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-serif font-bold text-[#3E2723] block">UNESCO 2009</span>
                  <span className="text-[10px] text-[#8D6E63] font-sans">Warisan Budaya Takbenda</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F3EFE7] border border-[#E0D5C1] flex items-start gap-2.5">
                <CalendarDays className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-serif font-bold text-[#3E2723] block">2 Oktober</span>
                  <span className="text-[10px] text-[#8D6E63] font-sans">Hari Batik Nasional</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-4/3 rounded-3xl rounded-tr-[64px] overflow-hidden border border-[#E0D5C1] shadow-xl">
              <img
                src="/image/sejarah batik.jpg"
                alt="Sejarah dan tradisi membatik Jawa"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D06]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-serif italic text-[#E0D5C1]">
                  "Ajining Diri Saka Lathi, Ajining Raga Saka Busana"
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Ensiklopedia Motif & Filosofi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
              Ensiklopedia Motif Batik
            </span>
            <div className="w-8 h-[1px] bg-[#C5A059]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#3E2723]">
            Ragam Motif Batik & <span className="italic font-normal">Makna Filosofisnya</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5D4037] font-serif leading-relaxed">
            Batik bukan sekadar corak indah di atas kain mori. Bagi masyarakat Jawa, batik adalah
            kidung doa, cermin budi pekerti luhur, dan simbol karakter batiniah sang pemakai.
          </p>
        </div>

        {/* Regional Filter Chips */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {regions.map((reg) => (
            <button
              key={reg.id}
              id={`filter-region-${reg.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedRegion(reg.id)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-sans font-medium transition-all cursor-pointer ${
                selectedRegion === reg.id
                  ? 'bg-[#3E2723] text-[#FDFBF7] shadow-sm font-semibold border border-[#3E2723]'
                  : 'bg-[#F3EFE7] text-[#5D4037] border border-[#E0D5C1] hover:bg-[#E0D5C1]/60'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#C5A059]" />
                {reg.name}
              </span>
            </button>
          ))}
        </div>

        {/* Motifs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMotifs.map((motif) => (
            <div
              key={motif.id}
              id={`motif-card-${motif.id}`}
              className="bg-[#FDFBF7] rounded-2xl rounded-tr-[40px] overflow-hidden border border-[#E0D5C1] hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative aspect-16/10 overflow-hidden bg-[#2C1810]">
                <img
                  src={motif.image}
                  alt={motif.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/95 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDFBF7]/90 backdrop-blur-sm text-[#3E2723] font-sans font-semibold shadow-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C5A059]" />
                    {motif.originCity}
                  </span>
                  {motif.isRoyalRestricted && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C5A059] text-[#2C1810] font-sans font-bold shadow-xs uppercase">
                      Awisan Dalem
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] text-[#C5A059] font-serif-editorial uppercase tracking-widest">{motif.javaneseName}</p>
                  <h3 className="text-xl font-serif font-bold text-[#FDFBF7] leading-tight">
                    {motif.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#8D6E63] font-sans font-medium mb-1.5">
                    {getElementIcon(motif.element)}
                    <span>Elemen Semesta: {motif.element}</span>
                  </div>

                  <p className="text-xs text-[#5D4037] font-serif leading-relaxed line-clamp-3">
                    {motif.philosophy}
                  </p>
                </div>

                {/* Aura & Suitable Characters */}
                <div className="pt-3 border-t border-[#E0D5C1] space-y-2">
                  <div className="text-[11px] bg-[#F3EFE7] p-2.5 rounded-xl border border-[#E0D5C1]">
                    <span className="font-bold text-[#3E2723] font-serif block">Aura & Karakter:</span>
                    <span className="text-[#5D4037] font-sans">{motif.aura}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      id={`view-motif-detail-${motif.id}`}
                      onClick={() => setActiveMotifModal(motif)}
                      className="text-xs font-serif font-semibold text-[#3E2723] hover:text-[#C5A059] flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                      Filosofi Lengkap
                    </button>

                    <button
                      id={`match-motif-btn-${motif.id}`}
                      onClick={() => {
                        onSelectMotif(motif);
                        onNavigate('marketplace');
                      }}
                      className="px-3.5 py-1.5 rounded-none bg-[#3E2723] text-[#FDFBF7] text-xs font-sans uppercase tracking-wider hover:bg-[#5D4037] transition-colors flex items-center gap-1"
                    >
                      <span>Katalog Produk</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Proses Pembuatan Batik Tulis (Gambar + Video) */}
      <section className="bg-[#F3EFE7] py-14 border-y border-[#E0D5C1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-sans font-bold text-[#C5A059] uppercase tracking-[0.3em]">
              Proses Tradisi Adiluhung
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#3E2723]">
              6 Langkah Kesabaran <span className="italic font-normal">Batik Tulis Asli</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5D4037] font-serif">
              Setiap helai kain batik tulis melewati meditasi kesabaran sang pembatik hingga berbulan-bulan.
            </p>
          </div>

          {/* Step Cards with Illustrative Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((st) => (
              <div
                key={st.step}
                className="bg-[#FDFBF7] rounded-xl rounded-tr-[30px] border border-[#E0D5C1] relative overflow-hidden shadow-xs hover:border-[#C5A059] transition-colors flex flex-col"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-[#2C1810]">
                  <img
                    src={st.image}
                    alt={st.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D06]/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-2xl font-serif italic text-[#C5A059] drop-shadow-md">
                    {st.step}
                  </span>
                  <span className="absolute bottom-3 right-3 text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDFBF7]/95 border border-[#E0D5C1] text-[#3E2723] font-sans font-semibold">
                    ⏱️ {st.time}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold text-[#3E2723] mb-1 font-serif">
                    {st.title}
                  </h4>
                  <p className="text-xs text-[#5D4037] font-serif leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Video Documentation Panel (Embed YouTube) */}
          <div className="bg-[#2C1810] rounded-3xl rounded-tr-[56px] p-6 sm:p-8 border border-[#C5A059]/40 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
                    Dokumentasi Video
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-light text-[#FDFBF7]">
                  Saksikan Canting Bergerak <span className="italic font-normal text-[#C5A059]">Secara Langsung</span>
                </h3>
                <p className="text-xs text-[#D7CCC8] font-serif leading-relaxed">
                  Video dokumentasi utuh proses membatik dari sanggar mitra, mulai dari nyorek
                  hingga nglorot, agar pengunjung memahami mengapa batik tulis bernilai tinggi.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#5D4037] shadow-lg bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${PROCESS_VIDEO_YOUTUBE_ID}`}
                    title="Dokumentasi Proses Membatik"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Second Video Panel: Cara Mengolah Batik */}
          <div className="bg-[#2C1810] rounded-3xl rounded-tr-[56px] p-6 sm:p-8 border border-[#C5A059]/40 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-3 lg:order-2">
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
                    Tutorial Praktik
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-light text-[#FDFBF7]">
                  Cara Mengolah <span className="italic font-normal text-[#C5A059]">Batik Langkah demi Langkah</span>
                </h3>
                <p className="text-xs text-[#D7CCC8] font-serif leading-relaxed">
                  Video panduan praktis mengolah kain batik, mulai dari persiapan bahan hingga
                  hasil akhir siap pakai — cocok untuk yang ingin memahami tekniknya lebih dalam.
                </p>
              </div>
              <div className="lg:col-span-7 lg:order-1">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#5D4037] shadow-lg bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${HOW_TO_PROCESS_VIDEO_YOUTUBE_ID}`}
                    title="Cara Mengolah Batik"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Jenis-Jenis Batik Berdasarkan Teknik + Cara Membedakan Asli */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
              Kenali Sebelum Membeli
            </span>
            <div className="w-8 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#3E2723]">
            Jenis-Jenis Batik <span className="italic font-normal">Berdasarkan Teknik</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5D4037] font-serif leading-relaxed">
            Tidak semua kain bermotif batik dibuat dengan cara yang sama. Kenali lima teknik
            berikut beserta ciri-cirinya, agar tidak keliru saat memilih dan menghargai karya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {BATIK_TECHNIQUES.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.id}
                id={`technique-card-${tech.id}`}
                className="bg-[#FDFBF7] rounded-2xl rounded-tr-[36px] overflow-hidden border border-[#E0D5C1] shadow-xs hover:shadow-lg transition-all flex flex-col sm:flex-row"
              >
                <div className="sm:w-2/5 relative aspect-4/3 sm:aspect-auto overflow-hidden bg-[#2C1810] shrink-0">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-[#FDFBF7]/95 border border-[#E0D5C1] flex items-center justify-center shadow-xs">
                    <Icon className="w-4 h-4 text-[#C5A059]" />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] text-[#C5A059] font-sans font-bold uppercase tracking-widest">
                      {tech.subtitle}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#3E2723] mt-0.5">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-[#5D4037] font-serif leading-relaxed mt-1.5">
                      {tech.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-sans">
                    <div className="p-2 rounded-lg bg-[#F3EFE7] border border-[#E0D5C1]">
                      <span className="text-[#8D6E63] block">Lama Pengerjaan</span>
                      <span className="text-[#3E2723] font-semibold">{tech.time}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F3EFE7] border border-[#E0D5C1]">
                      <span className="text-[#8D6E63] block">Kisaran Harga</span>
                      <span className="text-[#3E2723] font-semibold">{tech.price}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E0D5C1] space-y-1.5">
                    <span className="text-[11px] font-sans font-bold text-[#3E2723] flex items-center gap-1.5">
                      <Search className="w-3 h-3 text-[#C5A059]" />
                      Cara Mengenalinya:
                    </span>
                    <ul className="space-y-1">
                      {tech.identify.map((point, i) => (
                        <li key={i} className="text-[11px] text-[#5D4037] font-serif flex items-start gap-1.5">
                          {tech.id === 'printing' ? (
                            <XCircle className="w-3 h-3 text-[#B85B35] shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2 className="w-3 h-3 text-[#C5A059] shrink-0 mt-0.5" />
                          )}
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing CTA tying education back to the platform */}
        <div className="bg-[#3E2723] rounded-3xl rounded-tr-[56px] p-8 sm:p-10 text-center space-y-4 border border-[#C5A059]/40">
          <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#FDFBF7]">
            Sudah Paham Ceritanya? <span className="italic font-normal text-[#C5A059]">Saatnya Menemukan Motifmu.</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#D7CCC8] font-serif max-w-xl mx-auto">
            Setiap karya di Craftéa telah melalui verifikasi keaslian, agar Anda memiliki bukan
            hanya kain, tetapi juga cerita dan kehormatan tradisi yang menyertainya.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="edu-cta-matcher-btn"
              onClick={() => onNavigate('matcher')}
              className="px-6 py-3 rounded-none bg-[#C5A059] text-[#2C1810] hover:bg-[#D4AF37] text-xs uppercase tracking-widest font-sans font-bold transition-all shadow-md flex items-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Cari Motif Sesuai Karaktermu</span>
            </button>
            <button
              id="edu-cta-marketplace-btn"
              onClick={() => onNavigate('marketplace')}
              className="px-6 py-3 rounded-none border border-[#C5A059]/50 text-[#FDFBF7] hover:bg-[#5D4037] text-xs uppercase tracking-widest font-sans font-medium transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Jelajahi Karya Terverifikasi</span>
              <ChevronRight className="w-4 h-4 text-[#C5A059]" />
            </button>
          </div>
        </div>
      </section>

      {/* MODAL: Detail Filosofi Motif Lengkap */}
      {activeMotifModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#C5A059] shadow-2xl p-6 sm:p-8 space-y-6">

            <div className="flex items-start justify-between border-b border-[#E0D5C1] pb-4">
              <div>
                <span className="text-xs text-[#C5A059] font-serif-editorial uppercase tracking-widest">
                  {activeMotifModal.javaneseName}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#3E2723]">
                  {activeMotifModal.name}
                </h3>
                <p className="text-xs text-[#8D6E63] mt-0.5 font-sans">
                  Asal: {activeMotifModal.originCity} • Kategori: {activeMotifModal.category}
                </p>
              </div>
              <button
                id="close-motif-modal-btn"
                onClick={() => setActiveMotifModal(null)}
                className="w-8 h-8 rounded-full bg-[#F3EFE7] text-[#3E2723] font-bold flex items-center justify-center hover:bg-[#E0D5C1] transition-colors border border-[#E0D5C1]"
              >
                ✕
              </button>
            </div>

            <div className="aspect-16/9 rounded-2xl overflow-hidden shadow-inner">
              <img
                src={activeMotifModal.image}
                alt={activeMotifModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#3E2723] font-serif leading-relaxed">
              <div className="p-4 rounded-xl bg-[#F3EFE7] border border-[#E0D5C1]">
                <h4 className="font-serif font-bold text-sm text-[#3E2723] mb-1">
                  Filosofi & Makna Batiniah:
                </h4>
                <p>{activeMotifModal.philosophy}</p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-[#3E2723] mb-1">
                  Sejarah Kelahiran Motif:
                </h4>
                <p>{activeMotifModal.history}</p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-[#3E2723] mb-1">
                  Pesan Spiritual bagi Pemakainya:
                </h4>
                <p>{activeMotifModal.spiritualMeaning}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E0D5C1]">
                  <h5 className="font-bold text-[#3E2723] text-xs mb-1 font-serif">Karakter yang Cocok:</h5>
                  <ul className="space-y-1">
                    {activeMotifModal.suitableCharacters.map((c, i) => (
                      <li key={i} className="text-xs text-[#5D4037] flex items-center gap-1.5 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E0D5C1]">
                  <h5 className="font-bold text-[#3E2723] text-xs mb-1 font-serif">Waktu & Acara Ideal:</h5>
                  <ul className="space-y-1">
                    {activeMotifModal.occasions.map((o, i) => (
                      <li key={i} className="text-xs text-[#5D4037] flex items-center gap-1.5 font-sans">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E0D5C1] flex items-center justify-end gap-3">
              <button
                id="modal-close-action-btn"
                onClick={() => setActiveMotifModal(null)}
                className="px-4 py-2 rounded-none bg-[#F3EFE7] text-[#3E2723] border border-[#E0D5C1] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#E0D5C1] transition-colors"
              >
                Tutup
              </button>
              <button
                id="modal-find-products-btn"
                onClick={() => {
                  onSelectMotif(activeMotifModal);
                  setActiveMotifModal(null);
                  onNavigate('marketplace');
                }}
                className="px-5 py-2 rounded-none bg-[#3E2723] text-[#FDFBF7] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#5D4037] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Lihat Produk Terkait</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};