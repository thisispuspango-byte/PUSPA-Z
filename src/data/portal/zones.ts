export interface Hotspot {
  id: string
  title: string
  desc: string
  x: number // percentage 0-100
  y: number // percentage 0-100
  status: string
  tags?: { label: string; dotColor: string }[]
  glance?: { label: string; value: string }[]
  actionText?: string
}

export interface ZoneInfo {
  id: string
  num: string
  name: string
  shortLabel: string
  subtitle: string
  desc: string
  icon: string
  diorama: string
  video: string
  themeColor: string
  accentGlow: string
  stats: { label: string; value: string }[]
  hotspots: Hotspot[]
}

export const ZONES: ZoneInfo[] = [
  {
    id: 'dapur',
    num: '01',
    name: 'Dapur Pusat & Juadah Barakah',
    shortLabel: 'Dapur Barakah',
    subtitle: '600+ Pek Makanan Panas Setiap Jumaat',
    desc: 'Dapur berpusat PUSPA beroperasi seawal jam 6 pagi memasak hidangan seimbang dan bernutrisi tinggi sebelum dimuatkan ke dalam armada penghantaran.',
    icon: 'UtensilsCrossed',
    diorama: '/diorama-01.jpg',
    video: '/videos/diorama-01.mp4',
    themeColor: '#7C3AED',
    accentGlow: 'rgba(124, 58, 237, 0.4)',
    stats: [
      { label: 'Kapasiti Harian', value: '800 Pek' },
      { label: 'Kawalan Suhu', value: 'Min 65°C' },
    ],
    hotspots: [
      {
        id: 'h1',
        title: 'Stesen Kuali Industri & Penyediaan',
        desc: 'Memasak lauk berkhasiat secara pukal menggunakan standard kebersihan HALAL & MeSTI di bawah pemantauan chef sukarelawan terlatih.',
        x: 26,
        y: 36,
        status: 'Penyediaan Aktif',
        tags: [
          { label: 'Standard HALAL', dotColor: 'bg-primary' },
          { label: 'Pematuhan MeSTI', dotColor: 'bg-primary' },
        ],
        glance: [
          { label: 'Kadar Pukal', value: '350 pek / jam' },
          { label: 'Kawalan Mutu', value: 'Suhu 65°C+' },
        ],
        actionText: 'Ketahui SOP Dapur',
      },
      {
        id: 'h2',
        title: 'Meja Pembungkusan Pantas & Sealing',
        desc: 'Pembungkusan bekas mesra alam tahan haba untuk mengekalkan kesegaran makanan sehingga tiba ke tangan keluarga penerima.',
        x: 58,
        y: 58,
        status: 'Standard Kebersihan 100%',
        tags: [
          { label: 'Bekas Bio-degradable', dotColor: 'bg-primary' },
          { label: 'Penebat Haba', dotColor: 'bg-primary' },
        ],
        glance: [
          { label: 'Kekerapan', value: 'Setiap Jumaat' },
          { label: 'Integriti Pek', value: '100% Kedap Udara' },
        ],
        actionText: 'Lihat Proses Pembungkusan',
      },
    ],
  },
  {
    id: 'gudang',
    num: '02',
    name: 'Gudang Simpanan & Barangan Kering',
    shortLabel: 'Gudang Ihsan',
    subtitle: 'Pengurusan Inventori Barakah Bersistematik',
    desc: 'Gudang simpanan beras, minyak, tepung, dan bekalan keperluan asas keluarga asnaf dengan sistem kod bar pintar bagi mengelakkan pembaziran.',
    icon: 'PackageCheck',
    diorama: '/diorama-02.jpg',
    video: '/videos/diorama-02.mp4',
    themeColor: '#7C3AED',
    accentGlow: 'rgba(124, 58, 237, 0.4)',
    stats: [
      { label: 'Kotak Keperluan', value: '1,200 Kotak/Bulan' },
      { label: 'Kawalan Stok', value: 'Sistem FIFO Pintar' },
    ],
    hotspots: [
      {
        id: 'h3',
        title: 'Rak Simpanan Bertingkat & FIFO',
        desc: 'Penyusunan berasaskan tarikh luput (FIFO) untuk memastikan kualiti bekalan sentiasa segar dan bekalan kecemasan sentiasa bersedia.',
        x: 38,
        y: 34,
        status: 'Stok Terkawal',
        tags: [
          { label: 'Kod Bar Pintar', dotColor: 'bg-primary' },
          { label: 'Sistem FIFO', dotColor: 'bg-primary' },
        ],
        glance: [
          { label: 'Kapasiti Rak', value: '25 Tan Metrik' },
          { label: 'Kitaran Audit', value: 'Mingguan' },
        ],
        actionText: 'Lihat Sistem Gudang',
      },
      {
        id: 'h4',
        title: 'Zon Susun Kotak Kasih Asnaf',
        desc: 'Sukarelawan membungkus kit makanan asas seberat 15kg yang lengkap dengan barangan dapur harian bagi setiap keluarga penerima.',
        x: 64,
        y: 56,
        status: 'Agihan Mingguan',
        tags: [
          { label: 'Kit 15kg Asas', dotColor: 'bg-primary' },
          { label: 'Verifikasi eKYC', dotColor: 'bg-primary' },
        ],
        glance: [
          { label: 'Berat Kit', value: '15 kg / kotak' },
          { label: 'Sasaran Bulanan', value: '1,200 Keluarga' },
        ],
        actionText: 'Sertai Skuad Sukarelawan',
      },
    ],
  },
  {
    id: 'armada',
    num: '03',
    name: 'Logistik & Armada Konvoi Agihan',
    shortLabel: 'Konvoi Armada',
    subtitle: 'Menembusi Lorong Sempit & Komuniti Pedalaman',
    desc: 'Konvoi kenderaan pacuan empat roda dan motosikal sukarelawan menghantar makanan terus ke pintu rumah penerima tanpa perantara.',
    icon: 'Truck',
    diorama: '/diorama-03.jpg',
    video: '/videos/diorama-03.mp4',
    themeColor: '#7C3AED',
    accentGlow: 'rgba(124, 58, 237, 0.4)',
    stats: [
      { label: 'Zon Liputan', value: 'Lembah Klang & Pedalaman' },
      { label: 'Masa Sampai', value: '< 90 Minit' },
    ],
    hotspots: [
      {
        id: 'h5',
        title: 'Pusat Pelepasan Konvoi & GPS Tracking',
        desc: 'Pemeriksaan keselamatan kenderaan dan penetapan zon agihan melalui sistem navigasi GPS untuk memastikan kelajuan dan keselamatan.',
        x: 32,
        y: 62,
        status: 'Laluan Dioptimumkan',
        tags: [
          { label: 'Telemetri Live', dotColor: 'bg-primary' },
          { label: 'Pacuan 4x4', dotColor: 'bg-primary' },
        ],
        glance: [
          { label: 'Radius Operasi', value: '120 km' },
          { label: 'Masa Ketibaan', value: '< 90 minit' },
        ],
        actionText: 'Pantau Laluan Armada',
      },
      {
        id: 'h6',
        title: 'Skuad Motosikal Cepat Lorong Sempit',
        desc: 'Menembusi kawasan flat bertingkat tinggi dan perumahan padat dengan pantas untuk penghantaran dari pintu ke pintu.',
        x: 62,
        y: 44,
        status: 'Sedia Gerak',
        tags: [
          { label: 'Pintu ke Pintu', dotColor: 'bg-primary' },
          { label: 'Mobiliti Pantas', dotColor: 'bg-primary' },
        ],
        glance: [
          { label: 'Unit Motosikal', value: '18 Unit' },
          { label: 'Pek / Rider', value: '25 Pek' },
        ],
        actionText: 'Daftar Sukarelawan Rider',
      },
    ],
  },
  {
    id: 'komuniti',
    num: '04',
    name: '8 Rumah Kebajikan & Pusat Tahfiz',
    shortLabel: '8 RK & Tahfiz',
    subtitle: 'Santunan Warga Emas, Anak Yatim & Penuntut Ilmu',
    desc: 'Penerimaan agihan di lapan buah rumah kebajikan rakan kerjasama dan madrasah tahfiz terpilih setiap hari Jumaat secara berjadual.',
    icon: 'Building2',
    diorama: '/diorama-04.jpg',
    video: '/videos/diorama-04.mp4',
    themeColor: '#7C3AED',
    accentGlow: 'rgba(124, 58, 237, 0.4)',
    stats: [
      { label: 'Penghuni Disantuni', value: '450+ Jiwa' },
      { label: 'Kekerapan', value: 'Setiap Jumaat Berterusan' },
    ],
    hotspots: [
      {
        id: 'h7',
        title: 'Dewan Selera Rumah Warga Emas',
        desc: 'Makanan panas dihidangkan segar oleh sukarelawan bersama sesi ramah mesra dan semakan kesihatan kebajikan.',
        x: 44,
        y: 48,
        status: 'Santunan Kasih',
        tags: [
          { label: 'Warga Emas', dotColor: 'bg-primary' },
          { label: 'Menu Sihat', dotColor: 'bg-primary' },
        ],
        glance: [
          { label: 'Pusat Kerjasama', value: '8 Rumah Kebajikan' },
          { label: 'Kekerapan', value: 'Mingguan Tetap' },
        ],
        actionText: 'Taja Rumah Kebajikan',
      },
      {
        id: 'h8',
        title: 'Pusat Tahfiz & Asrama Asnaf',
        desc: 'Bekalan makanan dan nutrisi mencukupi bagi menyokong pembelajaran dan hafazan al-Quran anak-anak penuntut ilmu.',
        x: 66,
        y: 36,
        status: 'Penerima Tetap',
        tags: [
          { label: 'Anak Yatim & Asnaf', dotColor: 'bg-primary' },
          { label: 'Bantuan Nutrisi', dotColor: 'bg-primary' },
        ],
        glance: [
          { label: 'Penuntut Disantuni', value: '280 Pelajar' },
          { label: 'Pek Makanan', value: 'Setiap Hari Jumaat' },
        ],
        actionText: 'Taja Pelajar Tahfiz',
      },
    ],
  },
  {
    id: 'hab',
    num: '05',
    name: 'Hab Transformasi & Pengurusan Asnaf',
    shortLabel: 'Hab Transformasi',
    subtitle: 'Pusat Data Maria AI & Studio Asnafpreneur',
    desc: 'Kompleks operasi pintar PUSPA yang menempatkan bilik kawalan Maria AI dan studio bimbingan modal niaga asnaf.',
    icon: 'Rocket',
    diorama: '/diorama-05.jpg',
    video: '/videos/diorama-05.mp4',
    themeColor: '#7C3AED',
    accentGlow: 'rgba(124, 58, 237, 0.4)',
    stats: [
      { label: 'Usahawan Terbimbing', value: '124 Usahawan' },
      { label: 'Verifikasi eKYC', value: 'Pantas & Patuh' },
    ],
    hotspots: [
      {
        id: 'h9',
        title: 'Bilik Komando Maria AI Engine',
        desc: 'Semakan integriti data pemohon secara automatik, padanan had kifayah, dan pemantauan masa nyata agihan infaq.',
        x: 42,
        y: 40,
        status: 'Sistem Aktif 24/7',
        tags: [
          { label: 'Maria AI Engine', dotColor: 'bg-primary' },
          { label: 'Had Kifayah Smart', dotColor: 'bg-primary' },
        ],
        glance: [
          { label: 'Kelajuan Semakan', value: '< 3 Saat' },
          { label: 'Ketepatan Data', value: '99.8%' },
        ],
        actionText: 'Terokai Sistem AI',
      },
      {
        id: 'h10',
        title: 'Studio Inkubator Asnafpreneur',
        desc: 'Bimbingan perniagaan mikro, penjenamaan, dan bantuan peralatan perniagaan agar keluarga asnaf mampu berdikari keluar dari garis kemiskinan.',
        x: 68,
        y: 60,
        status: 'Sesi Bimbingan',
        tags: [
          { label: 'Modal & Bimbingan', dotColor: 'bg-primary' },
          { label: 'Sijil Usahawan', dotColor: 'bg-primary' },
        ],
        glance: [
          { label: 'Graduan Asnaf', value: '124 Usahawan' },
          { label: 'Peningkatan Pendapatan', value: '+140%' },
        ],
        actionText: 'Taja Modal Asnafpreneur',
      },
    ],
  },
]