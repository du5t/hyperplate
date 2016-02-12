# hyperplate

boilerplate for swarmlog-connected webapps

## what

basically just a cobbled-together mush of
[substack](https://github.com/substack)'s views (as received) on life, the
internet, and everything, in code form. let's all be **hyper**minimalist
hackertrons!

no but seriously, i needed to find a calm place with web frontend technology and
decentralization. this is that place.

### run it

- `npm start`
- `npm run serve-dev` if you want to persist keys

### bits

- UI
  - main-loop
  - virtual-dom
  - hyperscript
- Data
  - level-browserify
  - subleveldown
  - hyperkv
  - swarmlog
  - memdb
- Crypto
  - chloride (NaCl for browser)

i'm not planning on adding a router, but if you need a minimal one,
[something trie-based](https://github.com/zensh/route-trie) might be cool.

## TODO

- [x] hook up hyperkv
- [-] stub controls
 - [ ] input+put
 - [x] click to get
- [ ] add stream multiplexing (multiplexing!) w/ dataplex
- [ ] add simple gss styling
- [ ] document app lifecycle from construction to (space)ship w/ hyperboot
