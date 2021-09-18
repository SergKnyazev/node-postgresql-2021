const Sequelize = require('sequelize');
require('dotenv').config();

const database = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
  dialect: 'postgres',
  host: 'db.jddrwxcxjvxdjdpogzok.supabase.co',
  port: '6543',
  define: {
    timestamps: false,
  },
});

// const database = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
//   dialect: 'mysql',
//   host: '127.0.0.1',
//   define: {
//     timestamps: false,
//   },
// });

// const database = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
//   dialect: 'mysql',
//   host: 'remotemysql.com',
//   define: {
//     timestamps: false,
//   },
// });
//
module.exports = { database }
