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
const port = 3000;

// ===================== CONFIGURAÇÕES =====================

app.use(cors());
app.use(express.json());

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

// ===================== UPLOAD DE FOTO =====================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


// =========================================================
// ===================== USUÁRIOS ==========================
// =========================================================

// LOGIN
app.post('/usuarios/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      error: 'Email e senha são obrigatórios.'
    });
  }

  try {
    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuário não encontrado.'
      });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({
        error: 'Senha incorreta.'
      });
    }

    let fotoUrl = null;

    if (usuario.foto) {
      const nomeArquivo = path.basename(usuario.foto);

      fotoUrl = `http://192.168.15.9:${port}/uploads/${nomeArquivo}`;
    }

    res.json({
      message: 'Login realizado com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario,
        foto: fotoUrl
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao realizar login.'
    });
  }
});


// LISTAR USUÁRIOS
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();

    res.json(usuarios);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar usuários.'
    });
  }
});


// BUSCAR USUÁRIO POR ID
app.get('/usuario/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuário não encontrado.'
      });
    }

    res.json(usuario);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar usuário.'
    });
  }
});


// CADASTRAR USUÁRIO
app.post('/usuario/inserir', upload.single('foto'), async (req, res) => {
  try {
    const { nome, email, senha, tipoUsuario } = req.body;

    if (!nome || !email || !senha || tipoUsuario === undefined) {
      return res.status(400).json({
        error: 'Nome, email, senha e tipo de usuário são obrigatórios.'
      });
    }

    const usuarioExistente = await Usuario.findOne({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({
        error: 'Email já cadastrado.'
      });
    }

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha,
      tipoUsuario: parseInt(tipoUsuario, 10),
      foto: req.file ? req.file.path : null
    });

    res.status(201).json(novoUsuario);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao inserir usuário.'
    });
  }
});


// ATUALIZAR USUÁRIO
app.put('/usuarios/atualizar/:id', async (req, res) => {
  try {
    const { nome, email, senha, tipoUsuario } = req.body;

    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuário não encontrado.'
      });
    }

    if (nome !== undefined) usuario.nome = nome;
    if (email !== undefined) usuario.email = email;
    if (senha !== undefined) usuario.senha = senha;

    if (tipoUsuario !== undefined) {
      usuario.tipoUsuario = parseInt(tipoUsuario, 10);
    }

    await usuario.save();

    res.json({
      message: 'Usuário atualizado com sucesso!',
      usuario
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao atualizar usuário.'
    });
  }
});


// ALTERAR SENHA
app.put('/usuarios/alterar-senha', async (req, res) => {
  try {
    const { email, senhaAtual, novaSenha } = req.body;

    if (!email || !senhaAtual || !novaSenha) {
      return res.status(400).json({
        error: 'Email, senha atual e nova senha são obrigatórios.'
      });
    }

    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuário não encontrado.'
      });
    }

    if (usuario.senha !== senhaAtual) {
      return res.status(401).json({
        error: 'Senha atual incorreta.'
      });
    }

    usuario.senha = novaSenha;

    await usuario.save();

    res.json({
      message: 'Senha alterada com sucesso!'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao alterar senha.'
    });
  }
});


// REDEFINIR SENHA
app.put('/usuarios/redefinir-senha', async (req, res) => {
  try {
    const {
      email,
      novaSenha,
      confirmarSenha
    } = req.body;

    if (!email || !novaSenha || !confirmarSenha) {
      return res.status(400).json({
        error: 'Email, nova senha e confirmação são obrigatórios.'
      });
    }

    if (novaSenha !== confirmarSenha) {
      return res.status(400).json({
        error: 'As senhas não coincidem.'
      });
    }

    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuário não encontrado.'
      });
    }

    usuario.senha = novaSenha;

    await usuario.save();

    res.json({
      message: 'Senha redefinida com sucesso!'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao redefinir senha.'
    });
  }
});


// DELETAR USUÁRIO
app.delete('/usuario/deletar/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuário não encontrado.'
      });
    }

    await usuario.destroy();

    res.json({
      message: 'Usuário deletado com sucesso.'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao deletar usuário.'
    });
  }
});


// =========================================================
// ===================== CATEGORIAS ========================
// =========================================================

// LISTAR CATEGORIAS DO USUÁRIO
app.get('/categorias/:usuarioId', async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      where: {
        usuarioId: req.params.usuarioId
      }
    });

    res.json(categorias);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar categorias.'
    });
  }
});


// BUSCAR CATEGORIA
app.get('/categoria/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        error: 'Categoria não encontrada.'
      });
    }

    res.json(categoria);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar categoria.'
    });
  }
});


// CRIAR CATEGORIA
app.post('/categoria/inserir', async (req, res) => {
  try {
    const {
      usuarioId,
      nome,
      tipo
    } = req.body;

    if (!usuarioId || !nome || !tipo) {
      return res.status(400).json({
        error: 'Usuário, nome e tipo são obrigatórios.'
      });
    }

    const categoria = await Categoria.create({
      usuarioId,
      nome,
      tipo
    });

    res.status(201).json(categoria);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao inserir categoria.'
    });
  }
});


// ATUALIZAR CATEGORIA
app.put('/categoria/atualizar/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        error: 'Categoria não encontrada.'
      });
    }

    const { nome, tipo } = req.body;

    if (nome !== undefined) categoria.nome = nome;
    if (tipo !== undefined) categoria.tipo = tipo;

    await categoria.save();

    res.json({
      message: 'Categoria atualizada com sucesso!',
      categoria
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao atualizar categoria.'
    });
  }
});


// DELETAR CATEGORIA
app.delete('/categoria/deletar/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        error: 'Categoria não encontrada.'
      });
    }

    await categoria.destroy();

    res.json({
      message: 'Categoria deletada com sucesso.'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao deletar categoria.'
    });
  }
});


// =========================================================
// ===================== CARTÕES ===========================
// =========================================================

// LISTAR CARTÕES DO USUÁRIO
app.get('/cartoes/:usuarioId', async (req, res) => {
  try {
    const cartoes = await Cartao.findAll({
      where: {
        usuarioId: req.params.usuarioId
      }
    });

    res.json(cartoes);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar cartões.'
    });
  }
});


// BUSCAR CARTÃO
app.get('/cartao/:id', async (req, res) => {
  try {
    const cartao = await Cartao.findByPk(req.params.id);

    if (!cartao) {
      return res.status(404).json({
        error: 'Cartão não encontrado.'
      });
    }

    res.json(cartao);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar cartão.'
    });
  }
});


// CRIAR CARTÃO
app.post('/cartao/inserir', async (req, res) => {
  try {
    const {
      usuarioId,
      nome,
      limite,
      diaFechamento,
      diaVencimento
    } = req.body;

    if (!usuarioId || !nome) {
      return res.status(400).json({
        error: 'Usuário e nome do cartão são obrigatórios.'
      });
    }

    const cartao = await Cartao.create({
      usuarioId,
      nome,
      limite: limite || 0,
      diaFechamento,
      diaVencimento
    });

    res.status(201).json(cartao);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao inserir cartão.'
    });
  }
});


// ATUALIZAR CARTÃO
app.put('/cartao/atualizar/:id', async (req, res) => {
  try {
    const cartao = await Cartao.findByPk(req.params.id);

    if (!cartao) {
      return res.status(404).json({
        error: 'Cartão não encontrado.'
      });
    }

    const {
      nome,
      limite,
      diaFechamento,
      diaVencimento
    } = req.body;

    if (nome !== undefined) cartao.nome = nome;
    if (limite !== undefined) cartao.limite = limite;
    if (diaFechamento !== undefined) {
      cartao.diaFechamento = diaFechamento;
    }

    if (diaVencimento !== undefined) {
      cartao.diaVencimento = diaVencimento;
    }

    await cartao.save();

    res.json({
      message: 'Cartão atualizado com sucesso!',
      cartao
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao atualizar cartão.'
    });
  }
});


// DELETAR CARTÃO
app.delete('/cartao/deletar/:id', async (req, res) => {
  try {
    const cartao = await Cartao.findByPk(req.params.id);

    if (!cartao) {
      return res.status(404).json({
        error: 'Cartão não encontrado.'
      });
    }

    await cartao.destroy();

    res.json({
      message: 'Cartão deletado com sucesso.'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao deletar cartão.'
    });
  }
});


// =========================================================
// ===================== TRANSAÇÕES ========================
// =========================================================

// LISTAR TRANSAÇÕES DO USUÁRIO
app.get('/transacoes/:usuarioId', async (req, res) => {
  try {
    const transacoes = await Transacao.findAll({
      where: {
        usuarioId: req.params.usuarioId
      },
      order: [['data', 'DESC']]
    });

    res.json(transacoes);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar transações.'
    });
  }
});


// BUSCAR TRANSAÇÃO
app.get('/transacao/:id', async (req, res) => {
  try {
    const transacao = await Transacao.findByPk(req.params.id);

    if (!transacao) {
      return res.status(404).json({
        error: 'Transação não encontrada.'
      });
    }

    res.json(transacao);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar transação.'
    });
  }
});


// CRIAR TRANSAÇÃO
app.post('/transacao/inserir', async (req, res) => {
  try {
    const {
      usuarioId,
      categoriaId,
      cartaoId,
      descricao,
      valor,
      tipo,
      data,
      formaPagamento
    } = req.body;

    if (
      !usuarioId ||
      !descricao ||
      valor === undefined ||
      !tipo ||
      !data ||
      !formaPagamento
    ) {
      return res.status(400).json({
        error: 'Preencha todos os campos obrigatórios.'
      });
    }

    const transacao = await Transacao.create({
      usuarioId,
      categoriaId: categoriaId || null,
      cartaoId: cartaoId || null,
      descricao,
      valor,
      tipo,
      data,
      formaPagamento
    });

    res.status(201).json(transacao);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao inserir transação.'
    });
  }
});


// ATUALIZAR TRANSAÇÃO
app.put('/transacao/atualizar/:id', async (req, res) => {
  try {
    const transacao = await Transacao.findByPk(req.params.id);

    if (!transacao) {
      return res.status(404).json({
        error: 'Transação não encontrada.'
      });
    }

    const {
      categoriaId,
      cartaoId,
      descricao,
      valor,
      tipo,
      data,
      formaPagamento
    } = req.body;

    if (categoriaId !== undefined) {
      transacao.categoriaId = categoriaId;
    }

    if (cartaoId !== undefined) {
      transacao.cartaoId = cartaoId;
    }

    if (descricao !== undefined) transacao.descricao = descricao;
    if (valor !== undefined) transacao.valor = valor;
    if (tipo !== undefined) transacao.tipo = tipo;
    if (data !== undefined) transacao.data = data;

    if (formaPagamento !== undefined) {
      transacao.formaPagamento = formaPagamento;
    }

    await transacao.save();

    res.json({
      message: 'Transação atualizada com sucesso!',
      transacao
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao atualizar transação.'
    });
  }
});


// DELETAR TRANSAÇÃO
app.delete('/transacao/deletar/:id', async (req, res) => {
  try {
    const transacao = await Transacao.findByPk(req.params.id);

    if (!transacao) {
      return res.status(404).json({
        error: 'Transação não encontrada.'
      });
    }

    await transacao.destroy();

    res.json({
      message: 'Transação deletada com sucesso.'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao deletar transação.'
    });
  }
});


// =========================================================
// ===================== ORÇAMENTOS ========================
// =========================================================

// LISTAR ORÇAMENTOS
app.get('/orcamentos/:usuarioId', async (req, res) => {
  try {
    const orcamentos = await Orcamento.findAll({
      where: {
        usuarioId: req.params.usuarioId
      }
    });

    res.json(orcamentos);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar orçamentos.'
    });
  }
});


// BUSCAR ORÇAMENTO
app.get('/orcamento/:id', async (req, res) => {
  try {
    const orcamento = await Orcamento.findByPk(req.params.id);

    if (!orcamento) {
      return res.status(404).json({
        error: 'Orçamento não encontrado.'
      });
    }

    res.json(orcamento);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar orçamento.'
    });
  }
});


// CRIAR ORÇAMENTO
app.post('/orcamento/inserir', async (req, res) => {
  try {
    const {
      usuarioId,
      categoriaId,
      valor,
      periodo
    } = req.body;

    if (!usuarioId || valor === undefined || !periodo) {
      return res.status(400).json({
        error: 'Usuário, valor e período são obrigatórios.'
      });
    }

    const orcamento = await Orcamento.create({
      usuarioId,
      categoriaId: categoriaId || null,
      valor,
      periodo
    });

    res.status(201).json(orcamento);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao inserir orçamento.'
    });
  }
});


// ATUALIZAR ORÇAMENTO
app.put('/orcamento/atualizar/:id', async (req, res) => {
  try {
    const orcamento = await Orcamento.findByPk(req.params.id);

    if (!orcamento) {
      return res.status(404).json({
        error: 'Orçamento não encontrado.'
      });
    }

    const {
      categoriaId,
      valor,
      periodo
    } = req.body;

    if (categoriaId !== undefined) {
      orcamento.categoriaId = categoriaId;
    }

    if (valor !== undefined) orcamento.valor = valor;
    if (periodo !== undefined) orcamento.periodo = periodo;

    await orcamento.save();

    res.json({
      message: 'Orçamento atualizado com sucesso!',
      orcamento
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao atualizar orçamento.'
    });
  }
});


// DELETAR ORÇAMENTO
app.delete('/orcamento/deletar/:id', async (req, res) => {
  try {
    const orcamento = await Orcamento.findByPk(req.params.id);

    if (!orcamento) {
      return res.status(404).json({
        error: 'Orçamento não encontrado.'
      });
    }

    await orcamento.destroy();

    res.json({
      message: 'Orçamento deletado com sucesso.'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao deletar orçamento.'
    });
  }
});


// =========================================================
// ======================= FATURAS =========================
// =========================================================

// LISTAR FATURAS DO USUÁRIO
app.get('/faturas/:usuarioId', async (req, res) => {
  try {
    const faturas = await Fatura.findAll({
      where: {
        usuarioId: req.params.usuarioId
      },
      order: [
        ['ano', 'DESC'],
        ['mes', 'DESC']
      ]
    });

    res.json(faturas);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar faturas.'
    });
  }
});


// BUSCAR FATURA
app.get('/fatura/:id', async (req, res) => {
  try {
    const fatura = await Fatura.findByPk(req.params.id);

    if (!fatura) {
      return res.status(404).json({
        error: 'Fatura não encontrada.'
      });
    }

    res.json(fatura);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar fatura.'
    });
  }
});


// CRIAR FATURA
app.post('/fatura/inserir', async (req, res) => {
  try {
    const {
      usuarioId,
      cartaoId,
      mes,
      ano,
      paga
    } = req.body;

    if (!usuarioId || !cartaoId || !mes || !ano) {
      return res.status(400).json({
        error: 'Usuário, cartão, mês e ano são obrigatórios.'
      });
    }

    const fatura = await Fatura.create({
      usuarioId,
      cartaoId,
      mes,
      ano,
      paga: paga || false
    });

    res.status(201).json(fatura);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao inserir fatura.'
    });
  }
});


// ATUALIZAR FATURA
app.put('/fatura/atualizar/:id', async (req, res) => {
  try {
    const fatura = await Fatura.findByPk(req.params.id);

    if (!fatura) {
      return res.status(404).json({
        error: 'Fatura não encontrada.'
      });
    }

    const {
      mes,
      ano,
      paga
    } = req.body;

    if (mes !== undefined) fatura.mes = mes;
    if (ano !== undefined) fatura.ano = ano;
    if (paga !== undefined) fatura.paga = paga;

    await fatura.save();

    res.json({
      message: 'Fatura atualizada com sucesso!',
      fatura
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao atualizar fatura.'
    });
  }
});


// MARCAR FATURA COMO PAGA
app.put('/fatura/pagar/:id', async (req, res) => {
  try {
    const fatura = await Fatura.findByPk(req.params.id);

    if (!fatura) {
      return res.status(404).json({
        error: 'Fatura não encontrada.'
      });
    }

    fatura.paga = true;

    await fatura.save();

    res.json({
      message: 'Fatura marcada como paga!',
      fatura
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao pagar fatura.'
    });
  }
});


// DELETAR FATURA
app.delete('/fatura/deletar/:id', async (req, res) => {
  try {
    const fatura = await Fatura.findByPk(req.params.id);

    if (!fatura) {
      return res.status(404).json({
        error: 'Fatura não encontrada.'
      });
    }

    await fatura.destroy();

    res.json({
      message: 'Fatura deletada com sucesso.'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao deletar fatura.'
    });
  }
});


// =========================================================
// ===================== CONEXÃO ============================
// =========================================================

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida.');
  })
  .catch(error => {
    console.error(
      'Erro ao conectar ao banco de dados:',
      error
    );
  });


// =========================================================
// ===================== SERVIDOR ===========================
// =========================================================

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

[/code]


Esse arquivo já contempla as rotas para as **6 tabelas** e mantém a sua estrutura de login/cadastro.

**Importante:** no seu `bd.js`, os nomes dos campos precisam ser exatamente `usuarioId`, `categoriaId`, `cartaoId`, `formaPagamento`, etc., como no código acima. Se você usar o `bd.js` que montamos anteriormente, está compatível.

Se você for colocar isso no GitHub pelo celular, basta abrir o arquivo atual, selecionar tudo, apagar e **colar esse código inteiro**, depois fazer o commit.
  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    // Adaptar o caminho da foto para URL pública
    let fotoUrl = null;
    if (usuario.foto) {
      const nomeArquivo = path.basename(usuario.foto);
      fotoUrl = `http://192.168.15.9:3000/uploads/${nomeArquivo}`;
    }

    res.json({
      message: 'Login realizado com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario,
        foto: fotoUrl
      },
    });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao tentar realizar o login.' });
  }
});

// Rota para obter todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

// Rota para obter um usuário por ID
app.get('/usuario/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
});

// Rota para criar um novo usuário
app.post('/usuario/inserir', upload.single('foto'), async (req, res) => {
  try {
    // Verifica se o arquivo foi enviado
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' });
    }

    // Cria o novo usuário com os dados recebidos e o caminho da imagem
    const novoUsuario = await Usuario.create({
      nome: req.body.nome,
      senha: req.body.senha,
      email: req.body.email,
      tipoUsuario: parseInt(req.body.tipoUsuario, 10), // Converte para inteiro
      foto: req.file.path
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    res.status(500).json({ error: 'Erro ao inserir usuário.' });
  }
});

// Rota para atualizar usuário
app.put('/usuarios/atualizar/:id', async (req, res) => {
  console.log('Requisição recebida para atualizar dados do usuário:', req.body);

  const { nome, email, senha, tipoUsuario } = req.body;
  const { id } = req.params;

  if (!nome || !email || !senha || typeof tipoUsuario === 'undefined') {
    return res.status(400).json({ error: 'Nome, email, senha e tipo de usuário são obrigatórios.' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    usuario.nome = nome.trim();
    usuario.email = email.trim();
    usuario.senha = senha.trim();
    usuario.tipoUsuario = parseInt(tipoUsuario, 10);

    await usuario.save();

    res.json({
      message: 'Dados do usuário atualizados com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario,
      },
    });

  } catch (error) {
    console.error('Erro ao atualizar os dados do usuário:', error);
    res.status(500).json({ error: 'Erro ao tentar atualizar os dados do usuário.' });
  }
});

// Rota para alterar senha do usuário
app.put('/usuarios/alterar-senha', async (req, res) => {
  console.log('Requisição recebida para alterar senha:', req.body);

  const { email, senhaAtual, novaSenha } = req.body;

  if (!email || !senhaAtual || !novaSenha) {
    return res.status(400).json({ error: 'Email, senha atual e nova senha são obrigatórios.' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    console.log("usuario.senha (armazenada):", usuario.senha, "| Tipo:", typeof usuario.senha);
    console.log("senhaAtual (informada):", senhaAtual, "| Tipo:", typeof senhaAtual);

    if (usuario.senha.trim() !== senhaAtual.trim()) {
      return res.status(401).json({ error: 'Senha atual incorreta.' });
    }

    usuario.senha = novaSenha.trim();
    await usuario.save();

    res.json({
      message: 'Senha alterada com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });

  } catch (error) {
    console.error('Erro ao alterar a senha:', error);
    res.status(500).json({ error: 'Erro ao tentar alterar a senha.' });
  }
});

// Rota para redefinir senha do usuário
app.put('/usuarios/redefinir-senha', async (req, res) => {
  console.log('Requisição recebida para redefinir senha:', req.body);
  const { email, novaSenha, confirmarSenha } = req.body;

  if (!email || !novaSenha || !confirmarSenha) {
    return res.status(400).json({ error: 'Email, nova senha e confirmação são obrigatórios.' });
  }

  if (novaSenha.trim() !== confirmarSenha.trim()) {
    return res.status(400).json({ error: 'As senhas não coincidem.' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    usuario.senha = novaSenha.trim();
    await usuario.save();

    res.json({
      message: 'Senha redefinida com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error('Erro ao redefinir a senha:', error);
    res.status(500).json({ error: 'Erro ao tentar redefinir a senha.' });
  }
});

// Rota para deletar um usuário
app.delete('/usuario/deletar/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      await usuario.destroy();
      res.json({ message: 'Usuário deletado com sucesso.' });
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
