# rosebank-tally

A bunyan stream used to POST log objects to rosebank-logger over HTTP.

---

## Required environment variables

`ROSEBANK_LOGGER_HTTPHOST` - Hostname of `rosebank-logger` instance

`ROSEBANK_LOGGER_HTTPPORT` - Port of `rosebank-logger` instance

## Usage

```javascript
var bunyan = require('bunyan');
var Tally = require('rosebank-tally').Tally;

var log = bunyan.createLogger(
  {
    name: 'example',
    streams: [
      {
        type: 'raw',
        stream: new Tally()
      }
    ]
  }
);

log.fatal('Your application died!');
log.error(new Error('Error encountered.'));
log.warn('Warning: Something');
log.info('FYI');
```
