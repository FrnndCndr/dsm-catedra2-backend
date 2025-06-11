'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loan', {
      idLoan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'idUser'
        }
      },
      idBook: {
        type: Sequelize.INTEGER,
        references: {
          model: 'book',
          key: 'idBook'
        }
      },
      startDate: Sequelize.DATE,
      endDate: Sequelize.DATE,
      state: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('loan');
  }
};
