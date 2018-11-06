import User from '../sequelize';

module.exports = app => {
  app.get('/reset', (req, res, next) => {
    console.log('here');
    console.log(req.query);
    User.findOne({
      where: {
        resetPasswordToken: req.query.resetPasswordToken,
      },
    }).then(user => {
      console.log(user);
      if (user == null) {
        console.log('password reset link is invalid');
        res.json('password reset link is invalid');
      } else {
        res.status(200).send({ message: 'password reset link a-ok' });
      }
    });
  });
};
