var level = require('level-browserify')
var swarmlog = require('swarmlog')

var log = swarmlog({
  keys: require('./keys.json'),
  sodium: require('chloride/browser'),
  db: level('server-db'),
  valueEncoding: 'json',
//  hubs: [ 'https://signalhub.mafintosh.com' ],
  hubs: [ 'http://localhost:8080' ]
})

var times = 0
setInterval(function () {
  console.log('sending data...')
  log.append({ time: Date.now(), msg: 'HELLO!x' + times })
  times++
}, 1000)