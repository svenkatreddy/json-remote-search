'use strict';

var options = {
  url: 'http://www.json-generator.com/api/json/get/bVfgyCTYLC',
  expires: 3000 //3000 milliseconds
};
var jsonRemoteSearch = require('../')(options);

jsonRemoteSearch('[*]')
   .then(function(result){
      console.log(result) //=> {value: 'Matt', parents: [...], key: 0} ... etc
   })
   .catch(function(err){
      throw err; 
   });