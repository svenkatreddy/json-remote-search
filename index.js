'use strict';

const jsonQuery = require('json-query');
const loadManager = require('./lib/load-manager');

/* hashFileUrl and hashFileExpiry reserved for future */
const defaultConfig = {
  url: '',
  expires: 30000,
  hashfileUrl: '',
  hashExpiry: 9999999,
};

const defaultOptions = {
  locals: '',
}

const jsonRemoteSearch = (paramConfig) => {
  const config = Object.assign({}, defaultConfig, paramConfig);
  return (query, paramOptions) => {
    const options = Object.assign({}, defaultOptions, paramOptions);
    return new Promise( function(resolve,reject) {
      /* load file from server */
      loadManager(config, (err, data)=> {
        if(err) return reject(err);
        const result = jsonQuery(query, {data: data, locals: options.locals});
        resolve(result);
      });
    });
  };
};


module.exports = jsonRemoteSearch;