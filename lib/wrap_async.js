'use strict';
/**
 * Wrap async functions in order to catch unhandled errors
 * @param {Function} fn
 * @returns {Function}
 */
module.exports = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};
