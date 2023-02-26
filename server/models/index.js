const dbConfig = require("../config/config.js");
const Sequelize = require("sequelize");
const fs = require('fs');
const path = require('path');

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

var dirPath = path.dirname(__dirname);
var files = fs.readdirSync(dirPath+'/models/model');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

for (const modelPath of files) {
  const model=require(`./model/${modelPath}`)(sequelize, Sequelize);
  const modelName=modelPath.replace('.model.js','');
  db[modelName]=model;
}

relationSetup(sequelize);

module.exports = db;