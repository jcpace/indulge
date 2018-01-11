'use strict'
require('./config/db.config.js')
const express = require('express')
const app = express()
const http = require('http')
const https = require('https')
const HTTP_PORT = process.env.PORT || 3000
const HTTPS_PORT = 1443
const routes = require('./api/routes.main')
const fs = require('fs')

// Middleware
require('./config/middleware.js')(app, express)

// Routes
app.use('/api', routes)

// HTTPS
let secureServer = https.createServer({
  key: fs.readFileSync('./config/private.key'),
  cert: fs.readFileSync('./config/certificate.pem')
}, app)
  .listen(HTTPS_PORT, () => {
    console.log('Secure Server listening on port: ' + HTTPS_PORT)
  })

// HTTP

// var insecureServer = http.createServer(app).listen(HTTP_PORT, () => {
//   console.log('Insecure Server listening on port: ' + HTTP_PORT)
// })

// app.listen(PORT, () => {
//   console.log('SERVER listening on port: ', PORT)
// })

// require('letsencrypt-express').create({

//   server: 'staging',

//   email: 'john.doe@example.com',

//   agreeTos: true,

//   approveDomains: [ 'example.com' ],

//   app: require('express')().use('/', function (req, res) {
//    res.end('Hello, World!')
//  })

// }).listen(80, 443)

module.exports = app
