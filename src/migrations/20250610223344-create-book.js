'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('book', {
      idBook: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: Sequelize.STRING,
      author: Sequelize.STRING,
      gender: Sequelize.STRING,
      date: Sequelize.DATE,
      available: Sequelize.BOOLEAN,
      deleted: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('book');
  }
};
