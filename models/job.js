'use strict';
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'ended'],
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

const Job = mongoose.model('Job', JobSchema, 'jobs');

/**
 * hogehoge
 * @param {Object} Job
 * @param {string} user.email
 * @returns {Promise.<string>}
 */
exports.addJob = async (Job) => {
  // const result = await Job.create(Job);
};
