var EventEmitter = require('events').EventEmitter;
var request = require('request');
var acho = require('acho');
var acho = new Acho();

var url = 'http://' + process.env.ROSEBANK_LOGGER_HTTPHOST + ':' + process.env.ROSEBANK_LOGGER_HTTPPORT + '/logger/';

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
        acho.error('request error: ', error);
      } else {
        acho.success(response);
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
        acho.error('request error: ', error);
      } else {
        acho.success(response);
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
        acho.error('request error: ', error);
      } else {
        acho.success(response);
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
        acho.error('request error: ', error);
      } else {
        acho.success(response);
      }
    });
  }
};

module.exports.Tally = Tally;