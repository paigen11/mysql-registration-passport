import User from '../sequelize';
import bcrypt from 'bcrypt';
import config from '../config';
import jwt from 'jsonwebtoken';

module.exports = app => {
  app.get('/loginUser', (req, res) => {
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
    });
    User.findOne({
      where: {
        username: req.query.username,
      },
    })
      .then(user => {
        if (user != null) {
          bcrypt.compare(req.query.password, user.password).then(response => {
            console.log(response);
            if (response === true) {
              console.log('user found & logged in');
              res
                .status(200)
                .send(decoded)
                .json('user found & logged in');
            } else {
              console.log('passwords do not match');
              res.json('passwords do not match');
            }
          });
        } else {
          console.log('bad username');
          res.json('bad username');
        }
      })
      .catch(err => {
        console.log('problem communicating with db');
        res.status(500).json(err);
      });
  });
};
