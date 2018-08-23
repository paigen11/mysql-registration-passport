import User from '../sequelize';
import bcrypt from 'bcrypt';
import jwtSecret from '../config/jwtConfig';
import jwt from 'jsonwebtoken';

module.exports = app => {
  app.get('/loginUser', (req, res) => {
    User.findOne({
      where: {
        username: req.query.username,
      },
    })
      .then(user => {
        if (req.query.password == false) {
          console.log('password required');
          res
            .status(400)
            .send({ auth: false, token: null, message: 'password required' });
        } else if (user === null) {
          console.log('bad username');
          res.status(400).json('bad username');
        } else {
          bcrypt.compare(req.query.password, user.password).then(response => {
            if (response === true) {
              const token = jwt.sign({ id: user.username }, jwtSecret.secret, {
                expiresIn: 86400,
              });
              console.log('user found & logged in');
              res
                .status(200)
                .send({ auth: true, token, message: 'user found & logged in' });
            } else {
              console.log('passwords do not match');
              res.status(400).send({
                auth: false,
                token: null,
                message: 'passwords do not match',
              });
            }
          });
        }
      })
      .catch(err => {
        console.log('problem communicating with db');
        res.status(500).json(err);
      });
  });
};
