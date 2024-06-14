const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment_methods', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    method_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    payment_type: {
      type: DataTypes.ENUM('bank','wallet','other'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payment_methods',
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
    ]
  });
};
