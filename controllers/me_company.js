'use strict';
const {
  conversation: conversationModel,
  message: messageModel,
} = require('../models/index.js');

/**
 * hogehoge
 * @param {string} companyId
 * @returns {Promise.<string>}
 */
exports.getConversations = async (companyId) => {
  return conversationModel.getConversationsByCompanyId(companyId);
};

/**
 * hogehoge
 * @param {string} companyId
 * @param {string} conversationId
 * @param {number} limit
 * @param {string} lastMessageId
 * @returns {Promise.<string>}
 */
exports.getConversation = async (companyId, conversationId, limit, lastMessageId) => {
  const conversation = await conversationModel.getConversation(conversationId);
  if (conversation.companyId !== companyId) {
    throw new Error('Conversation from different company');
  }
  const messages = await messageModel.getMessages(conversationId, limit, lastMessageId);
  await conversationModel.unsetUnreadFromCompany(conversationId);
  return messages;
};

/**
 * hogehoge
 * @param {string} companyId
 * @param {string} conversationId
 * @param {string} message
 * @returns {Promise.<void>}
 */
exports.sendMessage = async (companyId, conversationId, message) => {
  const conversation = await conversationModel.getConversation(conversationId);
  if (conversation.companyId !== companyId) {
    throw new Error('Conversation from different company');
  }
  const sender = 'company';
  await messageModel.sendMessage(conversationId, sender, message);
  await conversationModel.setUnreadFromApplicant(conversationId);
};
