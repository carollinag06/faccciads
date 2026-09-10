const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('myfinance', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

// ==================== USUÁRIO ====================

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tipoUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  foto: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'Tb_Usuario',
  timestamps: false,
});


// ==================== CATEGORIA ====================

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'Tb_Categoria',
  timestamps: false,
});


// ==================== CARTÃO ====================

const Cartao = sequelize.define('Cartao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  limite: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  diaFechamento: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  diaVencimento: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'Tb_Cartao',
  timestamps: false,
});


// ==================== TRANSAÇÃO ====================

const Transacao = sequelize.define('Transacao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cartaoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  descricao: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  formaPagamento: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'Tb_Transacao',
  timestamps: false,
});


// ==================== ORÇAMENTO ====================

const Orcamento = sequelize.define('Orcamento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  periodo: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'Tb_Orcamento',
  timestamps: false,
});


// ==================== FATURA ====================

const Fatura = sequelize.define('Fatura', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cartaoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paga: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'Tb_Fatura',
  timestamps: false,
});


// ==================== RELACIONAMENTOS ====================

Usuario.hasMany(Categoria, { foreignKey: 'usuarioId' });
Categoria.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(Cartao, { foreignKey: 'usuarioId' });
Cartao.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(Transacao, { foreignKey: 'usuarioId' });
Transacao.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Categoria.hasMany(Transacao, { foreignKey: 'categoriaId' });
Transacao.belongsTo(Categoria, { foreignKey: 'categoriaId' });

Cartao.hasMany(Transacao, { foreignKey: 'cartaoId' });
Transacao.belongsTo(Cartao, { foreignKey: 'cartaoId' });

Usuario.hasMany(Orcamento, { foreignKey: 'usuarioId' });
Orcamento.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Categoria.hasMany(Orcamento, { foreignKey: 'categoriaId' });
Orcamento.belongsTo(Categoria, { foreignKey: 'categoriaId' });

Usuario.hasMany(Fatura, { foreignKey: 'usuarioId' });
Fatura.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Cartao.hasMany(Fatura, { foreignKey: 'cartaoId' });
Fatura.belongsTo(Cartao, { foreignKey: 'cartaoId' });


// ==================== CONEXÃO ====================

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida.');
  })
  .catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });


module.exports = {
  sequelize,
  Usuario,
  Categoria,
  Cartao,
  Transacao,
  Orcamento,
  Fatura
};    allowNull: true, // Permite NULL como na tabela
  },
}, {
  tableName: 'Tb_Usuario',
  timestamps: false,
});

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida.');
  })
  .catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

module.exports = { Usuario, sequelize };
