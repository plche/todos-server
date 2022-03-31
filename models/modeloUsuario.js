const mongoose = require('mongoose');

const SchemaUsuario = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nombreUsuario: {
        type: String,
        required: true,
        unique: true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'todos'
    }]
});

const Usuario = mongoose.model('usuarios', SchemaUsuario);

module.exports = Usuario;
