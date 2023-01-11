const DataTypes = require("sequelize");
const { Model } = DataTypes;

class KospiIndex extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          unique: false,
        },
        closePrice: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "KospiIndex",
        tableName: "kospiindex",
        charset: "utf8",
        collate: "utf8_general_ci",
        createdAt: false,
        updatedAt: false,
      }
    );
  }

  static associate(db) {}
}
module.exports = KospiIndex;
