import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  column,
  hasMany,
} from '@adonisjs/lucid/orm'
import Kategori from './kategori.js'
import Lokasi from './lokasi.js'
import RiwayatMutasi from './riwayat_mutasi.js'
import Penghapusan from './penghapusan.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Barang extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public nama!: string

  @column()
  public kodeBarang!: string

  @column()
  public kategoriId!: number

  @column()
  public lokasiId!: number

  @column()
  public jumlah!: number

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @belongsTo(() => Kategori)
  public kategori!: BelongsTo<typeof Kategori>

  @belongsTo(() => Lokasi)
  public lokasi!: BelongsTo<typeof Lokasi>

  @hasMany(() => RiwayatMutasi)
  public riwayatMutasi!: HasMany<typeof RiwayatMutasi>

  @hasMany(() => Penghapusan)
  public penghapusan!: HasMany<typeof Penghapusan>
}
