import jwtSecret from './jwtConfig';
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  User = require('../sequelize'),
  JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            username: username,
          },
        }).then(user => {
          if (user != null) {
            console.log('username already taken');
            return done(null, false, { message: 'username already taken' });
          } else {
            bcrypt
              .hash(password, BCRYPT_SALT_ROUNDS)
              .then(function(hashedPassword) {
                User.create({ username, password: hashedPassword }).then(
                  user => {
                    return done(null, user);
                  },
                );
              });
          }
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        const user = User.findOne({
          where: {
            username: username,
          },
        });

        if (!user) {
          return done(null, false, { message: 'User not found from passport' });
        }

        bcrypt.compare(password, user.password).then(response => {
          if (response !== true) {
            console.log('passwords do not match');
            return done(null, false, { message: 'passwords do not match' });
          }
          return done(null, user, { message: 'user found & logged in' });
        });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
    },
    (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ),
);
