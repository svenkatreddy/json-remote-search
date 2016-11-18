'use strict';

var options = {
  url: 'http://beta.json-generator.com/api/json/get/VJrr3vdbM',
  expires: 3000 //3000 milliseconds
};

var assert = require('assert');
var jsonRemoteSearch = require('../')(options);

describe('test search', function () {

  describe('all', function () {
    it('should exist', function () {
      assert(jsonRemoteSearch);
    });
  });

  describe('alpha2', function () {
    it('should fetch content', function (done) {
      jsonRemoteSearch('people[country=NZ].name')
       .then(function(result){
          assert.equal(result.value, 'Matt');
          done();
       })
       .catch(function(err){
          done(err);
       });
    });
  });

});
  