
📦 Inventaris Barang - AdonisJS 6 (Edge View Engine)

Aplikasi Inventaris Barang ini dibuat menggunakan AdonisJS 6 dengan Edge View Engine. Sistem ini dirancang untuk mempermudah pencatatan, pengelolaan, serta pemantauan barang, lokasi, dan riwayat mutasi atau penghapusan barang.

📁 Fitur Utama  
- Autentikasi pengguna (Login & Register)  
- Manajemen data barang (CRUD)  
- Pengelolaan lokasi barang  
- Riwayat mutasi barang ke lokasi lain  
- Penghapusan barang dengan alasan yang dicatat  
- Tampilan UI sederhana menggunakan Tailwind CSS dan Bootstrap  

🛠️ Teknologi yang Digunakan  
- AdonisJS 6  
- Edge View Engine  
- PostgreSQL / MySQL  
- Tailwind CSS / Bootstrap  
- Luxon (untuk waktu & tanggal)  

🗂️ Struktur Tabel (Relasi Utama)  
- **Barang** → belongsTo **Lokasi**  
- **Barang** → hasMany **RiwayatMutasi**  
- **Barang** → hasOne **Penghapusan**  
- **User** → untuk autentikasi  

🚀 Cara Menjalankan  
1. Clone repositori:  
   `git clone https://github.com/rizkyameliap/inventaris.git`

2. Masuk ke folder project:  
   `cd inventaris`

3. Install dependensi:  
   `npm install`

4. Salin file `.env.example` menjadi `.env` lalu atur koneksi database.  

5. Jalankan migrasi database:  
   `node ace migration:run`

6. Mulai server:  
   `node ace serve --watch`

📌 Catatan  
- Pastikan sudah membuat database sesuai yang ditulis di `.env`.  
- Gunakan perintah `node ace db:seed` jika tersedia seeder untuk data awal.  
- Pastikan key SSH atau HTTPS remote Git sudah sesuai jika ingin melakukan `push`.

✉️ Kontak  
Untuk pertanyaan atau kontribusi, silakan hubungi melalui GitHub issues atau email.
