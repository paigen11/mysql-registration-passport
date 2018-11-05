import User from '../sequelize';
// import passport from 'passport';

const nodemailer = require('nodemailer');

module.exports = app => {
  app.post('/forgotPassword', (req, res, next) => {
    if (req.body.email === '') {
      res.json('email required');
    }
    console.log(req.body.email);
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then(user => {
      if (user === null) {
        console.log('email not in database');
        res.json('email not in db');
      } else {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: '<PLACEHOLDER>',
            pass: '<PLACEHOLDER>',
          },
        });

        const mailOptions = {
          from: `<PLACEHOLDER>`,
          to: `${user.email}`,
          subject: `Link To Reset Password`,
          text: `<URL TO RESET PASSWORD IN APP>`,
          replyTo: `<PLACEHOLDER>`,
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, function(err, response) {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
      }
    });
  });
};
