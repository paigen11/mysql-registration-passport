import User from '../sequelize';
import verifyToken from '../auth/verifyToken';

module.exports = app => {
  app.delete('/deleteUser', verifyToken, (req, res, next) => {
    if (req.userId === req.query.username) {
      User.destroy({
        where: {
          username: req.query.username,
        },
      })
        .then(user => {
          if (user === 1) {
            console.log('user deleted from db');
            res.json('user deleted from db');
          } else {
            console.log('user not found in db');
            res.status(404).json('no user with that username to delete');
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
