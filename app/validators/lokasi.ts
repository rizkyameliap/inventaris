import vine from '@vinejs/vine'

export const lokasiValidator = vine.compile(
  vine.object({
    nama_lokasi: vine.string().trim().minLength(3),
    gedung: vine.string().trim().minLength(1),
  })
)
