const Glue = require('glue')
const adapter = require('.')

// console.log(adapter)

const manifest = {
  connections: [ { port: 1212 } ],
  registrations: [
    {
      "plugin": {
        "register": "dogwater",
        "options": {
          "connections": { "main": { "adapter": "pouchdb" } },
          "adapters": {
            // "pouchdb": '/home/millette/wa2/api/adapters/waterline-pouchdb/lib/adapter.js'
            "pouchdb": 'sails-memory'
          },
          "models": [
            {
              identity: 'users',
              connection: 'main',
              schema: false,
              attributes: {
                name: {
                  type: 'string'
                },
                password: {
                  type: 'string'
                },
                email: {
                  type: 'string'
                }
              }
            }
          ]
        }
      },
      "plugin": "/home/millette/wa2/api/adapters/waterline-pouchdb/vava"
    }
  ]
}

const options = { }

Glue.compose(manifest, options)
  .then((server) => {
    console.log('starting')
    server.start()
  })
  .then(() => {
    console.log('hapi days!')
  })
  .catch((e) => {
    console.log('error:', e)
  })
