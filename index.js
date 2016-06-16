/**
 * Module Dependencies
 */

const PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-adapter-memory'))
  .plugin(require('pouchdb-adapter-http'))
  .plugin(require('pouchdb-replication'))
  .plugin(require('pouchdb-find'))

const debug = require('debug')('waterline-pouchdb')

/**
 * waterline-pouchdb
 *
 * Most of the methods below are optional.
 *
 * If you don't need / can't get to every method, just implement
 * what you have time for.  The other methods will only fail if
 * you try to call them!
 *
 * For many adapters, this file is all you need.  For very complex adapters, you may need more flexiblity.
 * In any case, it's probably a good idea to start with one file and refactor only if necessary.
 * If you do go that route, it's conventional in Node to create a `./lib` directory for your private submodules
 * and load them at the top of the file with other dependencies.  e.g. var update = `require('./lib/update')`
 */
module.exports = (function () {
  // You'll want to maintain a reference to each connection
  // that gets registered with this adapter.
  var connections = {}

  // You may also want to store additional, private data
  // per-connection (esp. if your data store uses persistent
  // connections).
  //
  // Keep in mind that models can be configured to use different databases
  // within the same app, at the same time.
  //
  // i.e. if you're writing a MariaDB adapter, you should be aware that one
  // model might be configured as `host="localhost"` and another might be using
  // `host="foo.com"` at the same time.  Same thing goes for user, database,
  // password, or any other config.
  //
  // You don't have to support this feature right off the bat in your
  // adapter, but it ought to get done eventually.
  //

  var adapter = {
    // identity: 'waterline-pouchdb',
    // Set to true if this adapter supports (or requires) things like data types, validations, keys, etc.
    // If true, the schema for models using this adapter will be automatically synced when the server starts.
    // Not terribly relevant if your data store is not SQL/schemaful.
    //
    // If setting syncable, you should consider the migrate option,
    // which allows you to set how the sync will be performed.
    // It can be overridden globally in an app (config/adapters.js)
    // and on a per-model basis.
    //
    // IMPORTANT:
    // `migrate` is not a production data migration solution!
    // In production, always use `migrate: safe`
    //
    // drop   => Drop schema and data, then recreate it
    // alter  => Drop/add columns as necessary.
    // safe   => Don't change anything (good for production DBs)
    //
    syncable: false,
    pkFormat: 'string',

    // Default configuration for connections
    defaults: {
      // For example, MySQLAdapter might set its default port and host.
      // port: 3306,
      // host: 'localhost',
      // schema: true,
      // ssl: false,
      // customThings: ['eh']
    },

    /**
     *
     * This method runs when a model is initially registered
     * at server-start-time.  This is the only required method.
     *
     * @param  {[type]}   connection [description]
     * @param  {[type]}   collection [description]
     * @param  {Function} cb         [description]
     * @return {[type]}              [description]
     */
    registerConnection: function (connection, collections, cb) {
      if (!connection.identity) return cb(new Error('Connection is missing an identity.'))
      if (connections[connection.identity]) return cb(new Error('Connection is already registered.'))

      connections[connection.identity] = new PouchDB(connection.identity)
      cb()
    },

    /**
     * Fired when a model is unregistered, typically when the server
     * is killed. Useful for tearing-down remaining open connections,
     * etc.
     *
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    // Teardown a Connection
    teardown: function (conn, cb) {
      if (typeof conn === 'function') {
        cb = conn
        conn = null
      }
      if (!conn) {
        connections = {}
        return cb()
      }
      if (!connections[conn.identity]) return cb()
      const db = connections[conn]
      db.destroy()
        .then(() => {
          delete connections[conn]
          cb()
        })
        .catch((err) => {
          console.error('EEERRRRROOORRR:', err)
          cb()
        })
    },
    find: function (connection, collection, options, cb) {
      debug('FINDING', options)
      return connections[connection].find({ selector: options.where })
        .then((x) => x.docs)
        .then((x) => {
          debug('FOUND:', x)
          cb(null, x)
        })
        .catch((err) => {
          console.log('ERROR', err)
          cb(err)
        })
    },
    create: function (connection, collection, values, cb) {
      debug('CREATING')
      return connections[connection].post(values)
        .then((x) => {
          values._id = x.id
          values._rev = x.rev
          cb(null, values)
        })
        .catch((err) => {
          console.log('ERROR', err)
          cb(err)
        })
    },
    update: function (connection, collection, options, values, cb) {
      debug('UPDATING')
      return connections[connection].put(values)
        .then((x) => cb(null, x))
        .catch((err) => cb(err))
    },
    destroy: function (connection, collection, options, cb) {
      debug('DESTROYING')
      return connections[connection].remove(options.id, options._rev)
        .then((x) => cb(null, x))
        .catch((err) => cb(err))
    },
    syncSetup: function (connection, collection, options, cb) {
      connections[connection].sync(options)
      return cb(null, 'now syncing')
    }
  }

  // Expose adapter definition
  return adapter
})()
