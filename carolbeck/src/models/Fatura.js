const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fatura = sequelize.define('Fatura', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  vencimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  paga: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'faturas',
  freezeTableName: true,
  timestamps: true
});

module.exports = Fatura;
