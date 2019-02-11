/* eslint-disable no-console */
/* eslint-disable max-len */
import Sequelize from 'sequelize';
import User from '../sequelize';

// eslint-disable-next-line prefer-destructuring
const Op = Sequelize.Op;

/**
 * @swagger
 * /reset:
 *   get:
 *     tags:
 *       - Users
 *     name: Reset Password Link
 *     summary: Create validation string in reset password link to verify user's allowed to reset their password
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: resetPasswordToken
 *         in: query
 *         schema:
 *           type: string
 *         required:
 *           - resetPasswordToken
 *     responses:
 *       '200':
 *         description: User's password reset link is valid
 *       '403':
 *         description: Password reset link is invalid or has expired
 */

module.exports = (app) => {
  app.get('/reset', (req, res) => {
    User.findOne({
      where: {
        resetPasswordToken: req.query.resetPasswordToken,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    }).then((user) => {
      if (user == null) {
        console.error('password reset link is invalid or has expired');
        res.status(403).send('password reset link is invalid or has expired');
      } else {
        res.status(200).send({
          username: user.username,
          message: 'password reset link a-ok',
        });
      }
    });
  });
};
