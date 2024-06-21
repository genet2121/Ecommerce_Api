const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    table_name_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'table_names',
        key: 'id'
      }
    },
    admin_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'admin_types',
        key: 'id'
      }
    },
    can_view: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    can_add: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    can_view_detail: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    can_update: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    can_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'roles',
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
        name: "fk_roles_table_names",
        using: "BTREE",
        fields: [
          { name: "table_name_id" },
        ]
      },
      {
        name: "fk_roles_admin_types",
        using: "BTREE",
        fields: [
          { name: "admin_type_id" },
        ]
      },
    ]
  });
};
