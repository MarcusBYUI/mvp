const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
    connectionLimit: 25000,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
});

module.exports = db;