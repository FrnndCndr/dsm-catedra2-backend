module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {
      tableName: "user",
      timestamps: false,
    }
  );

  user.associate = (models) => {
    user.hasMany(models.loan, { foreignKey: "idUser" });
  };

  return user;
};
