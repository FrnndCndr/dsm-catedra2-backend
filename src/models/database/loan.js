module.exports = (sequelize, DataTypes) => {
  const loan = sequelize.define(
    "loan",
    {
      idLoan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUser: DataTypes.INTEGER,
      idBook: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      state: DataTypes.STRING,
    },
    {
      tableName: "loan",
      timestamps: false,
    }
  );

  loan.associate = (models) => {
    loan.belongsTo(models.user, { foreignKey: "idUser" });
    loan.belongsTo(models.book, { foreignKey: "idBook" });
  };

  return loan;
};
