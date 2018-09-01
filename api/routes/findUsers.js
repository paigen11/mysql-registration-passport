import passport from 'passport';

module.exports = app => {
  app.get(
    '/findUser',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      // , (err, user, info) => {
      //   if (err) {
      //     console.log(err);
      //   }
      //   if (info != undefined) {
      //     console.log(info.message);
      //     res.send(info.message);
      //   } else {
      console.log('user found in db from route');
      res.status(200).send({
        auth: true,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        username: req.user.username,
        password: req.user.password,
        message: 'user found in db',
      });
    },
    // });
    // if (req.userId === req.query.username) {
    //   User.findOne({
    //     where: {
    //       username: req.query.username,
    //     },
    //   })
    //     .then(user => {
    //       if (user != null) {
    //         console.log('user found in db');
    //         res.status(200).send({
    //           auth: true,
    //           first_name: user.first_name,
    //           last_name: user.last_name,
    //           email: user.email,
    //           username: user.username,
    //           password: user.password,
    //           message: 'user found in db',
    //         });
    //       } else {
    //         console.log('user not found in db');
    //         res
    //           .status(404)
    //           .send({ auth: false, message: 'no user with that username' });
    //       }
    //     })
    //     .catch(err => {
    //       console.log('problem communicating with db');
    //       res.status(500).json(err);
    //     });
    // } else {
    //   return res.status(500).send({
    //     auth: false,
    //     message: 'username and token id do not match',
    //   });
    // }
    // }
  );
};
