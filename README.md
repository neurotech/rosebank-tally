# rosebank-tally

A bunyan stream used to POST log objects to rosebank-logger over HTTP.

---

## Required environment variables

`ROSEBANK_LOGGER_HTTPHOST` - Hostname of `rosebank-logger` instance

`ROSEBANK_LOGGER_HTTPPORT` - Port of `rosebank-logger` instance

## Preferred Log Object Structure

### `error`

```javascript
{
  error: {
    name: 'boom',
    message: 'TypeError',
    stack: 'TypeError: boom\n    at Object.<anonymous> ...'
  }
}
```

### `info` & `warn`

```javascript
{
  operation: 'Information',
  detail: {
    /*
      Particulars about the event that this log entry relates to
      (See below for examples)
    */
  }
}
```

## Example Usage

```javascript
var bunyan = require('bunyan');
var Tally = require('rosebank-tally').Tally;

var log = bunyan.createLogger({
  name: 'example',
  streams: [{ type: 'raw', stream: new Tally() }]
});

var boom = new Error('Error encountered!');
log.error({
  error: {
    name: boom.name,
    message: boom.message,
    stack: boom.stack
  }
});

var info = {
  operation: 'Example Information',
  detail: {
    filename: 'example.csv',
    endpoint: 'http://example.com/users/new'
  }
};
log.info(info);

var warn = {
  operation: 'Example Warning',
  detail: {
    memory: 5678192,
    warning: 'Memory usage is 12% above normal threshold.'
  }
};
log.warn(warn);

// Catch uncaught exceptions and log as fatal
process.on('uncaughtException', function (err) {
  log.fatal({
    fatal: {
      name: err.name,
      message: err.message,
      stack: err.stack
    }
  });
  process.exit(1);
});
```
