import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'barangs'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama').notNullable()
      table.string('kode_barang').notNullable().unique()
      table.integer('kategori_id').unsigned().references('kategoris.id').onDelete('SET NULL')
      table.integer('lokasi_id').unsigned().references('lokasis.id').onDelete('SET NULL')
      table.integer('jumlah').notNullable().defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
  async down() { this.schema.dropTable(this.tableName) }
}