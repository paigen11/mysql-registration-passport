import User from '../sequelize';
import bcrypt from 'bcrypt';
import jwtSecret from '../config/jwtConfig';
import jwt from 'jsonwebtoken';
import passport from 'passport';

module.exports = app => {
  app.get('/loginUser', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          console.log(user);
          console.log(user.username);
          User.findOne({
            where: {
              username: user.username,
            },
          }).then(user => {
            const token = jwt.sign({ id: req.user.username }, jwtSecret.secret);
            console.log('token');
            console.log(token);
            return res
              .status(200)
              .send({ auth: true, token, message: 'user found & logged in' });
          });
        });
      }
    })(req, res, next);
    // User.findOne({
    //   where: {
    //     username: req.query.username,
    //   },
    // })
    //   .then(user => {
    //     } else if (user === null) {
    //       console.log('bad username');
    //       res.status(400).json('bad username');
    //     } else {
    //       bcrypt.compare(req.query.password, user.password).then(response => {
    //         if (response === true) {
    //           const token = jwt.sign({ id: user.username }, jwtSecret.secret, {
    //             expiresIn: 86400,
    //           });
    //           console.log('user found & logged in');
    //           res
    //             .status(200)
    //             .send({ auth: true, token, message: 'user found & logged in' });
    //         } else {
    //           console.log('passwords do not match');
    //           res.status(400).send({
    //             auth: false,
    //             token: null,
    //             message: 'passwords do not match',
    //           });
    //         }
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     console.log('problem communicating with db');
    //     res.status(500).json(err);
    //   });
  });
};
