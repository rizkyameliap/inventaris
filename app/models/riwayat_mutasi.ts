import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Barang from './barang.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class RiwayatMutasi extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public barangId!: number

  @column()
  public asal!: string

  @column()
  public tujuan!: string

  @column()
  public tanggal!: Date

  @column()
  public keterangan!: string

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @belongsTo(() => Barang)
  public barang!: BelongsTo<typeof Barang>
}
