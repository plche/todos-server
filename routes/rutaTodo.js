const express = require('express');
const TodoRouter = express.Router();
const controladorTodo = require('./../controllers/controladorTodo');

TodoRouter.post('/nuevo', controladorTodo.insertarTodo);
TodoRouter.get('/getAll', controladorTodo.obtenerTodos);
TodoRouter.put('/actualizar', controladorTodo.actualizarTodo);
TodoRouter.delete('/eliminar/:id', controladorTodo.deleteTodo);

module.exports = TodoRouter;
