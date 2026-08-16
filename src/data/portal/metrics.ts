export interface MetricItem {
  id: string
  title: string
  value: string
  sub: string
  change: string
  icon: string
  gradient: string
  border: string
  iconBg: string
}

export const METRICS: MetricItem[] = [
  {
    id: 'dana',
    title: 'Jumlah Dana Diagihkan',
    value: 'RM 1,420,500',
    sub: 'Sejak penubuhan PUSPA',
    change: '+18.4% tahun ini',
    icon: 'HandCoins',
    gradient: 'from-primary/20 via-primary/5 to-transparent',
    border: 'border-primary/30',
    iconBg: 'bg-primary/10 text-primary dark:text-primary/80',
  },
  {
    id: 'asnaf',
    title: 'Keluarga Asnaf Dibantu',
    value: '4,850+',
    sub: 'Menerima bantuan bulanan & sara hidup',
    change: 'Sifar tunggakan',
    icon: 'Users',
    gradient: 'from-primary/20 via-primary/5 to-transparent',
    border: 'border-primary/30',
    iconBg: 'bg-primary/10 text-primary dark:text-primary/80',
  },
  {
    id: 'institusi',
    title: 'Institusi Kebajikan Rutin',
    value: '8 RK + 1 MT',
    sub: 'Agihan Sedekah Jumaat berterusan',
    change: '100% tepat masa',
    icon: 'Building2',
    gradient: 'from-primary/20 via-primary/5 to-transparent',
    border: 'border-primary/30',
    iconBg: 'bg-primary/10 text-primary dark:text-primary/80',
  },
  {
    id: 'asnafpreneur',
    title: 'Usahawan Asnaf Berjaya',
    value: '124 Usahawan',
    sub: 'Transformasi keluar daripada garis kemiskinan',
    change: '86% kadar kelulusan modul',
    icon: 'Rocket',
    gradient: 'from-primary/20 via-primary/5 to-transparent',
    border: 'border-primary/30',
    iconBg: 'bg-primary/10 text-primary dark:text-primary/80',
  },
]