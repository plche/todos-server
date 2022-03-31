const Usuario = require('./../models/modeloUsuario');

const crearUsuario = (request, response) => {
    const {nombre, apellido, nombreUsuario} = request.body;

    if (nombre && apellido && nombreUsuario) {
        const nuevoUsuario = {nombre, apellido, nombreUsuario}
        Usuario.create(nuevoUsuario)
            .then(usuarioCreado => response.status(201).json(usuarioCreado))
            .catch(err => {
                response.statusMessage = `Hubo un error al ejecutar el insert: ${err}`;
                return response.status(400).end();
            });
    } else {
        response.statusMessage = `Se necesita proporcionar 'nombre', 'apellido' y 'nombreUsuario'.`;
        return response.status(406).end();
    }
}

const obtenerUsuarios = (request, response) => {
    Usuario.find()
        // Para traerse los demás campos asociados la referencia (_id) de mongo:
        .populate('todos', ['nombre', 'status', 'id'])
        .then(listaUsuarios => response.status(200).json(listaUsuarios))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la búsqueda: ${err}`;
            return response.status(400).end();
        });
}

const eliminarUsuario = (request, response) => {
    const {nombreUsuario} = request.params;
    Usuario.deleteOne({nombreUsuario})
        .then(() => response.status(204).end())
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la eliminación: ${err}`;
            return response.status(400).end();
        });
}

const obtenerUsuarioPorId = (request, response) => {
    const {nombreUsuario} = request.params;
    Usuario.find({nombreUsuario})
        .populate('todos', ['nombre', 'status', 'id'])
        .then(listaUsuarios => response.status(200).json(listaUsuarios[0]))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la búsqueda: ${err}`;
            return response.status(400).end();
        });
}

const controladorUsuario = {
    crearUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    obtenerUsuarioPorId
}

module.exports = controladorUsuario;
