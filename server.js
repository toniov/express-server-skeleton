'use strict';
const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const app = express();
const mongoose = require('mongoose');
const FacebookStrategy = require('passport-facebook').Strategy;

const MONGO_URL = 'mongodb://mongo:27017/myapp';
const FACEBOOK_PROFILE_FIELDS = ['id', 'displayName', 'first_name', 'middle_name', 'last_name', 'email'];
const CALLBACK_URL = 'https://localhost:3000/api/auth/facebook/callback';

(async () => {
  // connect to database
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
  console.log('Connected to Mongo');
  // set facebook login
  passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID || 1024250417754516,
    clientSecret: process.env.CLIENT_SECRET || '9df9faa5306a21ce310bafc92e50e13a',
    callbackURL: CALLBACK_URL,
    profileFields: FACEBOOK_PROFILE_FIELDS,
  }, (accessToken, refreshToken, profile, done) => {
    done(null, { accessToken, refreshToken, profile });
  }));
  app.use(passport.initialize());
  // set sessions
  const redisOptions = {
    host: 'redis',
    port: 6379
  };
  app.use(session({
    store: new RedisStore(redisOptions),
    secret: process.env.SESSION_SECRET || 'secure string',
    name: 'some.random.name',
    saveUninitialized: false,
    resave: false,
    proxy: true,
    cookie: {
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    },
  }));
  // add some secure stuff to our server
  app.use(helmet());
  // parse the request body from JSON to JS object
  app.use(bodyParser.json());
  // add all our routes
  require('./routes/index.js')(app);
  // not found handling
  app.use((req, res) => {
    res.sendStatus(404);
  });
  // error handling
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
  });
  // this is made because Facebook callback only works with HTTPS
  if (process.env.NODE_ENV === 'local' || !process.env.NODE_ENV) {
    const options = {
      key: fs.readFileSync('./localhost.key'),
      cert: fs.readFileSync('./localhost.crt')
    };
    https.createServer(options, app).listen(3000);
  } else {
    http.createServer(app).listen(3000);
  }

  console.log('Server running');
})()
  .catch(err => {
    console.error('Error Initializing server');
    console.error(err);
  });
