import User from '../sequelize';
import passport from 'passport';
/**
 * @swagger
 * /findUser:
 *   get:
 *     tags:
 *       - Users
 *     name: Find user
 *     summary: Finds a user
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required:
 *           - username
 *     responses:
 *       200:
 *         description: A single user object
 *         schema:
 *           $ref: '#/definitions/User'
 *       401:
 *         description: No auth token
 */
module.exports = app => {
  app.get('/findUser', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user2, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.status(401).send(info.message);
      } else {
        User.findOne({
          where: {
            username: req.query.username,
          },
        }).then(user => {
          if (user != null) {
            console.log('user found in db from findUsers');
            res.status(200).send({
              auth: true,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              username: user.username,
              password: user.password,
              message: 'user found in db',
            });
          } else {
            console.log('no user exists in db with that username');
            res.status(401).send('no user exists in db with that username');
          }
        });
      }
    })(req, res, next);
  });
};
