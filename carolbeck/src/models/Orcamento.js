const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Orcamento = sequelize.define('Orcamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  mes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'orcamentos',
  freezeTableName: true,
  timestamps: true,
  underscored: true
});

module.exports = Orcamento;
