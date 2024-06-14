const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('complaints', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    topic: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    complainee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    complaint_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    complaint_images: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    status_in: {
      type: DataTypes.ENUM('pending','resolved','dismissed'),
      allowNull: true,
      defaultValue: "pending"
    }
  }, {
    sequelize,
    tableName: 'complaints',
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
        name: "fk_complaints_users",
        using: "BTREE",
        fields: [
          { name: "complainee_id" },
        ]
      },
    ]
  });
};
