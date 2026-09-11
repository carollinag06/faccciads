const { Router } = require('express');
const upload = require('../config/multer');
const {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario
} = require('../controllers/usuarioController');

const router = Router();

router.post('/', upload.single('foto'), criarUsuario);
router.get('/', listarUsuarios);
router.get('/:id', buscarUsuarioPorId);
router.put('/:id', upload.single('foto'), atualizarUsuario);
router.delete('/:id', deletarUsuario);

module.exports = router;