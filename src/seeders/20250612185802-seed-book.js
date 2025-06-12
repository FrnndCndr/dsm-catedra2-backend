"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("book", [
      {
        title: "El Señor de los Anillos",
        author: "J.R.R. Tolkien",
        gender: "Fantasía",
        date: "1954-07-29",
        available: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cien Años de Soledad",
        author: "Gabriel García Márquez",
        gender: "Realismo Mágico",
        date: "1967-05-30",
        available: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "1984",
        author: "George Orwell",
        gender: "Distopía",
        date: "1949-06-08",
        available: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("book", null, {});
  },
};
