const Router = require('express');
const { usersController } = require('../controllers/users.controller.js');
const bodyParser = require('body-parser');

const usersRouter = Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

usersRouter.route('/')
  .get(usersController.getAllUsers);//получение данных

usersRouter.route('/create')
  .get(usersController.renderCreatePage)//рендер формы добавления данных
  .post(urlencodedParser, usersController.createUser);//добавление данных

usersRouter.route('/delete/:id')
  .post(urlencodedParser, usersController.removeUser);//удаление данных по id

usersRouter.route('/edit/:id')
  .get(usersController.editUser);//получаем пользователя по id для редактирования

// обновление данных в БД
usersRouter.post('/edit', urlencodedParser, usersController.setEditedUser);



//**************************************
// app.route('/book')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   })
//   .post(function(req, res) {
//     res.send('Add a book');
//   })
//   .put(function(req, res) {
//     res.send('Update the book');
//   });

module.exports = { usersRouter }
