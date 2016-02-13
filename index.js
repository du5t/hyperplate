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
  kv.get(key, function (err, values) {
    if (err) console.error(err)
    else console.log("messages retrieved from hyperkv: ", values)
  })
}

kv.on('update', function (key, value, node) {
  console.log('RECEIVED', value)
  if (value.hasOwnProperty('msg')) {
    loop.update({ msg: value.msg })
    logValByKey(key)
  }
})

function allowUpdate(stream) {
  logStream.resume()
}

var h = require('virtual-dom/h')
var vdom = require('virtual-dom')

var main = require('main-loop')
var loop = main({ msg: "nothing yet" }, render, vdom)
document.querySelector('#content').appendChild(loop.target)

function render(state) {
  return h('div', [
    h('h1', 'data from swarmlog: ' + state.msg || "no messages"),
    h('input', { onkeypress: putText, value: 'enter text here and tap enter' })
  ])
}

function putText(e) {
  var charCode = e.which || event.keyCode

  if ( charCode == '13' ) {
    // Enter pressed
    kv.put('reply', { msg: e.target.value }, function (err, node) {
      if (err) console.error(err)
      else {
        console.log("Submitting data...")
        console.log(node)
      }
    })
  }
}