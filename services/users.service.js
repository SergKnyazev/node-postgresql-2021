const { database } = require('../database/database.js');
// const { User } = require('../models/user.model.js');
// const { supabase } = require('../database/supabaseClient');

class UsersService {

  // //получение данных
  // async getAllUsers() {
  //   console.log('getAllUsers has been started...');
  //   return await User.findAll({raw: true});
  // }

  //получение данных
  async getAllUsers() {
    console.log('service -- getAllUsers -- 1');

    const sqlQuery = `SELECT * FROM users`;    // "SELECT * FROM `users`" -- for mySQL

    const users =  await database.query(
      sqlQuery,
      { type: database.QueryTypes.SELECT}
    );

    //*********************************************************************
    // let { data:users, error } = await supabase
    //   .from('users')
    //   .select('*')
    //*********************************************************************

    console.log('service -- getAllUsers -- 2 : users ------------------------');
    console.log(users)
    return users;
  }

  // // добавление данных
  // async createUser(user) {
  //   if (!user.name) {
  //     throw new Error('не указано поле NAME')
  //   }
  //   if (!user.age) {
  //     throw new Error('не указано поле AGE')
  //   }
  //   const [result] = await Promise.all([User.create(user)]);
  //   return result;
  // }

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
      throw new Error(errorValidation)
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

  // // удаление данных
  // async removeUser(id) {
  //   if (!id) {
  //     throw new Error('не указан ID')
  //   }
  //   const [result] = await Promise.all([User.destroy({where: {id: id}})]);
  //   return result;
  // }
  //

  // удаление данных
  async removeUser(id) {
    if (!id) {
      throw new Error('не указан ID')
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

  // // получаем пользователя по id для редактирования
  // async editUser(id) {
  //   if (!id) {
  //     throw new Error('не указан ID')
  //   }
  //   const [user] = await Promise.all([User.findOne({where: {id: id}})]);
  //   return user;
  // }

  // получаем пользователя по id для редактирования
  async editUser(id) {
    if (!id) {
      throw new Error('не указан ID')
    }
    console.log('service -- editUser -- 1');
    const sqlQuery = `SELECT * FROM users WHERE id=${id}`;
    const resultArr = await database.query(
      sqlQuery,
      { type: database.QueryTypes.SELECT}
    );
    const result = resultArr[0];

    console.log('service -- editUser -- 2 : result ------------------------');
    console.log(resultArr)
    return result;
  }

  // // обновление данных в БД
  // async setEditedUser(user) {
  //   const {name, age, id} = user;
  //   let error = 'ERROR : не указано поле ';
  //   if (!name) {
  //     error += ' NAME';
  //   }
  //   if (!age) {
  //     error += ' AGE';
  //   }
  //   if (!id) {
  //     error += ' ID';
  //   }
  //   if (!name || !age || !id) {
  //     throw new Error(error)
  //   }
  //   const [result] = await Promise.all([User.update({ name: name, age: age }, { where: { id: id }})]);
  //   return result;
  // }

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
      throw new Error(errorValidation)
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

