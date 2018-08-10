import User from '../sequelize';
import config from '../config';
import jwt from 'jsonwebtoken';

module.exports = app => {
  app.get('/findUser', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided' });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'failed to authenticate token' });
      }
      if (decoded.id === req.query.username) {
        User.findOne({
          where: {
            username: req.query.username,
          },
        })
          .then(user => {
            if (user != null) {
              console.log('user found in db');
              res
                .status(200)
                .send({ auth: true, user, message: 'user found in db' });
            } else {
              console.log('user not found in db');
              res
                .status(404)
                .send({ auth: false, message: 'no user with that username' });
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
  });
};
