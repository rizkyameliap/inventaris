import User from '#models/user'
import { userRegisterValidator } from '#validators/user_register'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  // Menampilkan halaman login
  async showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  // Memproses data login
  async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      await User.verifyCredentials(email, password)
      const user = await User.findByOrFail('email', email)
      await auth.use('web').login(user)
      session.flash('success', 'Login berhasil! Selamat datang kembali.')
      return response.redirect().toRoute('dashboard') 
    } catch (error) {
      session.flash({ error: 'Email atau password yang Anda masukkan salah.', input: request.only(['email']) })
      return response.redirect().back()
    }
  }

  // Menampilkan halaman register
  async showRegister({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  // Memproses data registrasi
  async register({ request, response, session }: HttpContext) {
    let payload
    try {
      // Tahap 1: Mencoba melakukan validasi data
      payload = await request.validateUsing(userRegisterValidator)
      // Jika berhasil, cetak log ini ke terminal
      console.log('LOG: Validasi berhasil, data yang akan disimpan:', payload)

    } catch (error) {
      // Jika validasi gagal, error akan ditangkap di sini
      console.error('ERROR VALIDASI:', error.messages)
      // Adonis akan otomatis redirect kembali ke form, tapi kita bisa lihat errornya di terminal
      // 'throw error' akan menghentikan eksekusi dan menampilkan error di browser jika diperlukan
      throw error 
    }

    try {
      // Tahap 2: Mencoba menyimpan data ke Database
      await User.create(payload)
      // Jika berhasil, cetak log ini ke terminal
      console.log('LOG: SUKSES, User berhasil dibuat di database!')

    } catch (error) {
      // Jika ada error saat .create() (misal: kolom tidak cocok, dll)
      // Error detailnya akan tercetak di terminal
      console.error('ERROR DATABASE SAAT CREATE:', error)

      // Beri tahu pengguna bahwa ada masalah teknis
      session.flash('error', 'Gagal menyimpan data ke database. Silakan periksa terminal untuk detail error.')
      return response.redirect().back()
    }

    // Tahap 3: Redirect jika semua tahap di atas berhasil
    session.flash('success', 'Registrasi berhasil! Silakan login dengan akun baru Anda.')
    return response.redirect().toRoute('auth.showLogin')
  }
  
  // Proses logout
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'Anda berhasil logout.')
    return response.redirect().toRoute('auth.showLogin')
  }
}