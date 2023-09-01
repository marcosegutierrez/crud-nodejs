const db = require('mysql2/promise');

const connection = db.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud-nodejs-db',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = connection;