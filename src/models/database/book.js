module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define(
    "book",
    {
      idBook: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      gender: DataTypes.STRING,
      date: DataTypes.DATE,
      available: DataTypes.BOOLEAN,
      deleted: DataTypes.BOOLEAN,
    },
    {
      tableName: "book",
      timestamps: false,
    }
  );

  book.associate = (models) => {
    book.hasMany(models.loan, { foreignKey: "idBook" });
  };

  return book;
};
