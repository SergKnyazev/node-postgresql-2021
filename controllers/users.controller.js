const { usersService } = require('../services/users.service.js');

const ERROR_RENDER_CREATE_PAGE = `users.controller.js -- renderCreatePage -> catch : error`;

class UsersController {
  // рендер формы добавления данных
  async renderCreatePage(req, res) {
    try {
      res.render('create.hbs');
    } catch (err) {
      console.log(`${ERROR_RENDER_CREATE_PAGE} : ${err}`);
      res.render('error.hbs', {
        message: `${ERROR_RENDER_CREATE_PAGE} : ${err}`,
      })
    }
  }

  //получение данных ****************************************************
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
        message: err,
      })
      // res.status(500).json(err)
    }
  }

  //добавление данных ***************************************************
  async createUser(req, res) {
    try {
        await usersService.createUser(req.body);
        console.log('controller -- getAllUsers -- 3 : result ------------------------');
        console.log(req.body)

      res.redirect('/')
    } catch (err) {
      res.render('error.hbs', {
        message: err,
      })
    }
  }

  //удаление данных ***************************************************
  async removeUser (req, res) {
    try {
      await usersService.removeUser(req.params.id);
      res.redirect('/')
    } catch (err) {
      res.render('error.hbs', {
        message: err,
      })
      // res.status(500).json(err)
    }
  }

// получаем пользователя по id для редактирования ***************************************************
  async editUser (req, res) {
    try {
      const user = await usersService.editUser(req.params.id);
      res.render('edit.hbs', {
        user: user,
      })
    } catch (err) {
      res.render('error.hbs', {
        message: err,
      })
      // res.status(500).json(err)
    }
  }

  // обновление данных в БД
  async setEditedUser (req, res) {
    try {
      await usersService.setEditedUser(req.body);
      res.redirect('/')
    } catch (err) {
      res.render('error.hbs', {
        message: err,
      })
      // res.status(500).json(err)
    }
  }

  

}


const usersController = new UsersController();

module.exports = { usersController };



// const renderCreatePage = (req, res) => {

//   try {
//     res.render('create.hbs');
//   } catch (err) {
//     console.log('------------------- error catch renderCreatePage :');
//     console.log(err);
//   }
// };

// module.exports = { renderCreatePage };
