const express = require('express');
const UsuarioRouter = express.Router();
const controladorUsuario = require('./../controllers/controladorUsuario');

UsuarioRouter.post('/crear', controladorUsuario.crearUsuario);
UsuarioRouter.get('/getAll', controladorUsuario.obtenerUsuarios);
UsuarioRouter.delete('/eliminar/:nombreUsuario', controladorUsuario.eliminarUsuario);

module.exports = UsuarioRouter;