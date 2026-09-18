const createCrudController = ({ model, resourceName, fields, include = [] }) => {
  const getPayload = (body) => Object.fromEntries(
    Object.entries(body || {}).filter(([key, value]) => fields.includes(key) && value !== undefined)
  );

  const handleError = (res, error, action) => {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Dados invalidos', detalhes: error.errors.map(({ message }) => message) });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Registro ja existente' });
    }

    return res.status(500).json({ error: `Erro ao ${action} ${resourceName}`, detalhes: error.message });
  };

  const listar = async (req, res) => {
    try {
      const where = {};
      if (req.query.usuarioId && fields.includes('usuarioId')) {
        where.usuarioId = req.query.usuarioId;
      }

      const registros = await model.findAll({ where, include, order: [['id', 'ASC']] });
      return res.status(200).json(registros);
    } catch (error) {
      return handleError(res, error, 'listar');
    }
  };

  const buscar = async (req, res) => {
    try {
      const registro = await model.findByPk(req.params.id, { include });
      if (!registro) {
        return res.status(404).json({ error: `${resourceName} nao encontrado` });
      }
      return res.status(200).json(registro);
    } catch (error) {
      return handleError(res, error, 'buscar');
    }
  };

  const criar = async (req, res) => {
    try {
      const payload = getPayload(req.body);
      const registro = await model.create(payload);
      return res.status(201).json(registro);
    } catch (error) {
      return handleError(res, error, 'criar');
    }
  };

  const atualizar = async (req, res) => {
    try {
      const registro = await model.findByPk(req.params.id);
      if (!registro) {
        return res.status(404).json({ error: `${resourceName} nao encontrado` });
      }

      const payload = getPayload(req.body);
      if (!Object.keys(payload).length) {
        return res.status(400).json({ error: 'Informe ao menos um campo para atualizar' });
      }

      await registro.update(payload);
      return res.status(200).json(registro);
    } catch (error) {
      return handleError(res, error, 'atualizar');
    }
  };

  const remover = async (req, res) => {
    try {
      const registro = await model.findByPk(req.params.id);
      if (!registro) {
        return res.status(404).json({ error: `${resourceName} nao encontrado` });
      }

      await registro.destroy();
      return res.status(204).send();
    } catch (error) {
      return handleError(res, error, 'remover');
    }
  };

  return { listar, buscar, criar, atualizar, remover };
};

module.exports = createCrudController;