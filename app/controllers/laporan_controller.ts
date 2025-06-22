import Barang from '#models/barang'
import Lokasi from '#models/lokasi'
import type { HttpContext } from '@adonisjs/core/http'

export default class LaporanController {
  async index({ view }: HttpContext) {
    const laporanPerLokasi = await Lokasi.query().withCount('barang', (query) => {
      query.as('jumlah_total_barang')
    })
    const barangAktif = await Barang.query().preload('kategori').preload('lokasi')
    
    return view.render('pages/laporan/index', { laporanPerLokasi, barangAktif })
  }
}
