'use strict';
const bcrypt = require('bcrypt');
const nanoid = require('nanoid');
const {
  user: userModel,
  temp_user: tempUserModel,
} = require('../models/index.js');

const SALT_ROUNDS = 12;

/**
 * hogehoge
 * @param {string} facebookId
 * @param {string} email
 * @param {string} name
 * @returns {Promise.<string>}
 */
exports.registerByFacebook = async (facebookId, email, name) => {
  const user = await userModel.getByFacebookIdOrEmail(facebookId, email);
  if (user.length) {
    return user[0]._id;
  } else {
    const userId = await userModel.addUser({ facebookId, email, name });
    return userId;
  }
};

/**
 * hogehoge
 * @returns {Promise.<Object[]>}
 */
exports.getUsers = () => {
  return userModel.findAll();
};

/**
 * hogehoge
 * @param {string} email
 * @param {string} password
 * @returns {Promise.<void>}
 */
exports.registerByEmail = async (email, password) => {
  const fields = ['_id'];
  const user = await userModel.findByEmail(email, fields);
  if (user) {
    throw new Error('Email address already exists');
  }
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const token = nanoid();
  await tempUserModel.addTempUser(email, hashedPassword, token);
  // send confirmation email
};

/**
 * hogehoge
 * @param {string} token
 * @returns {Promise.<void>}
 */
exports.confirmEmail = async (token) => {
  const tempUser = await tempUserModel.findByToken(token);
  if (!tempUser) {
    throw new Error('Token is not valid');
  }
  await userModel.addUser({
    email: tempUser.email,
    password: tempUser.password,
  });
};

/**
 * hogehoge
 * @param {string} email
 * @param {string} password
 * @returns {Promise.<void>}
 */
exports.loginByEmail = async (email, password) => {
  const fields = ['password'];
  const user = await userModel.findByEmail(email, fields);
  if (!user) {
    throw new Error('User does not exist');
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Password is not correct');
  }
};
