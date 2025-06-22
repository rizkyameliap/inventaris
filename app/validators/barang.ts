import vine from '@vinejs/vine'

export const barangValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(3),
    kode_barang: vine.string().trim(), 
    jumlah: vine.number().min(0),
    kategori_id: vine.number().exists(async (db, value) => !!await db.from('kategoris').where('id', value).first()),
    lokasi_id: vine.number().exists(async (db, value) => !!await db.from('lokasis').where('id', value).first()),
  })
)