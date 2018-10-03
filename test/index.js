'use strict';

const fixtureLoader = require('./fixtures/index.js');
const mongoose = require('mongoose');

/**
 * hogehoge
 * @param {string} dbName
 * @returns {Promise.<void>}
 */
exports.init = async (dbName) => {
  await fixtureLoader.clearAndLoadMongoFixtures(dbName);
  await mongoose.connect('mongodb://localhost:27017/' + dbName, { useNewUrlParser: true });
};

/**
 * hogehoge
 * @param {string} dbName
 * @returns {Promise.<Object>}
 */
exports.getDbInstance = async (dbName) => {
  return fixtureLoader.getDb(dbName);
};
