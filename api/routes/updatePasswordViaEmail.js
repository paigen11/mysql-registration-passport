import User from '../sequelize';
import bcrypt from 'bcrypt';

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
 *         required:
 *           - username
 *           - password
 *     responses:
 *       '200':
 *         description: User's password successfully updated
 *       '401':
 *         description: No user found in the database to update
 */

const BCRYPT_SALT_ROUNDS = 12;
module.exports = app => {
  app.put('/updatePasswordViaEmail', (req, res, next) => {
    User.findOne({
      where: {
        username: req.body.username,
      },
    }).then(user => {
      if (user != null) {
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
        console.log('no user exists in db to update');
        res.status(401).json('no user exists in db to update');
      }
    });
  });
};
