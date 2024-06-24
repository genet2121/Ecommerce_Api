var DataTypes = require("sequelize").DataTypes;
var _admin_types = require("./admin_types");
var _admins = require("./admins");
var _bank_details = require("./bank_details");
var _carts = require("./carts");
var _categories = require("./categories");
var _category_attributes = require("./category_attributes");
var _complaints = require("./complaints");
var _discounts = require("./discounts");
var _documents = require("./documents");
var _inventories = require("./inventories");
var _orders = require("./orders");
var _payment_methods = require("./payment_methods");
var _product_attributes = require("./product_attributes");
var _product_images = require("./product_images");
var _products = require("./products");
var _receipts = require("./receipts");
var _request_logs = require("./request_logs");
var _reviews = require("./reviews");
var _roles = require("./roles");
var _subscription_plans = require("./subscription_plans");
var _table_names = require("./table_names");
var _transactions = require("./transactions");
var _user_addresses = require("./user_addresses");
var _user_subscriptions = require("./user_subscriptions");
var _users = require("./users");
var _wallet_details = require("./wallet_details");

function initModels(sequelize) {
  var admin_types = _admin_types(sequelize, DataTypes);
  var admins = _admins(sequelize, DataTypes);
  var bank_details = _bank_details(sequelize, DataTypes);
  var carts = _carts(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var category_attributes = _category_attributes(sequelize, DataTypes);
  var complaints = _complaints(sequelize, DataTypes);
  var discounts = _discounts(sequelize, DataTypes);
  var documents = _documents(sequelize, DataTypes);
  var inventories = _inventories(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payment_methods = _payment_methods(sequelize, DataTypes);
  var product_attributes = _product_attributes(sequelize, DataTypes);
  var product_images = _product_images(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var receipts = _receipts(sequelize, DataTypes);
  var request_logs = _request_logs(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var subscription_plans = _subscription_plans(sequelize, DataTypes);
  var table_names = _table_names(sequelize, DataTypes);
  var transactions = _transactions(sequelize, DataTypes);
  var user_addresses = _user_addresses(sequelize, DataTypes);
  var user_subscriptions = _user_subscriptions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var wallet_details = _wallet_details(sequelize, DataTypes);

  admins.belongsTo(admin_types, { as: "admin_type", foreignKey: "admin_type_id"});
  admin_types.hasMany(admins, { as: "admins", foreignKey: "admin_type_id"});
  roles.belongsTo(admin_types, { as: "admin_type", foreignKey: "admin_type_id"});
  admin_types.hasMany(roles, { as: "roles", foreignKey: "admin_type_id"});
  categories.belongsTo(categories, { as: "parent", foreignKey: "parent_id"});
  categories.hasMany(categories, { as: "categories", foreignKey: "parent_id"});
  category_attributes.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(category_attributes, { as: "category_attributes", foreignKey: "category_id"});
  product_attributes.belongsTo(category_attributes, { as: "category_attribute", foreignKey: "category_attribute_id"});
  category_attributes.hasMany(product_attributes, { as: "product_attributes", foreignKey: "category_attribute_id"});
  products.belongsTo(category_attributes, { as: "cat_attr", foreignKey: "cat_attr_id"});
  category_attributes.hasMany(products, { as: "products", foreignKey: "cat_attr_id"});
  bank_details.belongsTo(payment_methods, { as: "payment_method", foreignKey: "payment_method_id"});
  payment_methods.hasMany(bank_details, { as: "bank_details", foreignKey: "payment_method_id"});
  transactions.belongsTo(payment_methods, { as: "payment_method", foreignKey: "payment_method_id"});
  payment_methods.hasMany(transactions, { as: "transactions", foreignKey: "payment_method_id"});
  wallet_details.belongsTo(payment_methods, { as: "payment_method", foreignKey: "payment_method_id"});
  payment_methods.hasMany(wallet_details, { as: "wallet_details", foreignKey: "payment_method_id"});
  carts.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(carts, { as: "carts", foreignKey: "product_id"});
  discounts.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(discounts, { as: "discounts", foreignKey: "product_id"});
  inventories.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(inventories, { as: "inventories", foreignKey: "product_id"});
  product_attributes.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_attributes, { as: "product_attributes", foreignKey: "product_id"});
  product_images.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_images, { as: "product_images", foreignKey: "product_id"});
  reviews.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(reviews, { as: "reviews", foreignKey: "product_id"});
  transactions.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(transactions, { as: "transactions", foreignKey: "product_id"});
  user_subscriptions.belongsTo(subscription_plans, { as: "subscription_plan", foreignKey: "subscription_plan_id"});
  subscription_plans.hasMany(user_subscriptions, { as: "user_subscriptions", foreignKey: "subscription_plan_id"});
  roles.belongsTo(table_names, { as: "table_name", foreignKey: "table_name_id"});
  table_names.hasMany(roles, { as: "roles", foreignKey: "table_name_id"});
  receipts.belongsTo(transactions, { as: "transaction", foreignKey: "transaction_id"});
  transactions.hasMany(receipts, { as: "receipts", foreignKey: "transaction_id"});
  orders.belongsTo(user_addresses, { as: "shipping_address", foreignKey: "shipping_address_id"});
  user_addresses.hasMany(orders, { as: "orders", foreignKey: "shipping_address_id"});
  carts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(carts, { as: "carts", foreignKey: "user_id"});
  complaints.belongsTo(users, { as: "complainee", foreignKey: "complainee_id"});
  users.hasMany(complaints, { as: "complaints", foreignKey: "complainee_id"});
  discounts.belongsTo(users, { as: "seller", foreignKey: "seller_id"});
  users.hasMany(discounts, { as: "discounts", foreignKey: "seller_id"});
  documents.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(documents, { as: "documents", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "buyer", foreignKey: "buyer_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "buyer_id"});
  orders.belongsTo(users, { as: "seller", foreignKey: "seller_id"});
  users.hasMany(orders, { as: "seller_orders", foreignKey: "seller_id"});
  products.belongsTo(users, { as: "seller", foreignKey: "seller_id"});
  users.hasMany(products, { as: "products", foreignKey: "seller_id"});
  receipts.belongsTo(users, { as: "buyer", foreignKey: "buyer_id"});
  users.hasMany(receipts, { as: "receipts", foreignKey: "buyer_id"});
  receipts.belongsTo(users, { as: "seller", foreignKey: "seller_id"});
  users.hasMany(receipts, { as: "seller_receipts", foreignKey: "seller_id"});
  reviews.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "user_id"});
  transactions.belongsTo(users, { as: "buyer", foreignKey: "buyer_id"});
  users.hasMany(transactions, { as: "transactions", foreignKey: "buyer_id"});
  transactions.belongsTo(users, { as: "seller", foreignKey: "seller_id"});
  users.hasMany(transactions, { as: "seller_transactions", foreignKey: "seller_id"});
  user_addresses.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_addresses, { as: "user_addresses", foreignKey: "user_id"});
  user_subscriptions.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_subscriptions, { as: "user_subscriptions", foreignKey: "user_id"});
  users.belongsTo(users, { as: "ref_user_user", foreignKey: "ref_user"});
  users.hasMany(users, { as: "users", foreignKey: "ref_user"});

  return {
    admin_types,
    admins,
    bank_details,
    carts,
    categories,
    category_attributes,
    complaints,
    discounts,
    documents,
    inventories,
    orders,
    payment_methods,
    product_attributes,
    product_images,
    products,
    receipts,
    request_logs,
    reviews,
    roles,
    subscription_plans,
    table_names,
    transactions,
    user_addresses,
    user_subscriptions,
    users,
    wallet_details,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
