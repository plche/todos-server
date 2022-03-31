const express = require('express');
const cors = require('cors');
require('./config/config');
const app = express();
const TodoRouter = require('./routes/rutaTodo');
const UsuarioRouter = require('./routes/rutaUsuario');

const puerto = 8080;

app.use(cors());
app.use(express.json());
app.use('/api/todo', TodoRouter);
app.use('/api/usuario', UsuarioRouter);

/*
app.get('/api/todo/buscar', (request, response) => {
    // const id = request.query.id;
    const {id} = request.query;
    const todoEncontrado = todos.find(todo => todo.id === Number(id));
    if (todoEncontrado) return response.status(200).json(todoEncontrado);
    else {
        response.statusMessage = `Todo con id: ${id} no encontrado.`;
        return response.status(404).end();
    }
});

app.get('/api/todo/buscar/:id', (request, response) => {
    // const id = request.params.id;
    const {id} = request.params;
    const todoEncontrado = todos.find(todo => todo.id === Number(id));
    if (todoEncontrado) return response.status(200).json(todoEncontrado);
    else {
        response.statusMessage = `Todo con 'id': ${id} no encontrado.`;
        return response.status(404).end();
    }
});
*/

app.listen(puerto, () => console.info(`El servidor se encuentra ejecutándose en el puerto: ${puerto}`));
