'use strict';
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
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

const Company = mongoose.model('Company', CompanySchema, 'companies');

/**
 * hogehoge
 * @param {Object} company
 * @param {string} user.email
 * @returns {Promise.<string>}
 */
exports.addCompany = async (company) => {
  // const result = await Company.create(company);
};
