
/**
 * Module dependencies
 */

var parse = require('co-body');

/**
 * Parse request body into ctx.request.body
 *
 * @param {Object} opts
 * @return { GeneratorFunction}
 * @api public
 */

module.exports = function (opts) {
  var opts = opts || {};
  var empty = opts.empty === undefined || opts.empty;

  return function *(next) {
    var encoding = 'transfer-encoding' in this.req.headers;
    var length = 'content-length' in this.req.headers &&
      this.req.headers['content-length'] !== 0;

    if ((encoding || length) && !this.req._readableState.ended) {
      try {
        this.request.body = yield parse(this.request, opts);
      } catch (err) {
        if (err.status !== 415 || !empty)
          throw err;
      }
    }

    yield next;
  }
};
