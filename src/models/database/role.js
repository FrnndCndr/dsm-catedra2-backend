"use strict";

module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    "role",
    {
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "role",
      timestamps: false,
    }
  );

  role.associate = (models) => {
    role.hasMany(models.user, { foreignKey: "roleId", as: "user" });
  };

  return role;
};