'use strict';
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  facebookId: {
    type: String,
    unique: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,    
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema, 'users');

/**
 * hogehoge
 * @returns {Promise.<Object[]>}
 */
exports.findAll = () => {
  return User.find().exec();
};

/**
 * hogehoge
 * @param {string} facebookId
 * @param {string} email
 * @returns {Promise.<Object[]>}
 */
exports.getByFacebookIdOrEmail = (facebookId, email) => {
  return User.find({ $or: [{ facebookId }, { email }] }, { _id: 1 }).exec();
};

/**
 * hogehoge
 * @param {Object} user
 * @param {string} user.email
 * @param {string} user.name
 * @param {string} [user.facebookId]
 * @param {string} [user.password]
 * @returns {Promise.<string>}
 */
exports.addUser = async (user) => {
  const result = await User.create(user);
  return result._id;
};

/**
 * hogehoge
 * @param {string} email
 * @param {[string]} fields
 * @returns {Promise.<string>}
 */
exports.findByEmail = async (email, fields) => {
  const projection = fields && fields.join(' ');
  return User.findOne({ email }, projection).exec();
};
