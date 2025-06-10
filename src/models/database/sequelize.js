const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "dsmDB.sqlite",
});

module.exports = sequelize;
