import User from '../sequelize';
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;
module.exports = app => {
  app.put('/updatePasswordViaEmail', (req, res, next) => {
    User.findOne({
      where: {
        username: req.body.username,
      },
    }).then(user => {
      if (user != null) {
        console.log('user exists in db');
        bcrypt
          .hash(req.body.password, BCRYPT_SALT_ROUNDS)
          .then(hashedPassword => {
            user.update({
              password: hashedPassword,
              resetPasswordToken: null,
              resetPasswordExpires: null,
            });
          })
          .then(() => {
            console.log('password updated');
            res.status(200).send({ message: 'password updated' });
          });
      } else {
        console.log('no user exists in db to update');
        res.status(404).json('no user exists in db to update');
      }
    });
  });
};
