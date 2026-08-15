---
title: "PUSPA-Z Sovereign Markdown Standard (SMS-v1.0)"
document_id: "PUSPA-DOC-STD-001"
version: "1.0.0"
last_updated: "2026-08-15T23:32:00+08:00"
maintainer: "HYPER-SOVEREIGN CONDUCTOR & ARCHITECT"
classification: "INTERNAL MANDATE"
lifecycle_status: "ACTIVE"
---

# 📜 PUSPA-Z Sovereign Markdown & Audit Standard (SMS-v1.0)

> **Mandat Mutlak**: Setiap fail `.md` dalam repositori PUSPA-Z WAJIB mematuhi format ini supaya setiap perubahan sekecil mana pun boleh dikesan dengan tepat dari segi **Masa**, **Pengarang/Ejen**, **Tujuan (Kenapa)**, dan **Kaedah (Bagaimana)**.

---

## 🎯 1. Standard Header & Frontmatter (Wajib pada Baris Pertama)

Setiap fail `.md` mesti dimulakan dengan blok YAML Frontmatter standard:

```yaml
---
title: "Tajuk Dokumen"
document_id: "PUSPA-DOC-XXX"
version: "5.6.X"
last_updated: "YYYY-MM-DDTHH:mm:ss+08:00"
maintainer: "Nama Pengarang / ID Ejen / Peranan"
classification: "INTERNAL / PUBLIC / RESTRICTED"
lifecycle_status: "DRAFT / ACTIVE / DEPRECATED"
---
```

---

## 📋 2. Jadual Jejak Audit Perubahan (Audit & Revision Ledger)

Setiap dokumen teknikal mesti mempunyai seksyen **Audit & Revision Ledger** di bawah tajuk utama:

```markdown
## 📜 Audit & Revision Ledger

| Versi | Tarikh & Masa (MYT) | Pengarang / Ejen | Kenapa (Rasional Perubahan) | Bagaimana (Kaedah & Skop Fail) | Pengesahan |
| :---: | :---: | :---: | :--- | :--- | :---: |
| `5.6.1` | `2026-08-15 23:30` | `Conductor Agent` | Membuang sekatan fallback `prefersReducedMotion` yang menyembunyikan butang 05 | Modifikasi `portal-interactive-ecosystem.tsx` baris 320 | `typecheck: 0 errors` |
```

### Format Medan Ledger:
1. **Versi (`version`)**: Menggunakan format SemVer (`x.y.z`).
2. **Tarikh & Masa (`timestamp`)**: Waktu piawai Malaysia (MYT UTC+8) dengan format `YYYY-MM-DD HH:mm:ss`.
3. **Pengarang / Ejen (`author`)**: Nama individu atau ID Ejen yang menjalankan perubahan.
4. **Kenapa (`why`)**: Rasional, punca masalah (*root cause*), atau objektif keperluan pengguna.
5. **Bagaimana (`how`)**: Logik perubahan kod, fail yang disentuh, baris atau komponen yang terlibat.
6. **Pengesahan (`validation`)**: Bukti empirikal ujian (contoh: `bun run typecheck`, `chrome-devtools screenshot`, `pytest`).

---

## 🛡️ 3. Peraturan Penyelenggaraan `.md`

1. **Anti-Stale Rule**: Sebarang pengubahsuaian kod fizikal yang memberi kesan kepada tingkah laku sistem WAJIB disusuli dengan kemaskini tarikh `last_updated` dan rekod baris baharu dalam jadual *Audit Ledger*.
2. **Sifar Maklumat Mengelirukan**: Dilarang mengekalkan perenggan sejarah yang bertentangan dengan seni bina semasa tanpa meletakkannya di bawah tag `> [!NOTE]` atau seksyen arkib.
3. **Pautan Simbol & Fail Tepat**: Semua rujukan fail mesti menggunakan format clickable markdown link `[filename](file:///path)`.
