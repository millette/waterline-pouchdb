![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)

# waterline-pouchdb
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/waterline-pouchdb.svg)](https://gemnasium.com/github.com/millette/waterline-pouchdb)

Provides easy access to `pouchdb` from Sails.js & Waterline.

This module is a Waterline/Sails adapter, an early implementation of a rapidly-developing, tool-agnostic data standard.  Its goal is to provide a set of declarative interfaces, conventions, and best-practices for integrating with all sorts of data sources.  Not just databases-- external APIs, proprietary web services, or even hardware.

Strict adherence to an adapter specification enables the (re)use of built-in generic test suites, standardized documentation, reasonable expectations around the API for your users, and overall, a more pleasant development experience for everyone.


### Installation

To install this adapter, run:

```sh
$ npm install waterline-pouchdb
```

Config the entry in `config/connections.js`:

```javascript
//...
  pouch: {                                                                       
    adapter: 'waterline-pouchdb',  
    path: './tmp', //optional
  }
//...
```

By default, the database location is `/tmp/pouchDB`. If you need to change the location add the field `path`.

### Usage

Use in a model `models/ExampleModel.js` specifying the adapter defined above:

```javascript
module.exports = {
  adapter: 'pouch',
  //...
  id: {
    primaryKey: true,
    type: 'string'
  },
  attributes: {
    name: 'string',
    //...
  }
}
```

Or set "pouch" as the default adapter for all models, in `config/models.js`:

```javascript
module.exports.models = {
  connection: 'pouch'
};
```

If you need to sync with a couchDB (for example, in http://localhost:5984/ with a specific user `_user` and password `_password`) add in config/connections.js the **sync** field:

```javascript
//...
  pouch: {                                                                       
    adapter: 'waterline-pouchdb',
    path: './tmp', //optional
    sync:{
      protocol: 'http',
      host: 'localhost',
      port: '5984',
      user: '_user',
      password: '_password',
    },                        
  }
//...
```


This adapter exposes the following methods:

###### `find()`

+ **Status**
  + Planned

###### `create()`

+ **Status**
  + Planned

###### `update()`

+ **Status**
  + Planned

###### `destroy()`

+ **Status**
  + Planned



### Interfaces

>TODO:
>Specify the interfaces this adapter will support.
>e.g. `This adapter implements the [semantic]() and [queryable]() interfaces.`
> For more information, check out this repository's [FAQ](./FAQ.md) and the [adapter interface reference](https://github.com/balderdashy/sails-docs/blob/master/adapter-specification.md) in the Sails docs.


### Development

Check out **Connections** in the Sails docs, or see the `config/connections.js` file in a new Sails project for information on setting up adapters.

## Getting started
It's usually pretty easy to add your own adapters for integrating with proprietary systems or existing open APIs.  For most things, it's as easy as `require('some-module')` and mapping the appropriate methods to match waterline semantics.  To get started:

1. Fork this repository
2. Set up your `README.md` and `package.json` file.  Sails.js adapter module names are of the form sails-*, where * is the name of the datastore or service you're integrating with.
3. Build your adapter.


### Questions?

See [`FAQ.md`](./FAQ.md).


### More Resources

- [Stackoverflow](http://stackoverflow.com/questions/tagged/sails.js)
- [#sailsjs on Freenode](http://webchat.freenode.net/) (IRC channel)
- [Twitter](https://twitter.com/sailsjs)
- [Professional/enterprise](https://github.com/balderdashy/sails-docs/blob/master/FAQ.md#are-there-professional-support-options)
- [Tutorials](https://github.com/balderdashy/sails-docs/blob/master/FAQ.md#where-do-i-get-help)
- <a href="http://sailsjs.org" target="_blank" title="Node.js framework for building realtime APIs."><img src="https://github-camo.global.ssl.fastly.net/9e49073459ed4e0e2687b80eaf515d87b0da4a6b/687474703a2f2f62616c64657264617368792e6769746875622e696f2f7361696c732f696d616765732f6c6f676f2e706e67" width=60 alt="Sails.js logo (small)"/></a>


### License

**[MIT](./LICENSE)**
Copyright 2016 [balderdashy](http://github.com/balderdashy) & [contributors]
[Mike McNeil](http://michaelmcneil.com), [Balderdash](http://balderdash.co),
[Robin Millette](http://robin.millette.info/) & contributors

[Sails](http://sailsjs.org) is free and open-source under the [MIT License](http://sails.mit-license.org/).
