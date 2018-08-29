import User from '../sequelize';
import passport from 'passport';

module.exports = app => {
  app.post('/registerUser', function(req, res, next) {
    passport.authenticate('register', function(err, user, info) {
      console.log(err);
      console.log(user);
      console.log(info.message);
      if (info) {
        return res.send(info.message);
      }
      req.logIn(user, function(err) {
        const data = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          username: user.username,
        };
        console.log(data);
        User.findOne({
          where: {
            username: data.username,
          },
        }).then(user => {
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
      });
    })(req, res, next);
  });
};
//       const data = {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         username: user.username,
//       };
//       console.log(data);
//       User.findOne({
//         where: {
//           username: data.username,
//         },
//       }).then(user => {
//         user
//           .update({
//             first_name: data.first_name,
//             last_name: data.last_name,
//             email: data.email,
//           })
//           .then(() => {
//             console.log('user created in db');
//             res.status(200).send({ message: 'user created' });
//           });
//       });
//     },
//   );
// };
