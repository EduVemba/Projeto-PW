"use strict"

const  mysql = require('mysql2/promise');
const connectionOptions = require('./connection-options.json')

async function execute(command, parameters = []) {
    let connection;
    try {
        connection = await mysql.createConnection(connectionOptions);
        const [result] = await connection.execute(command, parameters);
        return result;
        //result value is different depending on the SQL Command executed:
        //SELECT: [rows]
        //INSERT/UPDATE/DELETE: {affectedRows,changedRows,insertId,fieldCount,info,serverStatus,warningStatus}
    } catch (error) {
        return void 0;
    } finally {
        connection?.end();
    }
}


module.exports = execute;