
# koa-body-parser [![Build Status](https://travis-ci.org/thomseddon/koa-body-parser.png?branch=master)](https://travis-ci.org/thomseddon/koa-body-parser)

Parse the request body in koa like ya' used to in express

## Installation

```
npm install koa-body-parser
```

## Options
 - `empty` whether to throw a 415 if the client has indicated there is a body but it cannot be parsed (default: `true`)
 - `length` length limit of the stream to pass to raw-body (default: `content-length`)
 - `limit` byte limit of the body to pass to raw-body, throws 413 if body is larger
 - `encoding` requested encoding (default: `utf8`)

## Example



```js
var bodyParser = require('koa-body-parser');
var koa = require('koa');

var app = koa();

app.use(bodyParser());

app.use(function *() {
  this.body = this.request.body; // Echo request back
  this.status = 200;
});

app.listen(3000);
```

## License

MIT

