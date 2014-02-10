
# koa-request-body

Automatically parse request bodies into context.request.body

## Installation

```
npm install koa-request-body
```

## Options
 - `empty` whether to throw a 415 if the client has indicated there is a body but it cannot be parsed (default: `true`)

## Example



```js
var bodyParser = require('koa-request-body');
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

