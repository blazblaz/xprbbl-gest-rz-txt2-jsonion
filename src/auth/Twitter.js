import session from 'express-session';
import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
} from '../../local/TwitterKeys';

export function setUpTwitterLogin(server, store) {
  if (!TWITTER_CONSUMER_KEY) {
    console.warn('Twitter API key not passed; login won\'t work.'); // eslint-disable-line no-console
    return null;
  }

  const TwitterStrategyOptions = {
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.NODE_ENV !== 'production' ?
      'http://localhost:3000/oauth/twitter/callback' :
      'http://localhost:3000/oauth/twitter/callback',
  };

  passport.use(new TwitterStrategy(
    TwitterStrategyOptions,
    (accessToken, refreshToken, profile, cb) => {
      cb(null, profile);
    },
  ));


  // <Session> 
  passport.serializeUser( (user, done) => {
    console.log(user);
    var sessionUser = { _id: user._id, name: user.name, email: user.email, roles: user.roles }
    done(null, sessionUser)
  })

  passport.deserializeUser( (sessionUser, done) => {
    // The sessionUser object is different from the user mongoose collection
    // it's actually req.session.passport.user and comes from the session collection
    done(null, sessionUser)
  })
  // </Session>


  return true; /*
     !!! replace with user object, as returned (could be "store" variable) */
}
