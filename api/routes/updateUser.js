import User from '../sequelize';
import bcrypt from 'bcrypt';
import verifyToken from '../auth/verifyToken';

const BCRYPT_SALT_ROUNDS = 12;
module.exports = app => {
  app.put('/updateUser', verifyToken, (req, res, next) => {
    if (req.userId === req.body.username) {
      User.findOne({
        where: {
          username: req.body.username,
        },
      })
        .then(user => {
          if (user != null) {
            console.log('user found in db');
            bcrypt
              .hash(req.body.password, BCRYPT_SALT_ROUNDS)
              .then(hashedPassword => {
                user.update({
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  email: req.body.email,
                  username: req.body.username,
                  password: hashedPassword,
                });
              })
              .then(() => {
                console.log('user updated');
                res.status(200).send({ auth: true, message: 'user updated' });
              });
          } else {
            console.log('no user exists in db to update');
            res.status(404).json('no user exists in db to update');
          }
        })
        .catch(err => {
          console.log('problem communicating with db');
          res.status(500).json(err);
        });
    } else {
      return res.status(500).send({
        auth: false,
        message: 'username and token id do not match',
      });
    }
  });
};
