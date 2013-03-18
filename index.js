module.exports = load_odb

var path = require('path')
  , ls = require('ls-stream')

function load_odb(fs, dir, find_oid, backends, ready) {
  var pending_backends = []

  ls(fs, path.join(dir, 'objects'))
    .on('data', ondata)
    .on('end', onend)

  function ondata(entry) {
    for(var i = 0, len = backends.length; i < len; ++i) {
      if(backends[i].accept(entry.path)) {
        pending_backends[pending_backends.length] = {
            original: entry
          , backend: backends[i]
        }
        break 
      }
    }
  }

  function onend() {
    var pending = pending_backends.length
      , out = []

    if(!pending) {
      return ready(null, [])
    }

    for(var i = 0, len = pending; i < len; ++i) {
      entry(i)
    }

    return 

    function entry(idx) {
      pending_backends[idx].backend(pending_backends[idx].original, fs, find_oid, done)

      function done(err, backend) {
        if(err) {
          ready(err)
          ready = function() { }
          return
        }
        out[idx] = backend
        !--pending && ready(null, out)
      }
    }
  }
}
