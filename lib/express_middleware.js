'use strict';
/**
 * hogehoge
 * @returns {void}
 */
module.exports.mustBeUnlogged = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next(new Error('already logged in'));
  }
  next();
};

/**
 * hogehoge
 * @returns {void}
 */
module.exports.mustBeLogged = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return next(new Error('is not logged'));
  }
  next();
};

/**
 * hogehoge
 * @returns {void}
 */
module.exports.mustHasCompany = (req, res, next) => {
  if (!req.session || !req.session.companyId) {
    return next(new Error('is not associated with a company'));
  }
  next();
};
