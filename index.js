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

var log = swarmlog({
  publicKey: require('./keys.json').public,
  sodium: require('chloride/browser'),
  db: memdb(),
  valueEncoding: 'json',
//  hubs: [ 'https://signalhub.mafintosh.com' ]
  hubs: [ 'http://localhost:8080']
})

var logStream = log.createReadStream({ live: true }).on('data', function (data) {
  console.log('RECEIVED', data.value)
  if (data.value.hasOwnProperty('msg')) {
    loop.update({ msg: data.value.msg })
    this.pause()
  }
})

function allowUpdate(stream) {
  logStream.resume();
}