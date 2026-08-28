const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Usuario, sequelize } = require('./bd'); // Apenas o modelo Usuario

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define o armazenamento dos arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ===================== ROTAS PARA USUÁRIOS =====================

// Rota de login
app.post('/usuarios/login', async (req, res) => {
  console.log('Requisição recebida:', req.body);

  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

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