const express = require('express');
const chalk = require('chalk');
const { database } = require('./database/database.js');
const { usersRouter } = require('./routers/users.router.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(usersRouter);

app.set('view engine', 'hbs');

;(async function startApp() {
  try {
    await database.authenticate();
    console.log(chalk.greenBright(`+++ Database postgreSQL is connected...`));
    app.listen(PORT, () => {
      console.log(chalk.greenBright(`+++ Server has been started on port ${PORT}...`))
    });
  } catch (err) {
    console.log(chalk.redBright(`---ERROR : function startAPP with err=${err}`))
  }
})()
