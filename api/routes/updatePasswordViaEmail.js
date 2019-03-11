/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import User from '../sequelize';

// eslint-disable-next-line prefer-destructuring
const Op = Sequelize.Op;

/**
 * @swagger
 * /updatePasswordViaEmail:
 *   put:
 *     tags:
 *       - Users
 *     name: Update user's password
 *     summary: Update user's password after they've forgotten it
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             resetPasswordToken:
 *               type: string
 *         required:
 *           - username
 *           - password
 *           - resetPasswordToken
 *     responses:
 *       '200':
 *         description: User's password successfully updated
 *       '401':
 *         description: No user found in the database to update
 *       '403':
 *         description: Password reset link is invalid or has expired
 */

const BCRYPT_SALT_ROUNDS = 12;
module.exports = app => {
  app.put('/updatePasswordViaEmail', (req, res) => {
    User.findOne({
      where: {
        username: req.body.username,
        resetPasswordToken: req.body.resetPasswordToken,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    }).then(user => {
      if (user == null) {
        console.error('password reset link is invalid or has expired');
        res.status(403).send('password reset link is invalid or has expired');
      } else if (user != null) {
        console.log('user exists in db');
        bcrypt
          .hash(req.body.password, BCRYPT_SALT_ROUNDS)
          .then(hashedPassword => {
            user.update({
              password: hashedPassword,
              resetPasswordToken: null,
              resetPasswordExpires: null,
            });
          })
          .then(() => {
            console.log('password updated');
            res.status(200).send({ message: 'password updated' });
          });
      } else {
        console.error('no user exists in db to update');
        res.status(401).json('no user exists in db to update');
      }
    });
  });
};
