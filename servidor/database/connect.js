"use strict"

import mysql from 'mysql2/promise'

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'AdminAdmin$',
        database: 'orchids',
        port: 3307,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
});


export { pool }