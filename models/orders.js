const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    expd_delivery: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    status_in: {
      type: DataTypes.ENUM('pending','processing','shipped','delivered'),
      allowNull: true,
      defaultValue: "pending"
    },
    shipping_address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_addresses',
        key: 'id'
      }
    },
    payment_method: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_orders_buyer",
        using: "BTREE",
        fields: [
          { name: "buyer_id" },
        ]
      },
      {
        name: "fk_orders_seller",
        using: "BTREE",
        fields: [
          { name: "seller_id" },
        ]
      },
      {
        name: "fk_orders_user_addresses",
        using: "BTREE",
        fields: [
          { name: "shipping_address_id" },
        ]
      },
    ]
  });
};
