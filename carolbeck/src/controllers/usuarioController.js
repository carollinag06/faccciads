const Usuario = require('../models/Usuario');
const { gerarHash } = require('../hash');

const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, tipoUsuario } = req.body;
    const foto = req.file ? req.file.filename : null;

    const senhaComHash = await gerarHash(senha);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaComHash,
      tipoUsuario,
      foto
    });

    const { senha: _, ...usuarioSemSenha } = novoUsuario.toJSON();
    return res.status(201).json(usuarioSemSenha);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar usuário', detalhes: error.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['senha'] }
    });
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar usuários', detalhes: error.message });
  }
};

const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['senha'] }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar usuário', detalhes: error.message });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, tipoUsuario } = req.body;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const foto = req.file ? req.file.filename : usuario.foto;

    await usuario.update({ nome, email, tipoUsuario, foto });

    return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar usuário', detalhes: error.message });
  }
};

const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await usuario.destroy();
    return res.status(200).json({ mensagem: 'Usuário removido com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar usuário', detalhes: error.message });
  }
};

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario
};