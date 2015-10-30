var EventEmitter = require('events').EventEmitter;
var request = require('request');

var url = 'http://' + process.env.LOGGER_HOST + ':' + process.env.LOGGER_PORT + '/logger/';

function Tally() {
  EventEmitter.call(this);
};

Tally.prototype.write = function (record) {
  if (record.level === 60) {
    request({
      url: url + 'fatal',
      method: 'POST',
      json: record
    }, function (error, response, body) {
      if (error) {
        console.error('request error: ', error);
      }      
    });
  }

  if (record.level === 50) {
    request({
      url: url + 'error',
      method: 'POST',
      json: record
    }, function (error, response, body) {
      if (error) {
        console.error('request error: ', error);
      }      
    });
  }

  if (record.level === 40) {
    request({
      url: url + 'warn',
      method: 'POST',
      json: record
    }, function (error, response, body) {
      if (error) {
        console.error('request error: ', error);
      }      
    });
  }

  if (record.level === 30) {
    request({
      url: url + 'info', 
      method: 'POST',
      json: record
    }, function (error, response, body) {
      if (error) {
        console.error('request error: ', error);
      }      
    });
  }
};

module.exports.Tally = Tally;