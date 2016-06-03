## node-cache-redis

Node.js caching library that uses redis as a backend.

### Usage


```
var cacheFor = require('node-cache-redis')();

var userCache = cacheFor('users'); // 'users' is a namespace
var user = {id: 123, name: 'Serhiy'};

userCache.set(user.id, user, 60) // cache this user by it's id for 60 seconds
  .then(() => {
    return userCache.get(user.id);
  })
  .then((user) => {
    console.log(user);
  })
```

### Options

Example:

```
var cacheOptions = {
  logger: bunyanInstance,
  redis: {
    host: '127.0.0.1',
    port: 6370,
    auth_pass: 'superSecret'
  }
};
var cache = require('node-cache-redis')(cacheOptions);
```

`options.redis` is passed directly to [node-redis](https://www.npmjs.com/package/redis). See it's documentation for a list of available options.
