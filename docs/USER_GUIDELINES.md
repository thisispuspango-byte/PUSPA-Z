---
title: "PUSPA-Z — Panduan Pengguna & SOP Operasi Sistem"
document_id: "PUSPA-DOC-GUIDE-001"
version: "5.6.2"
last_updated: "2026-08-15T23:33:00+08:00"
maintainer: "HYPER-SOVEREIGN CONDUCTOR & ARCHITECT"
classification: "PUBLIC & STAFF OPERATIONAL"
lifecycle_status: "ACTIVE"
---

# 📖 Panduan Pengguna PUSPA V5.6
## *Pertubuhan Urus Peduli Asnaf (PPM-024-10-05012022)*

Selamat datang ke platform **PUSPA V5.6**, sistem pengurusan NGO yang diperkasakan oleh AI untuk memudahkan urusan pendaftaran Asnaf, pengurusan kes, dan ketelusan dana.

---

## 📜 Audit & Revision Ledger

| Versi | Tarikh & Masa (MYT) | Pengarang / Ejen | Kenapa (Rasional Perubahan) | Bagaimana (Kaedah & Skop Fail) | Status / Pengesahan |
| :---: | :---: | :---: | :--- | :--- | :---: |
| `5.6.2` | `2026-08-15 23:33` | `Conductor Agent` | Menguatkuasakan format standard jejak audit SMS-v1.0 bagi panduan pengguna | Menambah blok YAML Frontmatter dan Audit Ledger lengkap | `typecheck: 0 errors` |
| `5.6.1` | `2026-08-15 23:25` | `Conductor Agent` | Menambah penerangan perbezaan Portal Awam `/` dan Dashboard `/dashboard` | Menstrukturkan Seksyen 1 kepada Portal Awam dan Dashboard Pengurusan | `doc verified` |

---

## 🚀 1. Struktur Platform (Portal Awam vs Dashboard Pengurusan)

Platform PUSPA V5.6 dibahagikan kepada dua lapisan utama:

### 1.1 Portal Awam (`/`) — Untuk Orang Awam, Penderma & Pemohon Bantuan
- **Pendaratan Berimpak Tinggi**: Memaparkan statistik semasa, galeri agihan lapangan, dan program-program kebajikan utama.
- **Ekosistem Agihan 5-Zon (Diorama 3D Interaktif)**: Penerbangan interaktif melalui 5 zon operasi (*01 Dapur Barakah*, *02 Gudang Ihsan*, *03 Konvoi Armada*, *04 8 Rumah Kebajikan & Tahfiz*, *05 Hab Transformasi & Maria AI*).
- **Tindakan Pantas Awam**:
  - **Infaq Sedekah Jumaat**: Modal sumbangan segera.
  - **Semakan Status Permohonan**: Semak status kelulusan bantuan menggunakan No. Kad Pengenalan.
  - **Borang Permohonan Bantuan**: Permohonan bantuan atas talian patuh PDPA secara terus.
- **Akses Kakitangan**: Klik butang **"Sistem Staf"** di sudut atas kanan untuk masuk ke Dashboard Pengurusan (`/dashboard`).

### 1.2 Dashboard Pengurusan (`/dashboard`) — Untuk Kakitangan & Pentadbir
- **Sidebar Kiri**: Navigasi utama antara 24 modul operasi (Dashboard, Ahli, Kes, Derma, Agihan, dll).
- **Maria Puspa (AI)**: Pembantu AI pintar yang sentiasa ada di bahagian bawah kanan untuk analisa data operasi secara *real-time*.
- **Top Bar**: Carian pantas, breadcrumb, notifikasi, dan profil pengguna.
- **Modul Gated**: Akses anda ditapis mengikut peranan anda (Staff, Admin, atau Developer).

---

## 👥 2. Panduan Mengikut Peranan (User Roles)

### A. Peranan: Staff (Larian Operasi)
*Fokus: Pendaftaran, Pengurusan Kes, Log Derma.*

| Modul | Tindakan Utama | Tips Efisiensi |
| :--- | :--- | :--- |
| **Ahli (Members)** | Daftar asnaf baru, kemaskini maklumat isi rumah. | Gunakan fungsi carian IC untuk semak jika ahli sudah berdaftar. |
| **Kes (Cases)** | Buka kes bantuan baru (Perubatan, Pendidikan, dll). | Pastikan status kes dikemaskini mengikut *pipeline* (9 peringkat). |
| **Derma (Donations)** | Rekod derma masuk (Zakat, Sedekah, Infaq). | Pilih kategori derma yang betul untuk pelaporan Shariah yang tepat. |
| **Program (Programmes)** | Pantau penglibatan asnaf dalam program NGO. | Daftar ahli ke program untuk jejak impak bantuan. |

### B. Peranan: Admin (Pengurusan & Kelulusan)
*Fokus: Kepatuhan, Kelulusan Dana, Laporan.*

| Modul | Tindakan Utama | Tips Efisiensi |
| :--- | :--- | :--- |
| **eKYC** | Sahkan identiti ahli melalui dokumen yang dimuat naik. | Semak skor padanan muka (*Face Match*) untuk keselamatan tambahan. |
| **Agihan (Disbursements)** | Luluskan permohonan dana yang sudah disahkan. | Gunakan Maria Puspa untuk ringkasan agihan bulanan sebelum meluluskan. |
| **Kepatuhan (Compliance)** | Pantau status audit, ROSM, dan LHDN. | Pastikan dokumen bukti dimuat naik sebelum tarikh tamat tempoh. |
| **Laporan (Reports)** | Jana laporan bulanan dan statistik impak. | Eksport ke CSV untuk analisa mendalam di luar sistem. |

### C. Peranan: Developer (Teknikal & Sistem)
*Fokus: Konfigurasi AI, Kesihatan Sistem.*

- **Modul Admin**: Pantau kesihatan pangkalan data dan status servis AI.
- **Konfigurasi AI**: Urus kunci API (OpenRouter) dan parameter model.
- **TapSecure**: Pantau sesi aktif dan akses PII (Personal Identifiable Information).

---

## 🤖 3. Berinteraksi dengan Maria Puspa (AI Assistant)

Maria Puspa bukan sekadar chatbot biasa. Dia mempunyai akses kepada data operasi secara *real-time* melalui sistem RAG (Retrieval-Augmented Generation).

### 3.1 Membuka dan Menutup Panel Chat

- **Buka**: Klik ikon chat 🪷 di bahagian bawah kanan skrin. Panel Maria Puspa akan muncul dalam bentuk *overlay*.
- **Tutup**: Klik ikon **X** di bahagian atas panel, atau klik kawasan di luar panel.
- **Kekalkan sesi**: Perbualan anda disimpan dalam sesi semasa. Jika anda menutup panel dan membukanya semula, sejarah perbualan masih ada sehingga anda log keluar.

### 3.2 Jenis Pertanyaan yang Boleh Diajukan

Maria Puspa boleh membantu dalam beberapa kategori utama:

| Kategori | Contoh Pertanyaan |
|:---|:---|
| **Data Operasi** | *"Berapakah jumlah derma zakat bulan ini?"* |
| **Status Kes** | *"Senaraikan kes kecemasan yang belum diluluskan."* |
| **Maklumat Ahli** | *"Cari ahli bernama Ahmad dan ringkasan bantuan dia."* |
| **Derma & Donor** | *"Siapa donor tertahun ini dan jumlah sumbangan?"* |
| **Program & Aktiviti** | *"Program apa yang aktif dan bilangan pesertanya?"* |
| **Kepatuhan** | *"Apa dokumen yang perlu disahkan untuk audit ROSM?"* |
| **Agihan** | *"Berapa permohonan agihan yang pending?"* |
| **Sukarelawan** | *"Senaraikan sukarelawan yang aktif dalam 30 hari lepas."* |
| **Laporan** | *"Sediakan ringkasan untuk laporan bulanan."* |
| **Sistem** | *"Apa status kesihatan pangkalan data?"* |

### 3.3 Quick Prompts

Di bahagian atas panel chat, anda akan melihat butang *quick prompt* yang boleh diklik untuk memulakan perbualan dengan segera:

- **"Ringkasan Hari Ini"** -- Gambaran keseluruhan operasi hari ini.
- **"Kes Pending"** -- Senarai kes yang menunggu kelulusan.
- **"Derma Terkini"** -- Kemas kini derma terbaru.
- **"Status Sistem"** -- Kesihatan pangkalan data dan servis.

> Quick prompts ini berbeza mengikut peranan anda. Admin akan melihat lebih banyak prompt berbanding Staff.

### 3.4 Penunjuk Panggilan Tool (Ikon Kunci 🔧)

Apabila Maria Puspa sedang memproses pertanyaan anda, anda mungkin melihat ikon **kunci (wrench)** muncul sebelum jawapan. Ini bermakna:

- Maria sedang **mengakses pangkalan data** untuk mendapatkan maklumat terkini.
- Maria sedang **menjalankan carian** dalam rekod sistem.
- Maria sedang **mengira atau mengagregat** data (contoh: jumlah derma, bilangan kes).

> [!TIP]
> Tunggu sehingga ikon kunci hilang sebelum menghantar pertanyaan baru. Ini memastikan jawapan yang diterima adalah lengkap dan tepat.

### 3.5 Sokongan Bahasa

- **Bahasa Melayu (BM)**: Bahasa utama untuk interaksi dengan Maria. Semua respons dan arahan sistem dalam BM.
- **English**: Maria juga memahami dan boleh menjawab dalam Bahasa Inggeris. Anda boleh menaik dalam mana-mana bahasa.
- **Campuran**: Anda boleh mencampur BM dan English dalam satu pertanyaan (contoh: *"Maria, show me the list of active programmes"*).

### 3.6 Had Maria Puspa

Maria Puspa menggunakan teknologi **RAG (Retrieval-Augmented Generation)**. Ini bermakna:

- **Maria hanya boleh menjawab berdasarkan data yang wujud** dalam pangkalan data sistem. Jika data tidak dimasukkan ke dalam sistem, Maria tidak akan dapat mencarinya.
- **Maria tidak boleh akses sistem luar** seperti e-mel, Google, atau laman web pihak ketiga -- kecuali alat carian web yang disediakan.
- **Maria mungkin memberikan jawapan tidak lengkap** jika data dalam sistem tidak dikemaskini. Pastikan rekod sentiasa dikemaskini untuk jawapan yang tepat.
- **Maria tidak membuat keputusan kelulusan**. Dia boleh menyediakan ringkasan dan cadangan, tetapi kelulusan muktamad tetap di tangan pengguna.

> [!IMPORTANT]
> Maria Puspa diwajibkan menggunakan *tools* sebelum menjawab. Jika dia tidak pasti, dia akan memberitahu anda bahawa data tidak ditemui. Ini adalah ciri keselamatan, bukan ralat.

---

## 🛠️ 4. Panduan Modul Lengkap (Complete Module Guide)

PUSPA V5 mempunyai **24 modul** yang tersedia mengikut peranan anda. Berikut adalah panduan ringkas untuk setiap modul:

### Modul untuk Semua Peranan (Staff, Admin, Developer)

| Modul | Keterangan | Akses |
|:---|:---|:---|
| **Dashboard** | Paparan utama dengan metrik utama: jumlah ahli, kes aktif, derma terkini, dan graf trend. | Staff+ |
| **Ahli (Members)** | Pendaftaran dan pengurusan maklumat asnaf serta isi rumah. Termasuk carian IC dan sejarah bantuan. | Staff+ |
| **Kes (Cases)** | Pengurusan kes bantuan (Perubatan, Pendidikan, Kecemasan, dll) melalui 9 peringkat *pipeline*. | Staff+ |
| **Program (Programmes)** | Kemas kini dan pantau program NGO serta penglibatan asnaf dalam setiap program. | Staff+ |
| **Derma (Donations)** | Rekod semua derma masuk mengikut kategori: Zakat, Sedekah, Infaq, dan lain-lain. | Staff+ |
| **Donor (Donors)** | Pangkalan data donor individu dan korporat, termasuk sejarah sumbangan dan preferensi komunikasi. | Staff+ |
| **Agihan (Disbursements)** | Proses kelulusan dan penjejakan agihan dana kepada asnaf. Termasuk bukti pembayaran. | Staff+ |
| **Sukarelawan (Volunteers)** | Pendaftaran, penugasan, dan jejak aktiviti sukarelawan PUSPA. | Staff+ |
| **Aktiviti (Activities)** | Audit log -- rekod semua tindakan pengguna dalam sistem (tambah, padam, edit, eksport). | Staff+ |
| **Dokumen (Documents)** | Repositori dokumen ahli dan sistem. Muat naik, kategori, dan semak status dokumen. | Staff+ |
| **Asnafpreneur** | Pemantauan asnaf yang menjalankan perniagaan kecil-kecilan. Termasuk prestasi jualan dan bantuan modal. | Staff+ |
| **Sedekah Jumaat** | Paparan dan pengurusan kempen derma mingguan khas untuk hari Jumaat. | Staff+ |
| **Docs** | Dokumen panduan dalaman PUSPA, termasuk SOP dan polisi organisasi. | Staff+ |
| **Tetapan (Settings)** | Profil pengguna peribadi, tukar kata laluan, dan konfigurasi paparan. | Staff+ |
| **Carta Organisasi** | Carta hierarki organisasi PUSPA -- struktur jawatan dan laporan. | Staff+ |
| **Institusi** | Pengurusan senarai institusi rakan kongsi dan agensi kerjasama. | Staff+ |
| **Permohonan Bantuan** | Portal digital untuk memproses dan menjejak permohonan bantuan baru daripada pemohon. | Staff+ |
| **PUSPA Niaga** | Platform produk dan jualan untuk asnaf entrepreneur. (Baru) | Staff+ |

### Modul untuk Admin dan Developer Sahaja

| Modul | Keterangan | Akses |
|:---|:---|:---|
| **eKYC** | Pengesahan identiti ahli melalui dokumen dan teknologi *Face Match*. Termasuk skor padanan dan status pengesahan. | Admin+ |
| **Kepatuhan (Compliance)** | Pemantauan status audit, pendaftaran ROSM, dan pematuhan LHDN. Pengurusan dokumen bukti dan tarikh tamat tempoh. | Admin+ |
| **Laporan (Reports)** | Penjanaan laporan bulanan, statistik impak, dan eksport data ke CSV untuk analisa mendalam. | Admin+ |
| **TapSecure** | Pemantauan sesi aktif, akses PII (Personal Identifiable Information), dan log keselamatan sistem. | Admin+ |
| **Admin** | Panel kesihatan pangkalan data, status servis AI, dan log sistem. Pantau prestasi keseluruhan platform. | Admin+ |

### Modul untuk Developer Sahaja

| Modul | Keterangan | Akses |
|:---|:---|:---|
| **AI** | Konfigurasi parameter model AI, kunci API (OpenRouter), dan tetapan lanjutan untuk Maria Puspa. | Developer |

> [!NOTE]
> Modul yang tidak mempunyai akses untuk peranan anda akan **disembunyikan dari sidebar**. Jika anda memerlukan akses tambahan, hubungi pentadbir sistem anda.

---

## 📱 5. Bot Telegram (@MariaPuspaBot)

Maria Puspa turut tersedia melalui **Telegram** untuk kemudahan akses di luar pejabat.

### 5.1 Memulakan

1. Buka Telegram dan cari **@MariaPuspaBot**.
2. Hantar `/start` untuk memulakan perbualan.
3. Bot akan menyambut anda dan menerangkan keupayaan asas.

> [!IMPORTANT]
> Akses kepada bot Telegram dikawal melalui **allowlist** (senarai chat ID yang dibenarkan). Jika anda tidak boleh mengakses bot, hubungi pentadbir untuk menambah chat ID anda.

### 5.2 Arahan yang Tersedia

| Arahan | Keterangan |
|:---|:---|
| `/start` | Mesej aluan dan pengenalan Maria Puspa. |
| `/help` | Senarai semua arahan yang tersedia. |
| `/reset` | Reset perbualan -- semua konteks sesi akan dipadam. |
| `/role [staff\|admin\|developer]` | Tukar peranan akses. **Nota**: Hanya admin Telegram yang boleh tetapkan role `admin` atau `developer`. |
| `/avatar` | Jana video avatar Maria Puspa (menggunakan SadTalker). |
| `/status` | Papar status sistem: peranan, bilangan mesej, sesi aktif, dan status allowlist. |
| `/testavatar` | Uji sambungan ke servis avatar SadTalker. |

### 5.3 Had Peranan di Telegram

- **Staff**: Akses kepada data operasi asas (ahli, kes, derma, program).
- **Admin**: Akses penuh termasuk data kepatuhan, laporan, dan agihan.
- **Developer**: Akses kepada tetapan AI dan konfigurasi sistem.

> Arahan `/role` untuk menukar ke `admin` atau `developer` memerlukan chat ID anda disenarai sebagai **admin Telegram** dalam tetapan sistem.

### 5.4 Perbezaan Antara Web Chat dan Telegram Bot

| Ciri | Web Chat (Dalam Aplikasi) | Telegram Bot |
|:---|:---|:---|
| **Akses** | Melalui sidebar PUSPA V5 | Melalui aplikasi Telegram |
| **Paparan data** | Format kaya dengan jadual dan graf | Format teks/Markdown |
| **Avatar video** | Paparan avatar 3D dalam panel | Video avatar melalui SadTalker |
| **Quick prompts** | Butang tersedia di panel chat | Tiada -- guna arahan atau taip soalan |
| **Notifikasi** | Dalam aplikasi sahaja | Notifikasi push Telegram |
| **Akses luar pejabat** | Memerlukan log masuk ke PUSPA | Akses terus melalui Telegram |
| **Peranan** | Mengikut log masuk pengguna | Tetapan sendiri melalui `/role` |

---

## 💡 6. Tips & Trik (Tips & Tricks)

### 6.1 Menggunakan Carian di Header

- Bar carian di **top bar** membolehkan anda mencari dengan pantas merentasi modul.
- Taip kata kunci (contoh: nama ahli, nombor kes, atau jenis derma) dan tekan **Enter**.
- Keputusan carian dipaparkan mengikut kategori modul untuk navigasi cepat.

### 6.2 Pintasan Papan Kekunci (Keyboard Shortcuts)

| Pintasan | Tindakan |
|:---|:---|
| `Ctrl + K` | Buka bar carian global |
| `Esc` | Tutup panel popup / modal |
| `Ctrl + /` | Papar senarai pintasan yang tersedia |

> Pintasan tambahan mungkin tersedia dalam modul tertentu. Lihat ikon **?** dalam modul untuk maklumat lanjut.

### 6.3 Tukar Tema (Theme Toggle)

- Klik ikon **bulan/matahari** di top bar untuk menukar antara mod **Terang (Light)** dan **Gelap (Dark)**.
- Pilihan tema anda disimpan secara automatik dan akan diingati pada log masuk seterusnya.
- Mod gelap sesuai untuk penggunaan waktu malam dan menjimatkan bateri pada skrin OLED.

### 6.4 Penggunaan Mudah Alih (Mobile)

- PUSPA V5 adalah **responsive** -- ia menyesuaikan diri dengan saiz skrin telefon dan tablet.
- **Sidebar** boleh diakses dengan mengetuk ikon **hamburger (☰)** di bahagian atas kiri.
- **Maria Puspa** turut tersedia di mudah alih -- ikon chat muncul di bahagian bawah kanan.

> [!TIP]
> Untuk pengalaman terbaik di mudah alih, guna dalam mod landskap (landscape) apabila melihat jadual data yang banyak.

### 6.5 Pemasangan PWA (Progressive Web App)

PUSPA V5 boleh dipasang sebagai **PWA** pada peranti anda untuk akses lebih pantas:

**Android (Chrome):**
1. Buka PUSPA V5 dalam pelayar Chrome.
2. Ketuk menu **(titik tiga)** di bahagian atas kanan.
3. Pilih **"Add to Home screen"** atau **"Pasang Aplikasi"**.
4. Ikon PUSPA akan muncul di skrin utama anda.

**iOS (Safari):**
1. Buka PUSPA V5 dalam Safari.
2. Ketuk ikon **Share** (kotak dengan anak panah).
3. Tatal ke bawah dan pilih **"Add to Home Screen"**.
4. Namakan aplikasi dan ketuk **"Add"**.

> [!NOTE]
> PWA berfungsi seperti aplikasi biasa tetapi memerlukan sambungan internet untuk berfungsi. Data yang dimuat turun secara *offline* adalah terhad.

---

## 🔧 7. Penyelesaian Masalah (Troubleshooting)

### 7.1 Sepanduk "Data Demo Dipaparkan"

Jika anda melihat kuning atau sepanduk amaran yang menyatakan **"Data demo dipaparkan"** di bahagian atas halaman:

- Ini bermakna **pangkalan data tidak dapat dihubungi** atau tiada data sebenar tersedia.
- Sistem secara automatik memaparkan **data contoh (demo)** supaya anda boleh melihat format dan ciri-ciri modul.
- **Untuk menyelesaikan**: Pastikan sambungan internet anda stabil dan cuba muat semula halaman. Jika masalah berterusan, hubungi pentadbir sistem.

### 7.2 Maria Puspa Tidak Memberi Respons

Jika Maria Puspa tidak menjawab selepas menghantar mesej:

1. **Tunggu sebentar** -- Maria mungkin sedang memproses (ikon kunci 🔧 kelihatan).
2. **Semak sambungan internet** -- Pastikan anda mempunyai sambungan yang stabil.
3. **Muat semula halaman** -- Tekan `Ctrl + R` (Windows) atau `Cmd + R` (Mac).
4. **Reset sesi** -- Log keluar dan log masuk semula untuk memulakan sesi baru.
5. **Semak tetapan AI** -- Jika anda adalah Developer, periksa modul **AI** untuk memastikan kunci API OpenRouter diset dengan betul.

> Jika Maria memberikan mesej ralat seperti *"tidak dapat dihubungi"*, ini mungkin menandakan masalah pada pelayan AI. Sila laporkan kepada pasukan teknikal.

### 7.3 Mesej Pangkalan Data Tidak Tersedia

Jika anda melihat mesej seperti:

- *"Database unavailable"* -- Pangkalan data tidak dapat dihubungi.
- *"Tiada data dijumpai"* -- Carian tidak mengembalikan sebarang keputusan.
- *"Ralat sambungan"* -- Sambungan antara pelayan dan pangkalan data terputus.

**Langkah untuk menyelesaikan:**
1. Tunggu 30 saat dan cuba semula -- kadangkala sambungan pulih secara automatik.
2. Muat semula halaman.
3. Jika menggunakan VPN, cuba nyalakan semula sambungan VPN.
4. Hubungi pentadbir jika masalah berterusan lebih daripada 5 minit.

### 7.4 Cara Melaporkan Pepijat (Bug)

Jika anda menghadapi masalah atau pepijat yang tidak disenarankan di sini:

1. **Dokumentasikan masalah**: Ambil *screenshot* mesej ralat atau tingkah laku yang tidak dijangka.
2. **Catat langkah**: Tulis langkah-langkah yang membawa kepada masalah tersebut.
3. **Hantar laporan**: Hubungi pasukan PUSPA melalui:
   - **E-mel**: hantar kepada pentadbir sistem anda.
   - **Telegram**: Laporkan melalui @MariaPuspaBot dengan arahan `/help` untuk arahan lanjut.
   - **Modul Aktiviti**: Semak log aktiviti untuk sebarang ralat sistem yang direkodkan secara automatik.

> [!TIP]
> Laporan yang lengkap (dengan screenshot dan langkah pengulangan) membantu pasukan teknikal menyelesaikan masalah dengan lebih pantas.

---

## 📞 8. Hubungi Kami (Contact)

### Maklumat PUSPA

**Pertubuhan Urus Peduli Asnaf (PUSPA)**
Sistem PUSPA V5 -- Platform Pengurusan NGO yang Diperkasakan AI

| Saluran | Butiran |
|:---|:---|
| **E-mel** | Sila hubungi emel rasmi PUSPA yang diberikan oleh pentadbir organisasi anda. |
| **Telegram** | @MariaPuspaBot -- untuk pertanyaan AI dan sokongan asas. |
| **Sokongan Teknikal** | Hubungi pentadbir sistem dalaman anda untuk masalah teknikal. |

### Cara Memohon Akses atau Perubahan Peranan

Jika anda memerlukan:

- **Akses baru** ke modul tertentu yang tidak kelihatan dalam sidebar anda.
- **Pertukaran peranan** (contoh: dari Staff ke Admin).
- **Akses Telegram** kepada @MariaPuspaBot.
- **Penambahan modul** baru yang tidak terdapat dalam senarai anda.

**Langkah untuk memohon:**

1. **Hubungi pentadbir sistem** PUSPA anda secara langsung.
2. Nyatakan peranan semasa anda dan peranan yang dipohon.
3. Jelaskan sebab permohonan (contoh: keperluan tugas, tanggungjawab baru).
4. Pentadbir akan mengemaskini tetapan peranan anda dalam sistem.

> [!NOTE]
> Perubahan peranan memerlukan kelulusan daripada **Admin** atau **Developer**. Proses ini mungkin mengambil masa sehingga 1 hari bekerja untuk tujuan keselamatan dan audit.

---

## 🔒 9. Keselamatan & Privasi (PDPA)

Sistem ini mematuhi Akta Perlindungan Data Peribadi 2010 (PDPA):

1. **Masking IC**: Nombor IC ahli akan sentiasa dipaparkan sebagai `****XXXX` untuk melindungi privasi.
2. **Audit Log**: Setiap tindakan (tambah, padam, edit) direkodkan dalam modul **Aktiviti**.
3. **Persetujuan (Consent)**: Pastikan ahli memberikan persetujuan sebelum mendaftarkan maklumat mereka.

---

## ❓ Soalan Lazim (FAQ)

**S: Mengapa saya tidak boleh melihat modul Laporan?**
*J: Modul Laporan hanya tersedia untuk pengguna dengan peranan Admin ke atas.*

**S: Adakah data saya selamat?**
*J: Ya, semua data sensitif disulitkan (*encrypted*) dan akses dihadkan melalui sistem peranan (RBAC).*

**S: Bagaimana jika Maria Puspa memberikan maklumat salah?**
*J: Maria menggunakan data dari pangkalan data sistem. Jika terdapat ralat, sila kemaskini rekod dalam modul yang berkaitan.*

**S: Boleh saya guna PUSPA di telefon bimbit?**
*J: Ya, PUSPA V5 adalah responsive dan boleh diakses melalui pelayar web di telefon atau tablet. Anda juga boleh memasangnya sebagai PWA.*

**S: Bagaimana untuk menukar peranan saya di Telegram?**
*J: Guna arahan /role [staff|admin|developer]. Perhatian: hanya admin Telegram yang boleh tetapkan role admin atau developer.*

**S: Mengapa data demo dipaparkan bukannya data sebenar?**
*J: Ini berlaku apabila pangkalan data tidak dapat dihubungi. Sistem memaparkan data contoh supaya anda boleh melihat format. Semak sambungan internet anda.*

---
*Dokumen ini dikemaskini pada: 15 Ogos 2026*
*Oleh: PUSPA Engineering Team*
