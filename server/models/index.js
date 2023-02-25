const dbConfig = require("../config/config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const { relationSetup } = require('./relationSetup');

const modelDefiners = [
  require('./model/Food'),
  require('./model/Local'),
  require('./model/Opinion'),
  require('./model/Owner'),
  require('./model/Student'),
  require('./model/UserType'),
];

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize, Sequelize);
}
relationSetup(sequelize);

module.exports = db;