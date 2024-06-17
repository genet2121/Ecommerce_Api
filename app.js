const express = require('express');
require('dotenv').config(); 

const adminsRoutes = require('./routes/adminsRoutes');
const bankDetailsRoutes = require('./routes/bankDetailsRoutes');
const cartsRoutes = require('./routes/cartsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const categoryAttributesRoutes = require('./routes/categoryAttributesRoutes');
const complaintsRoutes = require('./routes/complaintsRoutes');
const discountsRoutes = require('./routes/discountsRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const paymentMethodsRoutes = require('./routes/paymentMethodsRoutes');
const documentsRoutes = require('./routes/documentsRoutes');
const productsRoutes = require('./routes/productsRoutes');
const productImagesRoutes = require('./routes/productImagesRoutes');
const receiptsRoutes = require('./routes/receiptsRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const subscriptionPlansRoutes = require('./routes/subscriptionPlansRoutes');
const transactionsRoutes = require('./routes/transactionsRoutes');
const userAddressesRoutes = require('./routes/userAddressesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const userSubscriptionsRoutes = require('./routes/userSubscriptionsRoutes');
const walletDetailsRoutes = require('./routes/walletDetailsRoutes');

const app = express();
const router = express.Router();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

// Use router.use to include all route handlers
app.use('/admins', adminsRoutes);
app.use('/bank-details', bankDetailsRoutes);
app.use('/carts', cartsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/category-attributes', categoryAttributesRoutes);
app.use('/complaints', complaintsRoutes);
app.use('/discounts', discountsRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/orders', ordersRoutes);
app.use('/payment-methods', paymentMethodsRoutes);
app.use('/documents', documentsRoutes);
app.use('/products', productsRoutes);
app.use('/product-images', productImagesRoutes);
app.use('/receipts', receiptsRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/subscription-plans', subscriptionPlansRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/user-addresses', userAddressesRoutes);
app.use('/users', usersRoutes);
app.use('/user-subscriptions', userSubscriptionsRoutes);
app.use('/wallet-details', walletDetailsRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});