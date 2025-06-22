import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'
import env from '#start/env'

const dbConfig = defineConfig({
  // Menentukan koneksi default dari file .env
  connection: env.get('DB_CONNECTION', 'sqlite'),

  connections: {
    /**
     * Konfigurasi untuk SQLite (default jika tidak ada .env)
     * Kita tidak menggunakan ini lagi, tetapi biarkan saja.
     */
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: app.tmpPath('db.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },

    /**
     * Konfigurasi untuk MySQL.
     * Adonis akan menggunakan ini karena kita set DB_CONNECTION=mysql di .env
     */
    mysql: {
      client: 'mysql2', // Menggunakan driver mysql
      connection: {
        host: env.get('DB_HOST', '127.0.0.1'),
        port: env.get('DB_PORT', 3306),
        user: env.get('DB_USER', 'root'),
        password: env.get('DB_PASSWORD', ''),
        database: env.get('DB_DATABASE', ''),
        // Opsi tambahan jika diperlukan, misalnya untuk SSL
        // ssl: {
        //   rejectUnauthorized: false
        // }
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },

    /**
     * Anda bisa menambahkan konfigurasi untuk database lain di sini
     * seperti PostgreSQL, dll.
     */

  },
})

export default dbConfig