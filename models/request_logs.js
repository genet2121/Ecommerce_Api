const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('request_logs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    method: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ip: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    response_time: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_agent: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reqBody: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resBody: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'request_logs',
    timestamps: false,
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
