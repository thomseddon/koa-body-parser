
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
    if (!this.request.body) {
      var encoding = 'transfer-encoding' in this.req.headers;
      if (encoding || this.request.length || (!empty && this.request.method != 'GET')) {
        try {
          this.request.body = yield parse(this, opts);
        } catch (err) {
          if (err.status !== 415 || !empty)
            throw err;
        }
      }
    }
    yield next;
  }
};
