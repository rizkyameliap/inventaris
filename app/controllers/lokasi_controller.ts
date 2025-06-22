import Lokasi from '#models/lokasi'
import { lokasiValidator } from '#validators/lokasi'
import type { HttpContext } from '@adonisjs/core/http'

export default class LokasiController {
  async index({ view }: HttpContext) {
    const lokasis = await Lokasi.all()
    return view.render('pages/lokasi/index', { lokasis })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/lokasi/create')
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(lokasiValidator)
    await Lokasi.create({ namaLokasi: payload.nama_lokasi, gedung: payload.gedung })
    session.flash('success', 'Lokasi baru berhasil ditambahkan.')
    return response.redirect().toRoute('lokasi.index')
  }

  async edit({ params, view }: HttpContext) {
    const lokasi = await Lokasi.findOrFail(params.id)
    return view.render('pages/lokasi/edit', { lokasi })
  }

  async update({ params, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(lokasiValidator)
    const lokasi = await Lokasi.findOrFail(params.id)
    lokasi.merge({ namaLokasi: payload.nama_lokasi, gedung: payload.gedung })
    await lokasi.save()
    session.flash('success', 'Data lokasi berhasil diperbarui.')
    return response.redirect().toRoute('lokasi.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const lokasi = await Lokasi.findOrFail(params.id)
    await lokasi.loadCount('barang')
    if (lokasi.$extras.barang_count > 0) {
      session.flash('error', `Lokasi tidak bisa dihapus karena masih menjadi tempat untuk ${lokasi.$extras.barang_count} barang.`)
      return response.redirect().back()
    }
    await lokasi.delete()
    session.flash('success', 'Lokasi berhasil dihapus.')
    return response.redirect().toRoute('lokasi.index')
  }
}
