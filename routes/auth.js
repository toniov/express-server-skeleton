'use strict';
const passport = require('passport');
const wrapAsync = require('../lib/wrap_async.js');
const { auth: authController } = require('../controllers/index.js');
const { mustBeUnlogged, mustBeLogged } = require('../lib/express_middleware.js');

module.exports = app => {
  app.get('/api/auth/facebook', mustBeUnlogged, passport.authenticate('facebook', { session: false, scope: ['email'] }));

  app.get('/api/auth/facebook/callback', mustBeUnlogged, passport.authenticate('facebook', { session: false }), wrapAsync(async (req, res) => {
    const facebookId = req.user.profile.id;
    const email = req.user.profile.emails[0].value;
    const userId = await authController.registerByFacebook(facebookId, email);
    req.session.userId = userId;
    res.end();
  }));

  app.get('/api/auth/logout', mustBeLogged, wrapAsync(async (req, res) => {
    req.session.destroy(() => res.end());
  }));

  app.post('/api/auth/mail/register', mustBeUnlogged, wrapAsync(async (req, res) => {
    const email = req.email;
    const password = req.password;
    authController.registerByEmail(email, password);
    res.end();
  }));

  app.get('/api/auth/mail/confirmation/:token', mustBeUnlogged, wrapAsync(async (req, res) => {
    const token = req.params.token;
    await authController.confirmEmail(token);
    res.end();
  }));

  app.post('/api/auth/mail/login', mustBeUnlogged, wrapAsync(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userId = await authController.loginByEmail(email, password);
    req.session.userId = userId;
    res.end();
  }));

  // test route
  app.get('/api/users', wrapAsync(async (req, res) => {
    const users = await authController.getUsers();
    res.json(users);
  }));
};
