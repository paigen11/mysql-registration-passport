import User from '../sequelize';
import verifyToken from '../auth/verifyToken';

import passport from 'passport';

module.exports = app => {
  app.get(
    '/findUser',
    (req, res, next) => {
      // , (err, user, info) => {
      //   if (err) {
      //     console.log(err);
      //   }
      //   if (info != undefined) {
      //     console.log(info.message);
      //     res.send(info.message);
      //   } else {
      console.log('res');
      console.log(res);
      console.log('req');
      console.log(req);
      res.send({
        message: 'authenticated',
      });
    },
    // });
    // if (req.userId === req.query.username) {
    //   User.findOne({
    //     where: {
    //       username: req.query.username,
    //     },
    //   })
    //     .then(user => {
    //       if (user != null) {
    //         console.log('user found in db');
    //         res.status(200).send({
    //           auth: true,
    //           first_name: user.first_name,
    //           last_name: user.last_name,
    //           email: user.email,
    //           username: user.username,
    //           password: user.password,
    //           message: 'user found in db',
    //         });
    //       } else {
    //         console.log('user not found in db');
    //         res
    //           .status(404)
    //           .send({ auth: false, message: 'no user with that username' });
    //       }
    //     })
    //     .catch(err => {
    //       console.log('problem communicating with db');
    //       res.status(500).json(err);
    //     });
    // } else {
    //   return res.status(500).send({
    //     auth: false,
    //     message: 'username and token id do not match',
    //   });
    // }
    // }
  );
};
