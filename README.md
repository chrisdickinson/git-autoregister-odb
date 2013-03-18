# git-autoregister-odb

given `fs`, `dir`, a method for finding objects by sha, and a list
of potential backends, automatically load the backends that apply
to this directory.

```javascript
var odb = {}
  , fs = require('fs')
  , path = require('path')
  , autoregister = require('git-autoregister-odb')

var loose = require('git-odb-loose')
  , pack = require('git-odb-pack')

autoregister(fs, path.join(__dirname, '.git'), find, [
  loose, pack
], ready)

function ready(err, backends) {
  odb.backends = backends
}

function find(oid, ready) {
  //
}
```

## API

#### autoregister(fs, directory, findSha, candidate list, ready)

## License

MIT
