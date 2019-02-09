/* eslint-disable no-console */
import passport from 'passport';
import User from '../sequelize';

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
 *       '200':
 *         description: A single user object
 *         schema:
 *           $ref: '#/definitions/User'
 *       '401':
 *         description: No auth token / no user found in db with that name
 *       '403':
 *         description: JWT token and username from client don't match
 */

module.exports = (app) => {
  app.get('/findUser', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.status(401).send(info.message);
      } else if (user.username === req.query.username) {
        User.findOne({
          where: {
            username: req.query.username,
          },
        }).then((userInfo) => {
          if (userInfo != null) {
            console.log('user found in db from findUsers');
            res.status(200).send({
              auth: true,
              first_name: userInfo.first_name,
              last_name: userInfo.last_name,
              email: userInfo.email,
              username: userInfo.username,
              password: userInfo.password,
              message: 'user found in db',
            });
          } else {
            console.error('no user exists in db with that username');
            res.status(401).send('no user exists in db with that username');
          }
        });
      } else {
        console.error('jwt id and username do not match');
        res.status(403).send('username and jwt token do not match');
      }
    })(req, res, next);
  });
};
