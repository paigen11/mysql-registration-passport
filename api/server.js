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
    let createUserDb = "CREATE TABLE if not exists usersDb (" +
        "id INT primary key auto_increment, " +
        "first_name VARCHAR(255), " +
        "last_name VARCHAR(255), " +
        "email VARCHAR(255), " +
        "username VARCHAR(255) not null, " +
        "password VARCHAR(255) not null " +
        ")";

    // console.log(createUserDb);

    db.query(createUserDb, function(err, results, fields) {
        if(err) console.log(err.message);
        console.log('userDb created');
    })

});

// app.use('/', registerRouter);
router.post('/registerUser', ( req, res) => {
    console.log(req.body);
    db.query('INSERT INTO userDb(first_name, last_name, email, username, password) ' +
        'VALUES ( ' + req.body.first_name + ' ' + req.body.last_name + ' ' + req.body.email + ' ' + req.body.username + ' ' + req.body.password + ')',
        function (err, result) {
            if (err) throw err;
            res.json('User added to database');
    })
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;