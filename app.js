import express from 'express';

const database = process.env.MYSQL_DATABASE
const user = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const host = process.env.MYSQL_HOST
const port = process.env.PORT

const express = require('express');
const Sequelize = require('sequelize');

const productsRoutes = require('./productsRoutes');
const buyersRoutes = require('./buyersRoutes');
const sellersRoutes = require('./sellersRoutes');

const app = express();
const router = express.Router();

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize.sync({ force: false }).then(() => {
    console.log('Models synced to the database');
  }).catch(err => {
    console.error('Unable to sync models:', err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

router.use('/products', productsRoutes);
router.use('/buyers', buyersRoutes);
router.use('/sellers', sellersRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = router;
