import { Sequelize } from 'sequelize'
require('dotenv').config()

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.GB_PORT || '5432'),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialectOptions: { 
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    },
    define: {
      underscored: true
    }
})