import Kategori from '#models/kategori'
import { kategoriValidator } from '#validators/kategori'
import type { HttpContext } from '@adonisjs/core/http'

export default class KategoriController {
  async index({ view }: HttpContext) {
    const kategoris = await Kategori.all()
    return view.render('pages/kategori/index', { kategoris })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/kategori/create')
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(kategoriValidator)
    await Kategori.create({ namaKategori: payload.nama_kategori })
    session.flash('success', 'Kategori baru berhasil ditambahkan.')
    return response.redirect().toRoute('kategori.index')
  }

  async edit({ params, view }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    return view.render('pages/kategori/edit', { kategori })
  }

  async update({ params, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(kategoriValidator)
    const kategori = await Kategori.findOrFail(params.id)
    kategori.namaKategori = payload.nama_kategori
    await kategori.save()
    session.flash('success', 'Data kategori berhasil diperbarui.')
    return response.redirect().toRoute('kategori.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    // Tambahan: Cek jika kategori masih digunakan oleh barang
    await kategori.loadCount('barang')
    const jumlahBarang = kategori.$extras.barang_count
    if (jumlahBarang > 0) {
      session.flash('error', `Kategori tidak bisa dihapus karena masih digunakan oleh ${jumlahBarang} barang.`)
      return response.redirect().back()
    }
    await kategori.delete()
    session.flash('success', 'Kategori berhasil dihapus.')
    return response.redirect().toRoute('kategori.index')
  }
}