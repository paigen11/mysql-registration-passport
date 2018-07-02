import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import logger from 'morgan';
const router = express.Router()

import registerRouter from './routes/registerUser';

const app = express();

const API_PORT = process.env.API_PORT || 3000;

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

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
    let createUsersDb = "CREATE TABLE if not exists usersDb (" +
        "id INT not null auto_increment, " +
        "first_name VARCHAR(255), " +
        "last_name VARCHAR(255), " +
        "email VARCHAR(255), " +
        "username VARCHAR(255) not null, " +
        "password VARCHAR(255) not null, " +
        "primary key (id) " +
        ")";

    // console.log(createUserDb);

    db.query(createUsersDb, function(err, results, fields) {
        if(err) console.log(err.message);
        console.log('usersDb created');
        // db.end();
        // console.log('connection closed');
    });
});


// app.use('/', registerRouter);
app.post('/registerUser', ( req, res) => {
    var data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };
    // db.connect((err) => {
    //     if(err) throw err;
    //     console.log('connection reopened');
    console.log(data);
    var insert = `INSERT INTO usersDb (first_name, last_name, email, username, password) ` +
        `VALUES (${data.first_name}, ${data.last_name}, ${data.email}, ${data.username}, ${data.password})`;
    console.log(insert);
        db.query(insert, data, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.json('User added to database');
                // db.end();
            })
    // });
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;