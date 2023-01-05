const DataTypes = require("sequelize");
const { Model } = DataTypes;

class Kospi extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: false,
        },
        shortCode: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
        },
        industry: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        products: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        listingDate: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        CEO: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Kospi",
        tableName: "kospi",
        charset: "utf8",
        collate: "utf8_general_ci",
        createdAt: false,
        updatedAt: false,
      }
    );
  }

  static associate(db) {}
}
module.exports = Kospi;
