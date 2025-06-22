import Barang from '#models/barang'
import Kategori from '#models/kategori'
import Lokasi from '#models/lokasi'
import { barangValidator } from '#validators/barang'
import type { HttpContext } from '@adonisjs/core/http'

export default class BarangController {
  async index({ view }: HttpContext) {
    const barangs = await Barang.query().preload('kategori').preload('lokasi').orderBy('createdAt', 'desc')
    return view.render('pages/barang/index', { barangs })
  }

  async create({ view }: HttpContext) {
    const kategoris = await Kategori.all()
    const lokasis = await Lokasi.all()
    return view.render('pages/barang/create', { kategoris, lokasis })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(barangValidator)
    await Barang.create({
      nama: payload.nama,
      kodeBarang: payload.kode_barang,
      jumlah: payload.jumlah,
      kategoriId: payload.kategori_id,
      lokasiId: payload.lokasi_id,
    })
    session.flash('success', 'Barang baru berhasil ditambahkan.')
    return response.redirect().toRoute('barang.index')
  }

  async edit({ params, view }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)
    const kategoris = await Kategori.all()
    const lokasis = await Lokasi.all()
    return view.render('pages/barang/edit', { barang, kategoris, lokasis })
  }

  async update({ params, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(barangValidator)
    const barang = await Barang.findOrFail(params.id)
    barang.merge({
      nama: payload.nama,
      kodeBarang: payload.kode_barang,
      jumlah: payload.jumlah,
      kategoriId: payload.kategori_id,
      lokasiId: payload.lokasi_id,
    })
    await barang.save()
    session.flash('success', 'Data barang berhasil diperbarui.')
    return response.redirect().toRoute('barang.index')
  }
}
