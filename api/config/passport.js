const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

import User from '../models/user';
import secret from './jwtConfig';

module.exports = passport => {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromHeader('x-access-token');
  opts.secretOrKey = secret.secret;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({
        where: {
          username: jwt_payload.userId,
        },
        function(err, user) {
          if (err) {
            console.log('error');
            return done(err, false);
          }
          if (user) {
            console.log(user);
            done(null, user);
          } else {
            console.log('no user found');
            done(null, false);
          }
        },
      });
    }),
  );
};
