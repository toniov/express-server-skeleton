'use strict';
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  sender: {
    type: String,
    enum: ['company', 'user'],
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

const Message = mongoose.model('Message', MessageSchema, 'messages');

/**
 * hogehoge
 * @param {string} conversationId
 * @param {number} limit
 * @param {string} lastMessageId
 * @returns {Promise.<Object[]>}
 */
exports.getMessages = async (conversationId, limit, lastMessageId) => {
  const query = { conversationId: new ObjectId(conversationId) };
  if (lastMessageId) {
    query._id = { $lt: new ObjectId(lastMessageId) };
  }
  return Message
    .find(query)
    .limit(limit)
    .sort('-_id')
    .exec();
};

/**
 * hogehoge
 * @param {string} conversationId
 * @param {string} sender
 * @param {string} message
 * @returns {Promise.<Object>}
 */
exports.sendMessage = (conversationId, sender, message) => {
  return Message.insert({ conversationId, sender, message });
};
