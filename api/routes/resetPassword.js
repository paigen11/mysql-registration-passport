import User from '../sequelize';

module.exports = app => {
  app.get('/reset', (req, res, next) => {
    console.log(Date.now());
    User.findOne({
      where: {
        resetPasswordToken: req.query.resetPasswordToken,
        resetPasswordExpires: {
          $gt: Date.now(),
        },
      },
    }).then(user => {
      if (user == null) {
        console.log('password reset link is invalid or has expired');
        res.json('password reset link is invalid or has expired');
      } else {
        res.status(200).send({
          username: user.username,
          message: 'password reset link a-ok',
        });
      }
    });
  });
};
