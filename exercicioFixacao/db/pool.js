const mysql = require('mysql');

const poll = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'finance'
});

module.exports = poll;