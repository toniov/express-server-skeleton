'use strict';
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const ConversationSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  unreadFromCompany: {
    type: Boolean
  },
  unreadFromApplicant: {
    type: Boolean
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

const Conversation = mongoose.model('Conversation', ConversationSchema, 'conversations');

/**
 * hogehoge
 * @param {string} conversationId
 * @returns {Promise.<Object[]>}
 */
exports.getConversationsByCompanyId = async (companyId) => {
  return Conversation
    .find({ companyId: new ObjectId(companyId) })
    .sort('-_id')
    .exec();
};

/**
 * hogehoge
 * @param {string} conversationId
 * @returns {Promise.<Object>}
 */
exports.getConversation = async (conversationId) => {
  return Conversation
    .findOne({ _id: new ObjectId(conversationId) })
    .exec();
};

/**
 * hogehoge
 * @param {string} conversationId
 * @returns {Promise.<void>}
 */
exports.setUnreadFromCompany = async (conversationId) => {
  await Conversation.update({
    _id: new ObjectId(conversationId)
  },
  {
    unreadFromCompany: true,
    updated: new Date(),
  });
};

/**
 * hogehoge
 * @param {string} conversationId
 * @returns {Promise.<void>}
 */
exports.setUnreadFromApplicant = async (conversationId) => {
  await Conversation.update({
    _id: new ObjectId(conversationId)
  },
  {
    unreadFromApplicant: true,
    updated: new Date(),
  });
};

/**
 * hogehoge
 * @param {string} conversationId
 * @returns {Promise.<void>}
 */
exports.unsetUnreadFromCompany = async (conversationId) => {
  await Conversation.update({
    _id: new ObjectId(conversationId)
  },
  {
    unreadFromCompany: false,
    updated: new Date(),
  });
};

/**
 * hogehoge
 * @param {string} conversationId
 * @returns {Promise.<void>}
 */
exports.unsetUnreadFromApplicant = async (conversationId) => {
  await Conversation.update({
    _id: new ObjectId(conversationId)
  },
  {
    unreadFromApplicant: false,
    updated: new Date(),
  });
};
