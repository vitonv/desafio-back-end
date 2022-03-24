require('reflect-metadata')
require('dotenv/config')

module.exports = [{
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  syncrhonize: false,
  extra: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  entities: ["./dist/infra/database/entities/**/*.js"],
  migrations: ["./src/infra/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/infra/database/migrations",
  },
}]