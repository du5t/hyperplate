var h = require('virtual-dom/h')
var vdom = require('virtual-dom')

var main = require('main-loop')
var loop = main({ msg: "nothing yet" }, render, vdom)
document.querySelector('#content').appendChild(loop.target)

function render(state) {
  return h('div', [
    h('h1', 'data from swarmlog: ' + state.msg || "no messages"),
    h('button', { onclick: allowUpdate }, 'pull data stream!')
  ])
}

var swarmlog = require('swarmlog')
var memdb = require('memdb')

var db = memdb()

var sub = require('subleveldown')
var hyperkv = require('hyperkv')

var log = swarmlog({
  publicKey: require('./keys.json').public,
  sodium: require('chloride/browser'),
  db: sub(db, 'log'),
  valueEncoding: 'json',
//  hubs: [ 'https://signalhub.mafintosh.com' ]
  hubs: [ 'http://localhost:8080']
})

var kv = hyperkv({
  log: log,
  db: sub(db, 'kv')
})

function logValByKey(key) {
  kv.get(key, function (err, value) {
    if (err) console.error(err)
    else console.log("message retrieved from hyperkv: ", value)
  })
}


var logStream = log.createReadStream({ live: true }).on('data', function (data) {
  console.log('RECEIVED', data.value.v)
  if (data.value.v.hasOwnProperty('msg')) {
    loop.update({ msg: data.value.v.msg })
    logValByKey(data.value.k)
    this.pause()
  }
})

function allowUpdate(stream) {
  logStream.resume()
}