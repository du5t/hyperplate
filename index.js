// client-side example

/*
 * DATA/BACKEND
 */
var swarmlog = require('swarmlog')

// you should replace memdb with something that persists if you want the browser
// to store it for later
var memdb = require('memdb')
var db = memdb()

// sublevel is required basically to 'namespace' away the two stores kv uses to
// track data from hyperlogs
var sub = require('subleveldown')
var hyperkv = require('hyperkv')

var log = swarmlog({
  keys: require('./keys.json'),
  sodium: require('chloride/browser'),
  db: sub(db, 'log'),
  valueEncoding: 'json',
//  hubs: [ 'https://signalhub.mafintosh.com' ]
  hubs: [ 'http://localhost:8080' ] // localhost to stop abusing mafintosh's
                                    // signalhub
})

// hyperkv wraps any hyperlog-like API, and swarmlog returns a hyperlog
var kv = hyperkv({
  log: log,
  db: sub(db, 'kv')
})

function logValByKey(key) {
  kv.get(key, function (err, values) {
    if (err) console.error(err)
    // multiple values can come from a single key
    else console.log("messages retrieved from hyperkv: ", values)
  })
}

// pulls info about latest node to be replicated into hyperkv
kv.on('update', function (key, value, node) {
  console.log('RECEIVED', value)
  if (value.hasOwnProperty('msg')) {
    loop.update({ msg: value.msg })
    logValByKey(key) // just to prove it happened in console
  }
})

/*
 * TEMPLATING/FRONTEND
 */
var h = require('virtual-dom/h')
var vdom = require('virtual-dom')

var main = require('main-loop') // iconoclastic paleo reactive updates
var loop = main({ msg: "nothing yet" }, render, vdom)
document.querySelector('#content').appendChild(loop.target)

function render(state) {
  return h('div', [
    h('h1', 'data from swarmlog: ' + state.msg || "no messages"),
    h('input', { onkeypress: putText,
                 value: 'enter text here and tap enter',
                 style: { width: "100%" }
               })
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