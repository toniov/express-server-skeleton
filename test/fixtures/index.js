'use strict';
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

/**
 * hogehoge
 * @param {string} dbName
 * @returns {Promise.<void>}
 */
exports.clearAndLoadMongoFixtures = async (dbName) => {
  const url = `localhost:27017/${dbName}`;
  const client = new MongoClient(`mongodb://${url}`, { useNewUrlParser: true });
  await client.connect();
  const db = client.db();
  await db.dropDatabase();
  const fixturesFiles = fs.readdirSync(`${__dirname}/mongodb`);
  for (const fixtureFile of fixturesFiles) {
    const fixtures = require(`./mongodb/${fixtureFile}`);
    const mergedFixtures = fixtures.data.map(fixture => {
      return Object.assign({}, fixtures.base, fixture);
    });
    const collectionName = path.basename(fixtureFile, path.extname(fixtureFile));
    await db.collection(collectionName).insertMany(mergedFixtures);
  }
  await client.close();
};

/**
 * hogehoge
 * @param {string} dbName
 * @returns {Promise.<void>}
 */
exports.getDb = async (dbName) => {
  const url = `localhost:27017/${dbName}`;
  const client = new MongoClient(`mongodb://${url}`, { useNewUrlParser: true });
  await client.connect();
  const db = client.db();
  return { db, client };
};
