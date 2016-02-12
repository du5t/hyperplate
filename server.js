var level = require('level-browserify')
var swarmlog = require('swarmlog')
var sub = require('subleveldown')
var db = level('./server-kv.db')

var log = swarmlog({
  keys: require('./keys.json'),
  sodium: require('chloride/browser'),
  db: sub(db, 'log'),
  valueEncoding: 'json',
//  hubs: [ 'https://signalhub.mafintosh.com' ],
  hubs: [ 'http://localhost:8080' ]
})

var hyperkv = require('hyperkv')

var kv = hyperkv({
  log: log,
  db: sub(db, 'kv')
})

var times = 0
var key = 'msg'
setInterval(function () {
  console.log('sending data...')
  var value = { time: Date.now(), msg: 'HELLO!x' + times }
  kv.put('msg', value)
  times++
}, 1000)