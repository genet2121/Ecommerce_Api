const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    admin_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    business_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    user_type: {
      type: DataTypes.ENUM('buyer','seller'),
      allowNull: false
    },
    verification_token: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    ref_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "fk_user_id_ref_user",
        using: "BTREE",
        fields: [
          { name: "ref_user" },
        ]
      },
    ]
  });
};
