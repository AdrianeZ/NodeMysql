const mysql = require("mysql2/promise");
const pool =  mysql.createPool(
    {
        host: "localhost",
        user: "phpmyadmin",
        password: "brutusex12",
        database: "megak_todo",
        namedPlaceholders: true
    }
)

module.exports = pool;