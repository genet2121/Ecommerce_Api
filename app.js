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
router.use('/admins', adminsRoutes);
router.use('/bank-details', bankDetailsRoutes);
router.use('/carts', cartsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/category-attributes', categoryAttributesRoutes);
router.use('/complaints', complaintsRoutes);
router.use('/discounts', discountsRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/orders', ordersRoutes);
router.use('/payment-methods', paymentMethodsRoutes);
router.use('/documents', documentsRoutes);
router.use('/products', productsRoutes);
router.use('/product-images', productImagesRoutes);
router.use('/receipts', receiptsRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/subscription-plans', subscriptionPlansRoutes);
router.use('/transactions', transactionsRoutes);
router.use('/user-addresses', userAddressesRoutes);
router.use('/users', usersRoutes);
router.use('/user-subscriptions', userSubscriptionsRoutes);
router.use('/wallet-details', walletDetailsRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});