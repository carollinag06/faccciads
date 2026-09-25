const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cartao = sequelize.define('Cartao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  numero: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  limite: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  vencimento: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'cartoes',
  freezeTableName: true,
  timestamps: true,
  underscored: true
});

module.exports = Cartao;
