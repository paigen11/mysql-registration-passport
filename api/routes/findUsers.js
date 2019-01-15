import passport from 'passport';
/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       first_name:
 *         type: string
 *       last_name:
 *         type: integer
 *       email:
 *         type: string
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       resetPasswordToken:
 *         type: string
 *       resetPasswordExpires:
 *         type: date
 */

/**
 * @swagger
 * /api/findUser:
 *   get:
 *     tags:
 *       - Users
 *     description: Finds a user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single user object
 *         schema:
 *           $ref: '#/definitions/User'
 */
module.exports = app => {
  app.get('/findUser', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
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
      }
    })(req, res, next);
  });
};
