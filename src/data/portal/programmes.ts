export interface ProgrammeItem {
  id: string
  title: string
  tag: string
  desc: string
  impact: string
  highlights: string[]
  gradient: string
  border: string
  badgeClass: string
  icon: string
}

export const PROGRAMMES: ProgrammeItem[] = [
  {
    id: 'asnafpreneur',
    title: 'Asnafpreneur Incubator',
    tag: 'Transformasi Ekonomi',
    desc: 'Program bimbingan keusahawanan intensif dan geran mikro untuk membantu ketua keluarga asnaf membina perniagaan mampan.',
    impact: '124 Usahawan telah bebas daripada status asnaf',
    highlights: ['Geran Modal Perniagaan', 'Bimbingan Mentor Berpengalaman', 'Pemantauan Prestasi Kewangan'],
    gradient: 'from-primary to-primary/80',
    border: 'border-primary/30',
    badgeClass: 'bg-primary/10 text-primary dark:text-primary/80 border-primary/20',
    icon: 'Rocket',
  },
  {
    id: 'sedekah-jumaat',
    title: 'Sedekah Jumaat & Tahfiz',
    tag: 'Kebajikan & Makanan',
    desc: 'Penyaluran makanan tengahari berkhasiat secara konsisten setiap minggu ke 8 rumah kebajikan orang tua, anak yatim dan Mahad Tahfiz.',
    impact: 'Melebihi 600 pek makanan diagihkan setiap Jumaat',
    highlights: ['8 Rumah Kebajikan Tetap', '1 Mahad Tahfiz PUSPA', 'Logistik & Penghantaran Sukarelawan'],
    gradient: 'from-primary to-primary/80',
    border: 'border-primary/30',
    badgeClass: 'bg-primary/10 text-primary dark:text-primary/80 border-primary/20',
    icon: 'UtensilsCrossed',
  },
  {
    id: 'dapur-ihsan',
    title: 'Dapur Ihsan & Barakah',
    tag: 'Bantuan Asas Dapur',
    desc: 'Kotak barangan keperluan asas (beras, minyak, tepung, makanan kering) yang dibekalkan setiap bulan kepada keluarga fakir miskin.',
    impact: 'Membantu 350+ isi rumah sebulan',
    highlights: ['Pek Makanan Bernilai RM150', 'Penghantaran Terus ke Rumah', 'Pemeriksaan Nutrisi & Keperluan'],
    gradient: 'from-primary to-primary/80',
    border: 'border-primary/30',
    badgeClass: 'bg-primary/10 text-primary dark:text-primary/80 border-primary/20',
    icon: 'HeartHandshake',
  },
  {
    id: 'pendidikan',
    title: 'Dana Generasi Celik Asnaf',
    tag: 'Pendidikan & Masa Depan',
    desc: 'Tajaan persekolahan, beg, yuran kelas tambahan, dan kelas mengaji Al-Quran percuma untuk memastikan anak-anak asnaf tidak tercicir.',
    impact: '480 anak asnaf menerima sokongan pendidikan',
    highlights: ['Pakej Kembali Ke Sekolah', 'Kelas Bimbingan SPM/PT3', 'Tajaan Pengajian Tahfiz'],
    gradient: 'from-primary to-primary/80',
    border: 'border-primary/30',
    badgeClass: 'bg-primary/10 text-primary dark:text-primary/80 border-primary/20',
    icon: 'GraduationCap',
  },
]