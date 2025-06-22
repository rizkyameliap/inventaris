import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'penghapusans'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('barang_id').unsigned().references('barangs.id').onDelete('CASCADE')
      table.string('alasan').notNullable()
      table.timestamp('tanggal').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
  async down() { this.schema.dropTable(this.tableName) }
}