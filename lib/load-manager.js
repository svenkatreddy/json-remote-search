'use strict';

const request = require('request');
const moment = require('moment');
const dataStore = {};

const millSecondsDiffToCurrentTime = (date1) => {
  if(!date1) {
    return 999999999;
  }
  const date2 = moment().format('YYYY-M-DD HH:mm:ss');
  const millisecondsDiff = moment(date2).diff(date1, 'milliseconds');
  return millisecondsDiff;
};

const isURL = (s) => {
  return /^(http|https):/.test(s)
};

module.exports = function (config, cb) {
  let needRequest = true;

  if (isURL(config.url)) {
    if(!dataStore.url) {
      dataStore.url = {};
    }
    dataStore.url.source = config.url;
    dataStore.url.expires = config.expires;
    const timeDiff = millSecondsDiffToCurrentTime(dataStore.url.previousRequest);

    if(timeDiff < dataStore.url.expires) {
      needRequest = false;
    }

    if(needRequest === true || !(dataStore.url.data)) {
      request({ url: config.url, json: true }, function (err, response) {
        if (err) return cb(err);

        dataStore.url.data = response.body;
        dataStore.url.previousRequest = moment().format('YYYY-M-DD HH:mm:ss');

        return cb(null, response.body);
      });
    } else {
      return cb(null, dataStore.url.data);
    }
    return null;
  } else if(config.data) {
    return cb(null, config.data);
  }

  throw new Error('Unsupported source ' + config.url);
};