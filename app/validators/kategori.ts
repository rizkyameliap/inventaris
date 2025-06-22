import vine from '@vinejs/vine'

export const kategoriValidator = vine.compile(
  vine.object({
    nama_kategori: vine.string().trim().minLength(3),
  })
)