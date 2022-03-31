const {Todo} = require('./../models/modeloTodo');
const Usuario = require('./../models/modeloUsuario');

const insertarTodo = (request, response) => {
    const {nombre, id, status, nombreUsuario} = request.body;

    if (!nombre || !id || !status || !nombreUsuario) {
        response.statusMessage = "Para crear un nuevo ToDo es necesario enviar 'nombre', 'status', 'id' y 'nombreUsuario'.";
        return response.status(406).end();
    } else {
        Usuario.find({nombreUsuario})
            .then(usuarioEncontrado => {
                if (usuarioEncontrado.length === 0) {
                    response.statusMessage = `Usuario con 'nombreUsuario': ${nombreUsuario} no encontrado.`;
                    return response.status(404).end();
                } else {
                    const nuevoTodo = {nombre, status, id};
                    Todo.create(nuevoTodo)
                        .then(insertadoTodo => {
                            Usuario.findOneAndUpdate({nombreUsuario}, {$push: {todos: insertadoTodo._id}})
                                .then(() => response.status(201).json(insertadoTodo))
                                .catch(err => {
                                    response.statusMessage = `Hubo un error al ejecutar el insert: ${err}`;
                                    return response.status(400).end();
                                });
                        })
                        .catch(err => {
                            response.statusMessage = `Hubo un error al ejecutar el insert: ${err}`;
                            return response.status(400).end();
                        });
                }
            })
            .catch(err => {
                response.statusMessage = `Hubo un error al ejecutar el insert: ${err}`;
                return response.status(400).end();
            });
    }
}

const obtenerTodos = (request, response) => {
    Todo.find()
        .then(listaTodos => response.status(200).json(listaTodos))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la búsqueda: ${err}`;
            return response.status(400).end();
        });
}

const actualizarTodo = (request, response) => {
    const {nombre, id, status} = request.body;
    const todoActualizado = {id, status, nombre}

    Todo.findOneAndUpdate({id}, {$set: todoActualizado}, {new: true})
        .then(actualizadoTodo => response.status(202).json(actualizadoTodo))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la actualización: ${err}`;
            return response.status(400).end();
        });
}

const deleteTodo = (request, response) => {
    const {id} = request.params;
    Todo.deleteOne({id})
        .then(() => response.status(204).end())
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la eliminación: ${err}`;
            return response.status(400).end();
        });
}

const controladorTodo = {
    insertarTodo,
    obtenerTodos,
    actualizarTodo,
    deleteTodo
}

module.exports = controladorTodo;
