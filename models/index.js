const { Sequelize, DataTypes } = require('sequelize');
const initModels = require('./init-models');
require('dotenv').config(); 

const database = process.env.MYSQL_DATABASE;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Models synced to the database');
  })
  .catch((err) => {
    console.error('Unable to sync models:', err);
  });

const models = initModels(sequelize, DataTypes);

module.exports = models;
