/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Import semua controller yang akan kita gunakan
const AuthController = () => import('#controllers/auth_controller')
const BarangController = () => import('#controllers/barang_controller')
const KategoriController = () => import('#controllers/kategori_controller')
const LokasiController = () => import('#controllers/lokasi_controller')
const MutasiController = () => import('#controllers/mutasi_controller')
import LaporanController from '#controllers/laporan_controller'


// [DIUBAH] Rute Halaman Utama sekarang lebih sederhana, hanya untuk tamu
router.get('/', async ({ view }) => {
  return view.render('pages/home')
}).as('home').middleware(middleware.guest()) // Diberi middleware guest agar user login tidak melihatnya lagi

// --- RUTE UNTUK TAMU (YANG BELUM LOGIN) ---
router
  .group(() => {
    // Rute untuk menampilkan form dan memproses login/register
    router.get('/login', [AuthController, 'showLogin']).as('auth.showLogin')
    router.post('/login', [AuthController, 'login']).as('auth.login')
    router.get('/register', [AuthController, 'showRegister']).as('auth.showRegister')
    router.post('/register', [AuthController, 'register']).as('auth.register')
  })
  .middleware(middleware.guest()) // Middleware 'guest' memastikan hanya user belum login yang bisa akses

// --- RUTE YANG MEMBUTUHKAN LOGIN ---
router
  .group(() => {

    // [TAMBAHAN] RUTE DASHBOARD YANG SEBENARNYA ADA DI SINI
    router.get('/dashboard', async ({ view }) => {
        // Logika untuk menampilkan halaman utama setelah login dipindahkan ke sini
        const barangs = await import('#models/barang').then(m => m.default.query().preload('kategori').preload('lokasi'))
        
        // Ganti 'pages/dashboard' jika nama file view dashboard Anda berbeda
        return view.render('pages/dashboard', { barangs: barangs }) 
    }).as('dashboard')


    // Logout
    router.post('/logout', [AuthController, 'logout']).as('auth.logout')

    // Rute resource untuk CRUD (Create, Read, Update, Delete)
    router.resource('barang', BarangController)
    router.resource('kategori', KategoriController)
    router.resource('lokasi', LokasiController)

    // Rute spesifik untuk Mutasi dan Penghapusan Barang
    router.get('/barang/:id/mutasi', [MutasiController, 'showMutasiForm']).as('mutasi.show')
    router.post('/barang/:id/mutasi', [MutasiController, 'storeMutasi']).as('mutasi.store')
    router.get('/barang/:id/hapus', [MutasiController, 'showHapusForm']).as('hapus.show')
    router.post('/barang/:id/hapus', [MutasiController, 'storeHapus']).as('hapus.store')

    // Rute untuk Laporan
    router.get('/laporan', new LaporanController().index).as('laporan.index')
  })
  .middleware(middleware.auth()) // Middleware 'auth' memastikan hanya user terotentikasi yang bisa akses