'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('user', [
      {
        name: 'Jose',
        lastName: 'Benitez',
        email: 'jose.benitez@ce.ucn.cl',
        password: bcrypt.hashSync('jbenitez123', salt),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fernando',
        lastName: 'Condori',
        email: 'fernando.condori01@alumnos.ucn.cl',
        password: bcrypt.hashSync('fernando123', salt),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cliente',
        lastName: '1',
        email: 'Cliente1@example.com',
        password: bcrypt.hashSync('test123', salt),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cliente',
        lastName: '2',
        email: 'Cliente2@example.com',
        password: bcrypt.hashSync('test123', salt),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('user', null, {});
  }
};