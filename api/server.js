import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
// import mysql from 'mysql';
import logger from 'morgan';
import Sequelize from 'sequelize';

const app = express();

const API_PORT = process.env.API_PORT || 3000;

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// const db = mysql.createConnection({
//     host: "db",
//     user: "test",
//     password: "test1234",
//     port: 3306,
//     database: "users"
// });

const sequelize = new Sequelize('users', 'test', 'test1234', {
    host: 'db',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection to sequelize established');
    })
    .catch(err => {
        console.log('Unable to connect through sequelize ', err );
    });

// db.connect((err) => {
//     if(err) throw err;
//     console.log("Connected to MySQL db");
//     let createUsersDb = "CREATE TABLE if not exists usersDb (" +
//         "id INT not null auto_increment, " +
//         "first_name VARCHAR(255), " +
//         "last_name VARCHAR(255), " +
//         "email VARCHAR(255), " +
//         "username VARCHAR(255) not null, " +
//         "password VARCHAR(255) not null, " +
//         "primary key (id) " +
//         ");";
//
//     db.query(createUsersDb, function(err) {
//         if(err) console.log(err.message);
//         console.log('usersDb created');
//
//     });
// });
//
//
// // create user
// app.post('/registerUser', ( req, res) => {
//     const data = {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password
//     };
//
//     console.log(data);
//     var insert = `INSERT INTO usersDb (first_name, last_name, email, username, password) ` +
//         `VALUES ("${data.first_name}", "${data.last_name}", "${data.email}", "${data.username}", "${data.password}");`;
//     console.log(insert);
//         db.query(insert, data, (err, result) => {
//                 if (err) throw err;
//                 console.log(result);
//                 res.json('User added to database');
//             })
// });
//
// // login user
// app.get('/loginUser', (req, res) => {
//     const data = {
//         username: req.body.username,
//         password: req.body.password
//     };
//
//     const login = `SELECT * FROM usersDb WHERE username = "${data.username}" and password = "${data.password}";`;
//
//     db.query(login, data, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.json('User logged in');
//     })
// });
//
// // find user
// app.get('/findUser', (req, res) => {
//     console.log(req.query.username);
//    const find = `SELECT * FROM usersDb WHERE username = "${req.query.username}";`;
//
//    db.query(find, req.body, (err, userInfo) => {
//        if(err) throw err;
//        res.json(userInfo);
//    })
// });
//
// // update user
// app.put('/updateUser', (req, res) => {
//     const data = {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password
//     };
//
//     const update = `UPDATE usersDb SET first_name = "${data.first_name}", last_name = "${data.last_name}", email = "${data.email}", username = "${data.password}"` +
//     `WHERE username="${data.username}";`;
//
//     db.query(update, data, (err) => {
//         if(err) throw err;
//         res.json('User updated');
//     })
// });
//
// // delete user
// app.delete('/deleteUser', (req, res) => {
//     const deleteUser = `DELETE FROM usersDb WHERE username="${req.query.username}";`;
//
//     db.query(deleteUser, req.query, (err) => {
//         if(err) throw err;
//         res.json('User deleted');
//     })
// });

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;