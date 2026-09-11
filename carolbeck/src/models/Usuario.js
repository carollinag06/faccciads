const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  tipoUsuario: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'usuarios',    // Força o Sequelize a usar a tabela 'usuarios' do seu SQL
  freezeTableName: true,     // Impede que o Sequelize altere ou pluralize o nome
  timestamps: true
});

module.exports = Usuario;