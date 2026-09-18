const { Orcamento, Usuario, Categoria } = require('../models');
const createCrudController = require('./crudController');

module.exports = createCrudController({
  model: Orcamento,
  resourceName: 'orcamento',
  fields: ['valor', 'mes', 'ano', 'usuarioId', 'categoriaId'],
  include: [
    { model: Usuario, as: 'usuario', attributes: ['id', 'nome', 'email'] },
    { model: Categoria, as: 'categoria' }
  ]
});