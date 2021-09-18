const express = require('express');
// require('dotenv').config();
const { database } = require('./database/database.js');
const { usersRouter } = require('./routers/users.router.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(usersRouter);

app.set('view engine', 'hbs');

;(async function startApp() {
  try {
      app.listen(PORT, () => {
      console.log(`+++ Server has been started on port ${PORT}...`)
    });

    await database.authenticate();
    console.log('+++ Database MySQL is connected...');

    // синхронизация с моделями БД
    database
      .sync()
      .then(() => {
        console.log('+++ Models of database has been synchronized ...');
      })
      .catch((err) => console.log(`---ERROR : ${err}`));
  } catch (err) {
    console.log(`---ERROR : function startAPP with err=${err}`)
  }
})()

//TODO ::: Sequelize --> SQL
//TODO ::: Sequelize --> Model
//TODO ::: supabase --> SQL
//TODO ::: supabase --> supabase API + subscribe on events
