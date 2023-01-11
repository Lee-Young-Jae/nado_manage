const Sequelize = require("sequelize");
const config = require("../config/config")["development"]; // 배포시 수정할것.

const user = require("./user");
const kospi = require("./kospi");
const kospiIndex = require("./kospiIndex");

// node와 mySql연결
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    timezone: "Asia/Seoul",
  }
);

const db = {};
db.User = user;
db.Kospi = kospi;
db.KospiIndex = kospiIndex;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

// 테이블 간 관계 연결
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
