// Puesto que no se trata de un módulo, aquí no podemos emplear: import express from "express";
const express =require('express');
const {request, response} = require("express");

const app = express();
const puerto = 8080;

const todos = [{
    nombre: 'Aprender componentes de tipo clase.',
    status: 'En progreso',
    id: 123
    },
    {
        nombre: 'Aprender eventos en React.',
        status: 'En progreso',
        id: 456
    }];

// middleware para recibir datos dentro del body del request; también se puede emplear por endpoint;
// se ejecuta antes que las demás funciones del endpoint.
app.use(express.json());

// middleware para recibir datos que se envían mediante "action" de un "form" en un "html".
// app.use(express.urlencoded({extended: true}));

app.get('/api/todos', (request, response) => {
    return response.status(200).json(todos);
});

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

app.post('/api/todo/nuevo', (request, response) => {
    const {nombre, id, status} = request.body;

    if (!nombre || !id || !status) {
        response.statusMessage = "Para crear un nuevo ToDo es necesario enviar 'nombre', 'status' y 'id'.";
        return response.status(406).end();
    } else {
        const todoEncontrado = todos.find(todo => todo.id === id);
        if (todoEncontrado) {
            response.statusMessage = `El 'id': ${id} enviado ya se encuentra en uso. Emplear uno diferente!`;
            return response.status(406).end();
        } else {
            const nuevoTodo = {nombre, status, id};
            todos.push(nuevoTodo);
            return response.status(201).json(nuevoTodo);
        }
    }
});

app.put('/api/todo/actualizar', (request, response) => {
    const {nombre, id, status} = request.body;
    const todoEncontrado = todos.find(todo => todo.id === id);
    const indiceTodo = todos.findIndex(todo => todo.id === id);

    if (todoEncontrado) {
        todos[indiceTodo] = {
            nombre: nombre ? nombre : todos[indiceTodo].nombre,
            status: status ? status : todos[indiceTodo].status,
            id: id
        }
        return response.status(202).json(todos[indiceTodo]);
    } else {
        response.statusMessage = `Todo con id: ${id} no encontrado.`;
        return response.status(404).end();
    }
});

app.delete('/api/todo/eliminar/:id', (request, response) => {
    const {id} = request.params;
    const indiceTodo = todos.findIndex(todo => todo.id === Number(id));

    if (indiceTodo === -1) {
        response.statusMessage = `Todo con 'id': ${id} no encontrado.`;
        return response.status(404).end();
    } else {
        todos.splice(indiceTodo, 1);
        return response.status(204).end();
    }
});

app.listen(puerto, () => {
    console.log(`El servidor se encuentra ejecutándose en el puerto: ${puerto}`);
});
