'use strict';
const wrapAsync = require('../lib/wrap_async.js');
const { me_company: meCompanyController } = require('../controllers/index.js');
const { mustBeLogged, mustHasCompany } = require('../lib/express_middleware.js');

module.exports = app => {
  app.get('/api/me_company/conversations', mustBeLogged, mustHasCompany, wrapAsync(async (req, res) => {
    const companyId = req.session.companyId;
    const result = await meCompanyController.getConversations(companyId);
    res.json(result);
  }));

  app.get('/api/me_company/conversation/:id', mustBeLogged, mustHasCompany, wrapAsync(async (req, res) => {
    // TODO validate params
    const limit = req.query.limit;
    const lastMessage = req.query.last;
    const conversationId = req.params.id;
    const companyId = req.session.companyId;
    const result = await meCompanyController.getConversation(companyId, conversationId, limit, lastMessage);
    res.json(result);
  }));

  app.post('/api/me_company/conversation/:id/message', mustBeLogged, mustHasCompany, wrapAsync(async (req, res) => {
    const conversationId = req.params.id;
    const message = req.body.message;
    const companyId = req.session.companyId;
    await meCompanyController.sendMessage(companyId, conversationId, message);
    res.end();
  }));
};
