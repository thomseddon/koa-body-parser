
var request = require('supertest');
var parseBody = require('../');
var should = require('should');
var koa = require('koa');

describe('koa-body', function () {
  it('should parse json body', function (done) {
    var app = koa();

    app.use(parseBody());

    app.use(function *() {
      this.request.body.should.eql({ hello: 'world' });
      this.status = 200;
    });

    request(app.listen())
      .post('/')
      .set('Content-Type', 'application/json')
      .send({ hello: 'world' })
      .expect(200, done);
  });

  it('should parse urlencoded body', function (done) {
    var app = koa();

    app.use(parseBody());

    app.use(function *() {
      this.request.body.should.eql({ hello: 'world' });;
      this.status = 200;
    });

    request(app.listen())
      .post('/')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({ hello: 'world' })
      .expect(200, done);
  });

  it('should allow body to be parsed twice', function (done) {
    var app = koa();

    app.use(parseBody());
    app.use(parseBody());

    app.use(function *() {
      this.request.body.should.eql({ hello: 'world' });;
      this.status = 200;
    });

    request(app.listen())
      .post('/')
      .set('Content-Type', 'application/json')
      .send({ hello: 'world' })
      .expect(200, done);
  });

  describe('with an empty body', function () {
    it('should not throw when GET', function (done) {
      var app = koa();

      app.use(parseBody());

      app.use(function *() {
        should.not.exist(this.request.body);
        this.status = 200;
      });

      request(app.listen())
        .get('/')
        .expect(200, done);
    });

    it('should not throw with POST by default', function (done) {
      var app = koa();

      app.use(parseBody());

      app.use(function *() {
        should.not.exist(this.request.body);
        this.status = 200;
      });

      request(app.listen())
        .post('/')
        .expect(200, done);
    });

    it('should throw if empty:false', function (done) {
      var app = koa();

      app.use(parseBody({ empty: false }));

      app.use(function *() {
        should.not.exist(this.request.body);
        this.status = 200;
      });

      request(app.listen())
        .post('/')
        .expect(415, done);
    });

    it('should not throw if empty:false and GET', function (done) {
      var app = koa();

      app.use(parseBody({ empty: false }));

      app.use(function *() {
        should.not.exist(this.request.body);
        this.status = 200;
      });

      request(app.listen())
        .get('/')
        .expect(200, done);
    });
  });
});
