# json-remote-search
[![Build Status](https://travis-ci.org/svenkatreddy/json-remote-search.svg?branch=master)](https://travis-ci.org/svenkatreddy/json-remote-search)

Downloads remote json, keeps cache and provides searching api for it

## Install via [npm](https://www.npmjs.com/package/json-remote-search)

```bash
$ npm install json-remote-search
```

## API

```js
var options = {
  url: 'http://www.json-generator.com/api/json/get/bVfgyCTYLC',
  expires: 3000 //3000 milliseconds
};
var jsonRemoteSearch = require('json-remote-search')(options);

jsonRemoteSearch('[*]')
   .then(function(result){
      console.log(result) //=> {value: 'Matt', parents: [...], key: 0} ... etc
   })
   .catch(function(err){
      throw err; 
   });

```

### `jsonRemoteSearch(query)`

Specify a query and what to query. Returns an object that describes the result of the query.

```js

var options = {
  url: 'http://www.json-generator.com/api/json/get/cqioHcrnKG?indent=2',
  expires: 3000 //3000 milliseconds
};
var jsonRemoteSearch = require('json-remote-search')(options);

/*
{
  people: [
    {name: 'Matt', country: 'NZ'},
    {name: 'Pete', country: 'AU'},
    {name: 'Mikey', country: 'NZ'}
  ]
}
*/

jsonRemoteSearch('people[country=NZ].name')
   .then(function(result){
      console.log(result) //=> {value: 'Matt', parents: [...], key: 0} ... etc
   })
   .catch(function(err){
      throw err; 
   });
```

#### Options:

- **`url`** : url to download json file from.
- **`expires`** or **`context`** (optional): mention expiry time for downloading file again (till the point it stays in memory).
- **`data`** (optional): if you dont want to use url, you can just use data which is already existing.

## Queries

Queries are strings that describe an object or value to pluck out, or manipulate from the context object. The syntax is a little bit CSS, a little bit JS, but pretty powerful.

### Accessing properties (dot notation)

`person.name`

### Array accessors

`people[0]`

### Array pluck

`people.name` => return all the names of people

### Get all values of a lookup

`lookup[*]`

### Array filter

By default **only the first** matching item will be returned:

`people[name=Matt]`

But if you add an asterisk (`*`), **all** matching items will be returned:

`people[*country=NZ]`

You can use comparative operators:

`people[*rating>=3]`

Or use boolean logic:

`people[* rating >= 3 & starred = true]`

If `options.enableRegexp` is enabled, you can use the `~` operator to match `RegExp`:

`people[*name~/^R/i]`

You can also **negate** any of the above examples by adding a `!` before the `=` or `~`:

`people[*country!=NZ]`

### Or syntax

`person.greetingName|person.name`

### Deep queries

Search through multiple levels of Objects/Arrays using `[**]`:

```js

var options = {
  url: 'http://www.json-generator.com/api/json/get/cohRDAEugi?indent=2'
};
var jsonRemoteSearch = require('json-remote-search')(options);

/*{
  grouped_people: {
    'friends': [
      {name: 'Steve', country: 'NZ'},
      {name: 'Jane', country: 'US'},
      {name: 'Mike', country: 'AU'},
      {name: 'Mary', country: 'NZ'}
    ],
    'enemies': [
      {name: 'Evil Steve', country: 'AU'},
      {name: 'Betty', country: 'NZ'}
    ]
  }
} */

var result = jsonRemoteSearch('grouped_people[**][*country=NZ]')
                .then(function(result){
                  console.log(result.value)
               })
               .catch(function(err){
                  throw err; 
               });
```

The `result` will be:

```js
[
  {name: 'Steve', country: 'NZ'},
  {name: 'Mary', country: 'NZ'},
  {name: 'Betty', country: 'NZ'}
]
```

### More Documentation Coming soon


## License

Apache 2.0
