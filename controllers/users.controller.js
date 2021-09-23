const { usersService } = require('../services/users.service.js');

const ERROR_RENDER_CREATE_PAGE = `users.controller.js --> renderCreatePage --> catch`;
const ERROR_GET_ALL_USERS = `users.controller.js --> getAllUsers --> catch`;
const ERROR_CREATE_USER = `users.controller.js --> createUser --> catch`;
const ERROR_REMOVE_USER = `users.controller.js --> removeUser --> catch`;
const ERROR_EDIT_USER = `users.controller.js --> editUser --> catch`;
const ERROR_SET_EDITED_USER = `users.controller.js --> setEditedUser --> catch`;

class UsersController {

  // рендер формы добавления данных
  async renderCreatePage(req, res) {
    try {
      res.render('create.hbs');
    } catch (err) {
      res.render('error.hbs', {
        message: `${ERROR_RENDER_CREATE_PAGE} : ${err}`,
      })
    }
  }

  //получение данных
  async getAllUsers(req, res) {
    try {
      const users = await usersService.getAllUsers();
      console.log('controller -- getAllUsers -- 3 : users ------------------------');
      console.log(users)

      res.render('index.hbs', {
        users: users,
      })
    } catch (err) {
      res.render('error.hbs', {
        message: `${ERROR_GET_ALL_USERS} : ${err}`,
      })
    }
  }

  //добавление данных
  async createUser(req, res) {
    try {
      await usersService.createUser(req.body);
      console.log('controller -- createUser -- 3 : result ------------------------');
      console.log(req.body)

      res.redirect('/')
    } catch (err) {
      res.render('error.hbs', {
        message: `${ERROR_CREATE_USER} : ${err}`,
      })
    }
  }

  //удаление данных
  async removeUser (req, res) {
    try {
      await usersService.removeUser(req.params.id);
      res.redirect('/')
    } catch (err) {
      res.render('error.hbs', {
        message: `${ERROR_REMOVE_USER} : ${err}`,
      })
    }
  }

// получаем пользователя по id для редактирования
  async editUser (req, res) {
    try {
      const user = await usersService.editUser(req.params.id);
      res.render('edit.hbs', {
        user: user,
      })
    } catch (err) {
      res.render('error.hbs', {
        message: `${ERROR_EDIT_USER} : ${err}`,
      })
    }
  }

  // обновление данных в БД
  async setEditedUser (req, res) {
    try {
      await usersService.setEditedUser(req.body);
      res.redirect('/')
    } catch (err) {
      res.render('error.hbs', {
        message: `${ERROR_SET_EDITED_USER} : ${err}`,
      })
    }
  }

}

const usersController = new UsersController();

module.exports = { usersController };
