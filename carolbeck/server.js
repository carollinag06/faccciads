const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const {
  Usuario,
  Categoria,
  Cartao,
  Transacao,
  Orcamento,
  Fatura,
  sequelize
} = require('./bd');

const app = express();
const PORT = 3000;

// ==================== CONFIGURAÇÕES ====================

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload de foto
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ==================== USUÁRIOS ====================

// Login
app.post('/usuarios/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({
      where: { email, senha }
    });

    if (!usuario) {
      return res.status(401).json({
        erro: 'Email ou senha inválidos.'
      });
    }

    res.json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Listar usuários
app.get('/usuarios', async (_, res) => {
  try {
    res.json(await Usuario.findAll());
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Buscar usuário
app.get('/usuario/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Criar usuário
app.post('/usuario/inserir', upload.single('foto'), async (req, res) => {
  try {
    const { nome, email, senha, tipoUsuario } = req.body;

    const existe = await Usuario.findOne({ where: { email } });

    if (existe) {
      return res.status(400).json({
        erro: 'Email já cadastrado.'
      });
    }

    const usuario = await Usuario.create({
      nome,
      email,
      senha,
      tipoUsuario,
      foto: req.file ? req.file.filename : null
    });

    res.status(201).json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Atualizar usuário
app.put('/usuarios/atualizar/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    await usuario.update(req.body);

    res.json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Alterar senha
app.put('/usuarios/alterar-senha', async (req, res) => {
  try {
    const { id, senhaAtual, novaSenha } = req.body;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    if (usuario.senha !== senhaAtual) {
      return res.status(400).json({
        erro: 'Senha atual incorreta.'
      });
    }

    await usuario.update({ senha: novaSenha });

    res.json({ mensagem: 'Senha alterada com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Redefinir senha
app.put('/usuarios/redefinir-senha', async (req, res) => {
  try {
    const { email, novaSenha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    await usuario.update({ senha: novaSenha });

    res.json({ mensagem: 'Senha redefinida com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Deletar usuário
app.delete('/usuario/deletar/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    await usuario.destroy();

    res.json({ mensagem: 'Usuário deletado com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// ==================== CATEGORIAS ====================

app.get('/categorias/:usuarioId', async (req, res) => {
  try {
    res.json(await Categoria.findAll({
      where: { usuarioId: req.params.usuarioId }
    }));
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.get('/categoria/:id', async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Categoria não encontrada.' });
    }

    res.json(item);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.post('/categoria/inserir', async (req, res) => {
  try {
    res.status(201).json(await Categoria.create(req.body));
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.put('/categoria/atualizar/:id', async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Categoria não encontrada.' });
    }

    await item.update(req.body);
    res.json(item);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.delete('/categoria/deletar/:id', async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Categoria não encontrada.' });
    }

    await item.destroy();
    res.json({ mensagem: 'Categoria deletada com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// ==================== CARTÕES ====================

app.get('/cartoes/:usuarioId', async (req, res) => {
  try {
    res.json(await Cartao.findAll({
      where: { usuarioId: req.params.usuarioId }
    }));
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.get('/cartao/:id', async (req, res) => {
  try {
    const item = await Cartao.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Cartão não encontrado.' });
    }

    res.json(item);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.post('/cartao/inserir', async (req, res) => {
  try {
    res.status(201).json(await Cartao.create(req.body));
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.put('/cartao/atualizar/:id', async (req, res) => {
  try {
    const item = await Cartao.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Cartão não encontrado.' });
    }

    await item.update(req.body);
    res.json(item);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.delete('/cartao/deletar/:id', async (req, res) => {
  try {
    const item = await Cartao.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Cartão não encontrado.' });
    }

    await item.destroy();
    res.json({ mensagem: 'Cartão deletado com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// ==================== TRANSAÇÕES ====================

app.get('/transacoes/:usuarioId', async (req, res) => {
  try {
    res.json(await Transacao.findAll({
      where: { usuarioId: req.params.usuarioId },
      order: [['data', 'DESC']]
    }));
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.get('/transacao/:id', async (req, res) => {
  try {
    const item = await Transacao.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Transação não encontrada.' });
    }

    res.json(item);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.post('/transacao/inserir', async (req, res) => {
  try {
    res.status(201).json(await Transacao.create(req.body));
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.put('/transacao/atualizar/:id', async (req, res) => {
  try {
    const item = await Transacao.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Transação não encontrada.' });
    }

    await item.update(req.body);
    res.json(item);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.delete('/transacao/deletar/:id', async (req, res) => {
  try {
    const item = await Transacao.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Transação não encontrada.' });
    }

    await item.destroy();
    res.json({ mensagem: 'Transação deletada com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// ==================== ORÇAMENTOS ====================

app.get('/orcamentos/:usuarioId', async (req, res) => {
  try {
    res.json(await Orcamento.findAll({
      where: { usuarioId: req.params.usuarioId }
    }));
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.get('/orcamento/:id', async (req, res) => {
  try {
    const item = await Orcamento.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Orçamento não encontrado.' });
    }

    res.json(item);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.post('/orcamento/inserir', async (req, res) => {
  try {
    res.status(201).json(await Orcamento.create(req.body));
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.put('/orcamento/atualizar/:id', async (req, res) => {
  try {
    const item = await Orcamento.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Orçamento não encontrado.' });
    }

    await item.update(req.body);
    res.json(item);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.delete('/orcamento/deletar/:id', async (req, res) => {
  try {
    const item = await Orcamento.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Orçamento não encontrado.' });
    }

    await item.destroy();
    res.json({ mensagem: 'Orçamento deletado com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// ==================== FATURAS ====================

app.get('/faturas/:usuarioId', async (req, res) => {
  try {
    res.json(await Fatura.findAll({
      where: { usuarioId: req.params.usuarioId }
    }));
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.get('/fatura/:id', async (req, res) => {
  try {
    const item = await Fatura.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Fatura não encontrada.' });
    }

    res.json(item);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.post('/fatura/inserir', async (req, res) => {
  try {
    res.status(201).json(await Fatura.create(req.body));
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.put('/fatura/atualizar/:id', async (req, res) => {
  try {
    const item = await Fatura.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Fatura não encontrada.' });
    }

    await item.update(req.body);
    res.json(item);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Pagar fatura
app.put('/fatura/pagar/:id', async (req, res) => {
  try {
    const item = await Fatura.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Fatura não encontrada.' });
    }

    await item.update({ paga: true });

    res.json({
      mensagem: 'Fatura paga com sucesso.',
      fatura: item
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.delete('/fatura/deletar/:id', async (req, res) => {
  try {
    const item = await Fatura.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: 'Fatura não encontrada.' });
    }

    await item.destroy();
    res.json({ mensagem: 'Fatura deletada com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// ==================== SERVIDOR ====================

sequelize.authenticate()
  .then(() => console.log('Banco de dados conectado.'))
  .catch(erro => console.error('Erro no banco:', erro));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
