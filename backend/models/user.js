const DataTypes = require("sequelize");
const { Model } = DataTypes;

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        loginId: {
          type: DataTypes.STRING(25),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        kakaoId: {
          type: DataTypes.STRING(30),
          allowNull: true,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
}
module.exports = User;
