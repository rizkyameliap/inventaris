import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'riwayat_mutasis'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('barang_id').unsigned().references('barangs.id').onDelete('CASCADE')
      table.string('asal').notNullable() // Nama lokasi asal
      table.string('tujuan').notNullable() // Nama lokasi tujuan
      table.timestamp('tanggal').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
  async down() { this.schema.dropTable(this.tableName) }
}