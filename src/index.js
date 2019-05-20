import express from 'express'
import session from 'express-session'
import cookieParser from "cookie-parser" // for session
import path from 'path'

import knex from './sql-connector'

import { GraphQLServer, PubSub } from 'graphql-yoga' // express.js based GraphQL server, Apollo GraphQL compatible
import ResolverFns from './resolvers'

import passport from 'passport'
import { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } from '../local/TwitterKeys'
import { setUpTwitterLogin } from './auth/Twitter'

//in server.express.use ...
/*
  let user;
  if (req.user) {
    // We get req.user from passport-github with some pretty oddly named fields,
    // let's convert that to the fields in our schema, which match the GitHub
    // API field names.
    user = {
      login: req.user.username,
      html_url: req.user.profileUrl,
      avatar_url: req.user.photos[0].value,
    };
  }
*/


const typeDefs = "public/schema.graphql"

const resolvers = {
  Query: {
    isLogin: (parent, args, { req }) => ResolverFns.isLogin(args), 
  },
  Mutation: {
    signup: async (parent, { username, pwd }, ctx) => ResolverFns.signup({ username, pwd}),
    login: async (parent, { username, pwd }, { req }) => ResolverFns.login({ username, pwd })
  },
  Counter: {
    countStr: counter => `Current count: ${counter.count}`,
  },
  Subscription: {
    counter: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random().toString(36).substring(2, 15) // random channel name
        let count = 0
        setInterval(() => pubsub.publish(channel, { counter: { count: count++ } }), 2000)
        return pubsub.asyncIterator(channel)
      },
    }
  },
}

// GraphQL server setup
const opts = {
  port: 4000,
  cors: {
    credentials: true,
    origin: ['http://localhost:80'] // your frontend url.
  }
};

const pubsub = new PubSub()

// context
const context = (req) => ({
  req: req.request,
  pubsub
});

// server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
});



const KnexSessionStore = require('connect-session-knex')(session);
const store = new KnexSessionStore({ knex });

server.use(session({

    secret: 'keyboard cat',
    cookie: {
      httpOnly: true,
      maxAge: 2419200000 // 2 seconds for testing
    },
    store: store,


    // Don't re-save the session to the store if it hasn't been modified. A
    // value of `true` is the default for `resave`, though that is deprecated
    // and will change in a future version.  Therefore, we set it to `false`.
    resave: false,

    // If a session is new, but not modified, don't save it to the store. A
    // value of `true` is the default for `saveUninitialized`, though now
    // deprecated and will change in the future.  Therefore, we set it `false`.
    saveUninitialized: false,
}));

server.express.set('backendPort', 8080);
server.express.use(express.static(path.join(__dirname, '../public')));
server.express.use(cookieParser("haodkasokggohjj"))

const userSession = setUpTwitterLogin(server.express); // after public dir
server.express.use(passport.initialize())
server.express.use(passport.session())


// start server
server.start(opts, () => console.log(`Server is running on http://localhost:${opts.port}`));


server.express.get(
  '/oauth/twitter',
  passport.authenticate('twitter'),
);

server.express.get(
  '/oauth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/signup' }),
  (req, res) => res.redirect('/'),
);


server.express.use(function(req, res, next) {
    if (!req.route)
        return next (new Error('404'));  
    next();
});