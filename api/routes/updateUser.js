import User from '../sequelize';
import bcrypt from 'bcrypt';
import passport from 'passport';

const BCRYPT_SALT_ROUNDS = 12;
module.exports = app => {
  app.put('/updateUser', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        User.findOne({
          where: {
            username: user.username,
          },
        }).then(user => {
          if (user != null) {
            console.log('user found in db');
            // bcrypt
            //   .hash(user.password, BCRYPT_SALT_ROUNDS)
            //   .then(hashedPassword => {
            user
              .update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                // password: hashedPassword,
              })
              // })
              .then(() => {
                console.log('user updated');
                res.status(200).send({ auth: true, message: 'user updated' });
              });
          } else {
            console.log('no user exists in db to update');
            res.status(404).json('no user exists in db to update');
          }
        });
      }
    })(req, res, next);
  });
};
