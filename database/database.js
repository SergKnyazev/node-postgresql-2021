const Sequelize = require('sequelize');
require('dotenv').config();

const database = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
  dialect: 'postgres',
  host: 'db.gmfckeoclfrynpdfhtci.supabase.co',
  port: '6543',
  define: {
    timestamps: false,
  },
});

module.exports = { database }
