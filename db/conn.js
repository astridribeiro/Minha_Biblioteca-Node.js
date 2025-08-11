// OUTRA FORMA DE CONECTAR COM O SQL

const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'astridRR1505.',
    database: 'nodemysql',
});
module.exports = pool;