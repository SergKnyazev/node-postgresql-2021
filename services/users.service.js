const { User } = require('../models/user.model.js');
// const { database } = require('../database/database.js');
const { supabase } = require('../database/supabaseClient');

const ERROR_GET_ALL_USERS = `users.service.js --> getAllUsers`;
const ERROR_CREATE_USER = `users.service.js --> createUser`;
const ERROR_REMOVE_USER = `users.service.js --> removeUser`;
const ERROR_EDIT_USER = `users.service.js --> editUser`;
const ERROR_SET_EDITED_USER = `users.service.js --> setEditedUser`;

const DB_TABLE_USERS = 'users';

class UsersService {

  //получение данных
  async getAllUsers() {
    console.log('service -- getAllUsers -- 1');

    // const users = await User.findAll({raw: true});

    const { data:users, error } = await supabase
      .from(DB_TABLE_USERS)
      .select();

    console.log('service -- getAllUsers -- 2 : error ------------------------');
    console.log(error)

    if (error) {
      throw new Error(`${ERROR_GET_ALL_USERS} : error === ${error}`)
    }

    console.log('service -- getAllUsers -- 2-2 : users ------------------------');
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

    // const [result] = await Promise.all([User.create(user)]);

    const { data:result, error } = await supabase
      .from(DB_TABLE_USERS)
      .insert([
        // {
        //   name,
        //   age,
        // }
        {...user}
      ])

    console.log('service -- createUser -- 2 : error ------------------------');
    console.log(error)

    if (error) {
      throw new Error(`${ERROR_CREATE_USER} : error === ${error}`)
    }

    console.log('service -- createUser -- 2-2 : result ------------------------');
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

    // const [result] = await Promise.all([User.destroy({where: {id: id}})]);

    const { data:result, error } = await supabase
      .from(DB_TABLE_USERS)
      .delete()
      .match({ id: id });

    console.log('service -- removeUser -- 2 : error ------------------------');
    console.log(error)

    if (error) {
      throw new Error(`${ERROR_REMOVE_USER} : error === ${error}`)
    }

    console.log('service -- removeUser -- 2-2 : result ------------------------');
    console.log(result);

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

    // const [user] = await Promise.all([User.findOne({where: {id: id}})]);

    const { data:result, error } = await supabase
      .from(DB_TABLE_USERS)
      .select()
      .match({ id: id });

    console.log('service -- editUser -- 2 : error ------------------------');
    console.log(error)

    if (error) {
      throw new Error(`${ERROR_EDIT_USER} : error === ${error}`)
    }

    const user = result[0];

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

    // const [result] = await Promise.all([User.update({ name: name, age: age }, { where: { id: id }})]);

    const { data:result, error } = await supabase
      .from(DB_TABLE_USERS)
      .update({
        name,
        age
      })
      .match({ id: id });

    console.log('service -- setEditedUser -- 2 : error ------------------------');
    console.log(error)

    if (error) {
      throw new Error(`${ERROR_SET_EDITED_USER} : error === ${error}`)
    }

    console.log('service -- setEditedUser -- 2-2 : result ------------------------');
    console.log(result)
    return result;
  }

}

const usersService = new UsersService();

module.exports = { usersService };
