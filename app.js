const adminTypesRoutes = require('./routes/adminTypesRoutes');
const adminsRoutes = require('./routes/adminsRoutes');
const bankDetailsRoutes = require('./routes/bankDetailsRoutes');
const cartsRoutes = require('./routes/cartsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const categoryAttributesRoutes = require('./routes/categoryAttributesRoutes');
const complaintsRoutes = require('./routes/complaintsRoutes');
const discountsRoutes = require('./routes/discountsRoutes');
const inventoriesRoutes = require('./routes/inventoriesRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const productAttributesRoutes = require('./routes/productAttributesRoutes');
const paymentMethodsRoutes = require('./routes/paymentMethodsRoutes');
const documentsRoutes = require('./routes/documentsRoutes');
const productsRoutes = require('./routes/productsRoutes');
const productImagesRoutes = require('./routes/productImagesRoutes');
const receiptsRoutes = require('./routes/receiptsRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const subscriptionPlansRoutes = require('./routes/subscriptionPlansRoutes');
const tableNamesRoutes = require('./routes/tableNamesRoutes');
const transactionsRoutes = require('./routes/transactionsRoutes');
const userAddressesRoutes = require('./routes/userAddressesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const userSubscriptionsRoutes = require('./routes/userSubscriptionsRoutes');
const walletDetailsRoutes = require('./routes/walletDetailsRoutes');

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const ProjectDependencies = require("./configration/dependance");
const dependencies = new ProjectDependencies();
const {port} = dependencies.getDependencies()
const authRouter = require("./routes/authRoute");
const adminAuthRouter = require("./routes/adminAuthRoute");

const app = express();
const morgan = require('morgan');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream })); 

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

// Use router.use to include all route handlers
app.use('/admin-types', adminTypesRoutes);
app.use('/admins', adminsRoutes);
app.use('/bank-details', bankDetailsRoutes);
app.use('/carts', cartsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/category-attributes', categoryAttributesRoutes);
app.use('/complaints', complaintsRoutes);
app.use('/discounts', discountsRoutes);
app.use('/inventory', inventoriesRoutes);
app.use('/orders', ordersRoutes);
app.use('/product-attributes', productAttributesRoutes);
app.use('/payment-methods', paymentMethodsRoutes);
app.use('/documents', documentsRoutes);
app.use('/products', productsRoutes);
app.use('/product-images', productImagesRoutes);
app.use('/receipts', receiptsRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/roles', rolesRoutes);
app.use('/subscription-plans', subscriptionPlansRoutes);
app.use('/table-name', tableNamesRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/user-addresses', userAddressesRoutes);
app.use('/users', usersRoutes);
app.use('/user-subscriptions', userSubscriptionsRoutes);
app.use('/wallet-details', walletDetailsRoutes);

app.use('/auth', authRouter(dependencies.getDependencies()))
app.use('/auth/admin', adminAuthRouter(dependencies.getDependencies()))

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});