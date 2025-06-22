import Barang from '#models/barang'
import Lokasi from '#models/lokasi'
import Penghapusan from '#models/penghapusan'
import RiwayatMutasi from '#models/riwayat_mutasi'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class MutasiController {
  // Menampilkan form mutasi
  async showMutasiForm({ params, view }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)
    await barang.load('lokasi')
    const lokasis = await Lokasi.query().whereNot('id', barang.lokasiId)
    return view.render('pages/mutasi/create', { barang, lokasis })
  }

  // Proses mutasi
  async storeMutasi({ params, request, response, session }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)
    await barang.load('lokasi')
    const { tujuan_lokasi_id } = request.only(['tujuan_lokasi_id'])
    const lokasiTujuan = await Lokasi.findOrFail(tujuan_lokasi_id)

    // 1. Buat riwayat mutasi
    await RiwayatMutasi.create({
      barangId: barang.id,
      asal: `${barang.lokasi.namaLokasi} - Gd. ${barang.lokasi.gedung}`,
      tujuan: `${lokasiTujuan.namaLokasi} - Gd. ${lokasiTujuan.gedung}`,
      tanggal: DateTime.now() as any
    })

    // 2. Update lokasi barang
    barang.lokasiId = Number(tujuan_lokasi_id)
    await barang.save()

    session.flash('success', `Barang ${barang.nama} berhasil dimutasi ke ${lokasiTujuan.namaLokasi}.`)
    return response.redirect().toRoute('barang.index')
  }

  // Menampilkan form hapus barang
  async showHapusForm({ params, view }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)
    return view.render('pages/hapus/create', { barang })
  }

  // Proses hapus barang
  async storeHapus({ params, request, response, session }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)
    const { alasan } = request.only(['alasan'])

    // Validasi: barang yang sedang dalam mutasi tidak bisa dihapus.
    const riwayatTerakhir = await RiwayatMutasi.query().where('barang_id', barang.id).orderBy('created_at', 'desc').first()
    if (riwayatTerakhir) {
      // Asumsi sederhana: jika ada riwayat mutasi dalam 1 hari terakhir, anggap sedang "dalam proses"
      const selisihHari = DateTime.now().diff(riwayatTerakhir.createdAt, 'days').days
      if (selisihHari < 1) {
          session.flash('error', 'Barang ini baru saja dimutasi dan tidak dapat dihapus saat ini.')
          return response.redirect().back()
      }
    }

    // 1. Catat di tabel penghapusan
    await Penghapusan.create({
      barangId: barang.id,
      alasan: alasan,
      tanggal: DateTime.now(),
    })

    // 2. Hapus barang dari tabel utama
    await barang.delete()

    session.flash('success', `Barang ${barang.nama} berhasil dihapus dari daftar.`)
    return response.redirect().toRoute('barang.index')
  }
}