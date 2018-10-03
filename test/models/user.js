'use strict';

const test = require('ava');
const { init, getDbInstance } = require('../index.js');
const userModel = require('../../models/user.js');
let db, client;

test.before(async () => {
  await init('models_user');
  const instance = await getDbInstance('models_user');
  db = instance.db;
  client = instance.client;
});

test.after.always(async () => {
  await db.dropDatabase();
  await client.close();
});

test('addUser: insert user correctly', async t => {
  const user = {
    email: 'jotaro@stardusts.jo',
    name: 'Jotaro',
  };
  const userId = await userModel.addUser(user);
  t.truthy(userId);
});

test('addUser: fail when trying to insert existent email', async t => {
  const user = {
    email: 'joseph@stardusts.jo',
  };
  await t.throws(userModel.addUser(user));
});
