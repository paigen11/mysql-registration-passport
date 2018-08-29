import User from '../sequelize';
import bcrypt from 'bcrypt';
import passport from 'passport';

const BCRYPT_SALT_ROUNDS = 12;
module.exports = app => {
  app.post(
    '/registerUser',
    passport.authenticate('register'),
    (req, res, next, err) => {
      console.log('req' + req);
      console.log('res' + res);
      console.log('here' + err);
      const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.user.username,
      };
      // if (data.password === '' || data.username === '') {
      //   res.json('username and password required');
      // }
      User.findOne({
        where: {
          username: data.username,
        },
      }).then(user => {
        //     if (user != null) {
        //       console.log('username already taken');
        //       res.json('username already taken');
        //     } else {
        //       bcrypt
        //         .hash(data.password, BCRYPT_SALT_ROUNDS)
        //         .then(function(hashedPassword) {
        user
          .update({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
          })
          .then(() => {
            console.log('user created in db');
            res.status(200).send({ message: 'user created' });
          });
      });
    },
  );
  // })
  // .catch(err => {
  //   console.log('problem communicating with db');
  //   res.status(500).json(err);
  // });
  // res.json({
  //   message: 'signup successful',
  //   user: req.user,
  // });
  // },
  // );
};
