'use strict';
const mongoose = require('mongoose');

const TempUserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now,
    index: {
      expires: '1d',
    },
  },
});

const TempUser = mongoose.model('TempUser', TempUserSchema, 'temp_users');

/**
 * hogehoge
 * @param {string} email
 * @param {string} password
 * @param {string} token
 * @returns {Promise.<string>}
 */
exports.addTempUser = async (email, password, token) => {
  const result = await TempUser.create({ email, password, token });
  return result._id;
};

/**
 * hogehoge
 * @param {string} token
 * @returns {Promise.<string>}
 */
exports.findByToken = async (token) => {
  return TempUser.findOne({ token }, { email: 1, password: 1 }).exec();
};

/**
 * hogehoge
 * @param {string} id
 * @returns {Promise.<void>}
 */
exports.removeById = async (id) => {
  await TempUser.remove({ _id: id });
};
