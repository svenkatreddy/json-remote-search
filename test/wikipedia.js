'use strict';

var options = {
  url: 'https://en.wikipedia.org/w/api.php?action=query&titles=doctor&prop=revisions&rvprop=content&format=json',
  expires: 3000 //3000 milliseconds
};
var jsonRemoteSearch = require('../')(options);

jsonRemoteSearch('[*].pages[0].662249')
   .then(function(result){
      console.log(result.value) //=> {value: 'Matt', parents: [...], key: 0} ... etc
   })
   .catch(function(err){
      throw err; 
   });