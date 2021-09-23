const { database } = require('../database/database.js');

const ERROR_GET_ALL_USERS = `users.service.js --> getAllUsers`;
const ERROR_CREATE_USER = `users.service.js --> createUser`;
const ERROR_REMOVE_USER = `users.service.js --> removeUser`;
const ERROR_EDIT_USER = `users.service.js --> editUser`;
const ERROR_SET_EDITED_USER = `users.service.js --> setEditedUser`;

class UsersService {
  //получение данных
  async getAllUsers() {
    console.log('service -- getAllUsers -- 1');

    const sqlQuery = `SELECT * FROM users`;    // "SELECT * FROM `users`" -- for mySQL

    const users =  await database.query(
      sqlQuery,
      { type: database.QueryTypes.SELECT}
    );

    console.log('service -- getAllUsers -- 2 : users ------------------------');
    console.log(users)

    if (!users) {
      throw new Error(`${ERROR_GET_ALL_USERS} : users === ${users}`)
    }

    return users;
  }

  // добавление данных
  async createUser(user) {
    const {name, age} = user;
    let errorValidation = 'Не указано поле ';
    if (!name) {
      errorValidation += ' NAME';
    }
    if (!age) {
      errorValidation += ' AGE';
    }
    if (!name || !age) {
      throw new Error(`${ERROR_CREATE_USER} : ${errorValidation}`)
    }

    console.log('service -- createUser -- 1');

    const sqlQuery = `INSERT INTO users (name, age) VALUES ('${user.name}', '${user.age}')`;
    const result = await database.query(
      sqlQuery,
      { type: database.QueryTypes.INSERT}
    );

    console.log('service -- createUser -- 2 : result ------------------------');
    console.log(result)
    return result;
  }

  // удаление данных
  async removeUser(id) {
    let errorValidation = `Не указан `
    if (!id) {
      errorValidation += 'ID';
      throw new Error(`${ERROR_REMOVE_USER} : ${errorValidation}`)
    }

    console.log('service -- removeUser -- 1');
    const sqlQuery = `DELETE FROM users WHERE id=${id}`;
    const result = await database.query(
      sqlQuery,
      { type: database.QueryTypes.DELETE}
    );
    console.log('service -- removeUser -- 2 : result ------------------------');
    console.log(result)
    return result;
  }

  // получаем пользователя по id для редактирования
  async editUser(id) {
    let errorValidation = `Не указан `
    if (!id) {
      errorValidation += 'ID';
      throw new Error(`${ERROR_EDIT_USER} : ${errorValidation}`)
    }

    console.log('service -- editUser -- 1');
    const sqlQuery = `SELECT * FROM users WHERE id=${id}`;
    const result = await database.query(
      sqlQuery,
      { type: database.QueryTypes.SELECT}
    );
    const user = result[0];

    console.log('service -- editUser -- 2 : result ------------------------');
    console.log(result)
    console.log('service -- editUser -- 2-2 : user ------------------------');
    console.log(user)
    return user;
  }

  // обновление данных в БД
  async setEditedUser(user) {
    const {name, age, id} = user;
    let errorValidation = 'Не указано поле ';
    if (!name) {
      errorValidation += ' NAME';
    }
    if (!age) {
      errorValidation += ' AGE';
    }
    if (!id) {
      errorValidation += ' ID';
    }
    if (!name || !age || !id) {
      throw new Error(`${ERROR_SET_EDITED_USER} : ${errorValidation}`)
    }
    console.log('service -- setEditedUser -- 1');
    const sqlQuery = `
      UPDATE users 
      SET name='${name}', age=${age} 
      WHERE id=${id}
    `;
    const result = await database.query(
      sqlQuery,
      { type: database.QueryTypes.UPDATE}
    );
    console.log('service -- setEditedUser -- 2 : result ------------------------');
    console.log(result)
    return result;
  }

}

const usersService = new UsersService();

module.exports = { usersService };

