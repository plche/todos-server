const mongoose = require('mongoose');

// useNewUrlParser is no longer necessary in mongoose 6: https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
// mongoose.connect('mongodb://localhost/todos_db');
/*{
    user: "owner_db",
    pwd: "Hw!JmqCSJ3z*DnOc6b"
}*/

mongoose.connect('mongodb://owner_db:Hw!JmqCSJ3z*DnOc6b@management.pe:27017/todos_db')
    .then(() => console.info('Base de datos conectada.'))
    .catch(err => console.error(`Hubo un error: (${err}) al conectarse a la base de datos.`));

mongoose.connection.on('error', err => {
    console.error(`Mongoose error: ${err}.`);
    process.exit(0);
});

mongoose.connection.on('disconnected', () => console.info('Base de datos desconectada.'));