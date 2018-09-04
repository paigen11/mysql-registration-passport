import User from '../sequelize';
import passport from 'passport';

module.exports = app => {
  app.delete('/deleteUser', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        User.destroy({
          where: {
            username: user.username,
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
      }
    })(req, res, next);
  });
};
