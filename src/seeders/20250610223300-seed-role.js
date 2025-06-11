"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("role", [
      { roleId: 1, name: "admin" },
      { roleId: 2, name: "client" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("role", null, {});
  },
};