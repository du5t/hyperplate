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

2. `npm install -g signalhub`
3. `signalhub listen -p 8080`
4. start another terminal sesh
1. `npm start`
2. start another terminal sesh
3. `npm run serve-broadcaster`

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
- [x] stub controls
 - [x] input+put
- [ ] add stream multiplexing (multiplexing!) w/ dataplex
- [ ] add simple gss styling
- [ ] document app lifecycle from construction to (space)ship w/ hyperboot
