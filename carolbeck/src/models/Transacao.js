const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transacao = sequelize.define('Transacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descricao: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'transacoes',
  freezeTableName: true,
  timestamps: true,
  underscored: true
});

module.exports = Transacao;
