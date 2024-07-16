const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    p_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    des: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    discounted_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    price_in_dollar: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    cat_attr_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category_attributes',
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
    discount_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'discounts',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
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
        name: "fk_products_category_attributes",
        using: "BTREE",
        fields: [
          { name: "cat_attr_id" },
        ]
      },
      {
        name: "fk_products_users",
        using: "BTREE",
        fields: [
          { name: "seller_id" },
        ]
      },
      {
        name: "fk_products_discounts_idx",
        using: "BTREE",
        fields: [
          { name: "discount_id" },
        ]
      },
    ]
  });
};
