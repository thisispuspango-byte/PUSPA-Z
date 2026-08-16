export interface BeneficiaryStory {
  id: string
  name: string
  age: number
  location: string
  program: string
  duration: string
  photo: string
  video?: string
  quote: string
  beforeSummary: string
  afterSummary: string
  category: 'dapur' | 'gudang' | 'armada' | 'komuniti' | 'hab'
}

export const BENEFICIARIES: BeneficiaryStory[] = [
  {
    id: 'beneficiary-01',
    name: 'Mak Cik Halimah',
    age: 72,
    location: 'Selayang, Selangor',
    program: 'Dapur Barakah — Sedekah Jumaat Pek Makanan Panas',
    duration: '3 tahun 4 bulan',
    photo: '/beneficiary-01.jpg',
    video: '/videos/beneficiary-01.mp4',
    quote: '"Sebelum ni, Jumaat datang aku takut. Tak ada rezeki untuk masak, perut kosong solat Jumaat. Sekarang, bau nasi dan lauk panas sudah menunggu di pintu sejak pagi. Alhamdulillah, rezeki Allah datang melalui tangan baik PUSPA."',
    beforeSummary: 'Mak Cik Halimah tinggal sendirian di rumah sewa kecil selepas anaknya meninggal dunia. Pencen bulanan RM350 tidak cukup untuk beli makanan bergizi, sering kali makan nasi dengan budu atau telur mata sahaja.',
    afterSummary: 'Setiap Jumaat, dia menerima pek makanan panas berasaskan nasi, ayam/ikan, sayur, dan buah-buahan. Dia tidak lagi bimbang tentang makanan tengah hari dan boleh menumpukan fokus untuk ibadah serta kesihatan.',
    category: 'dapur'
  },
  {
    id: 'beneficiary-02',
    name: 'Puan Siti Noraini',
    age: 38,
    location: 'Kajang, Selangor',
    program: 'Gudang Ihsan — Kotak Bantuan Bulanan Keluarga Asnaf',
    duration: '1 tahun 8 bulan',
    photo: '/beneficiary-02.jpg',
    video: '/videos/beneficiary-02.mp4',
    quote: '"Sebagai ibu tunggal dengan tiga anak, tiap akhir bulan aku nampak dinding. Kotak Gudang Ihsan tu bukan sekadar barang — dia pelarian kami. Anak-anak tak perlu lagi tanya \'Mak, makan apa malam ni?\' sebab dah ada stok."',
    beforeSummary: 'Puan Siti Noraini ditinggal suami dan ditanggung mengurus 3 anak berusia 6-12 tahun. Pendapatan sebelah sebelah sebagai pembantu rumah tangga tidak menampung kos sara hidup, sering kekurangan beras dan barang keperluan asas.',
    afterSummary: 'Setiap bulan, dia menerima kotak berisi beras 10kg, minyak masak, gula, tepung, telur, ikan tin, dan barang keperluan lain. Anak-anaknya kini makan dengan teratur dan dia mampu menyimpan sebahagian pendapatan untuk simpanan kecemasan.',
    category: 'gudang'
  },
  {
    id: 'beneficiary-03',
    name: 'Encik Roslan & Keluarga',
    age: 45,
    location: 'Kuala Kubu Bharu, Hulu Selangor',
    program: 'Konvoi Armada — Penghantaran Zon Terpencil',
    duration: '2 tahun',
    photo: '/beneficiary-03.jpg',
    video: '/videos/beneficiary-03.mp4',
    quote: '"Kami di ulu Hulu Selangor ni, jalan tak siap, bas tak sampai. Dulu kami terlepas apa-apa bantuan. Konvoi PUSPA ni macam malaikat turun dari langit — sampai ke pintu rumah, bawa rezeki, bawa harapan."',
    beforeSummary: 'Keluarga Encik Roslan (5 orang) tinggal di kampung terpencil 15km dari pekan terdekat. Jalan berlumpur dan tiada akses kenderaan besar. Mereka sering terlepas program bantuan kerajaan dan NGO lain kerana logistik sukar.',
    afterSummary: 'Konvoi Armada PUSPA sampai ke pintu rumah mereka setiap Jumaat dengan pek makanan segar dan kotak bantuan bulanan. Anak-anaknya kini terima nutrisi lengkap mingguan, dan Encik Roslan boleh fokus mencari pendapatan sampingan tanpa risau logistik.',
    category: 'armada'
  },
  {
    id: 'beneficiary-04',
    name: 'Penghuni Rumah Kebajikan Al-Mukhlisin',
    age: 68,
    location: 'Cheras, Kuala Lumpur',
    program: 'Program Komuniti — Lawatan Mingguan ke Rumah Kebajikan',
    duration: '4 tahun',
    photo: '/beneficiary-04.jpg',
    video: '/videos/beneficiary-04.mp4',
    quote: '"Kami orang tua, badan lemah, tak boleh pergi cari rezeki. Pasukan PUSPA datang setiap Jumaat tak bawa makanan saja — dia bawa senyuman, bawa cerita, bawa rasa kita masih dihargai. Itu yang paling mahal."',
    beforeSummary: 'Rumah Kebajikan Al-Mukhlisin menampung 45 penghuni warga emas dan yatim piatu. Bajet operasi terhad, sering kekurangan makanan berkhasiat dan stok ubat-ubatan. Penghuni bergantung sepenuhnya pada derma tidak menentu.',
    afterSummary: 'PUSPA melawat setiap Jumaat dengan juadah panas bergizi, buah-buahan segar, dan susu pemakanan. Pasukan sukarelawan juga mengadakan sesen aktiviti ringan dan pemeriksaan kesihatan simple. Penghuni merasa dijaga dan tidak terpinggirkan.',
    category: 'komuniti'
  },
  {
    id: 'beneficiary-05',
    name: 'Encik Ahmad Fauzi',
    age: 34,
    location: 'Shah Alam, Selangor',
    program: 'Hab Transformasi — Asnafpreneur Coaching & Modal Awal',
    duration: '1 tahun (tamat program)',
    photo: '/beneficiary-05.jpg',
    video: '/videos/beneficiary-05.mp4',
    quote: '"Dulu aku fikir asnaf itu miskin selamanya. Hab Transformasi tunjuk aku — miskir itu sementara, ilmu dan usaha yang kekal. Sekarang kedai goreng pisang aku buka 2 pejabat, gaji 3 orang pekerja. Aku bukan penerima, aku pemberi."',
    beforeSummary: 'Encik Ahmad Fauzi berkeluarga 4 orang, sebelum ini bergantung sepenuhnya bantuan zakat dan kerja sambil lepas yang tidak menentu. Tiada kemahiran perniagaan dan modal untuk memulakan usaha sendiri.',
    afterSummary: 'Selepas mengikuti program 6 bulan Hab Transformasi, dia berjaya melancarkan usaha goreng pisang dan kuih tradisional. Kini usahanya mengeluarkan pendapatan bulanan RM6,000+, dia membayar zakat sendiri, dan telah mencipta peluang kerja untuk 3 orang asnaf lain.',
    category: 'hab'
  },
  {
    id: 'beneficiary-06',
    name: 'Hafiz Muhammad Daniel',
    age: 16,
    location: 'Bangi, Selangor',
    program: 'Dapur Barakah — Sokongan Makanan Mahad Tahfiz Mingguan',
    duration: '2 tahun 6 bulan',
    photo: '/beneficiary-06.jpg',
    video: '/videos/beneficiary-06.mp4',
    quote: '"Menghafal Quran perlukan tenaga dan ketenangan hati. Apabila perut kenyang dengan makanan baik, otak tenang untuk murajaah. Terima kasih PUSPA, sebab setiap lemak nasi Jumaat tu, aku rasa jadi tenaga untuk hafalan aku."',
    beforeSummary: 'Pelajar Mahad Tahfiz Al-Quran PUSPA, berusia 16 tahun, menghafal 15 juzuk. Makanan asrama terhad dan seragam, kekurangan protein dan sayur. Sering lapar malam dan susah fokus untuk murajaah selepas solat Isyak.',
    afterSummary: 'Setiap Jumaat, dia dan 59 rakan sebayanya menerima pek makanan istimewa dengan lauk berlauk (ayam/ikan), sayur pelbagai warna, dan buah-buahan. Tenaga dan fokus belajar meningkat, hafalan lancar, dan dia kini mengimami tarawih di surau asrama.',
    category: 'dapur'
  }
]