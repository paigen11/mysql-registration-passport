import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql';

const app = express();

const API_PORT = process.env.API_PORT || 3000;

const db = mysql.createConnection({
    host: "db",
    user: "test",
    password: "test1234",
    port: 3306,
    database: "users"
});

db.connect((err) => {
    if(err) throw err;
    console.log("Connected to MySQL db");
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;