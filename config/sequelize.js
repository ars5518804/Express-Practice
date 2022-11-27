const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABSE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABSE_HOST,
    dialect: "mysql",
    logging: false,
    timezone: '+09:00'
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}


