"use strict";

class Cache {
  constructor(redisClient, logger) {
    this.redisClient = redisClient;
    this.logger = logger;
  }

  for(namespace) {
    return new NSCache(namespace, this.redisClient, this.logger);
  }
}

class NSCache {
  constructor(namespace, redisClient, logger) {
    this.namespace = namespace;
    this.redisClient = redisClient;
    this.logger = logger.child({namespace});
  }

  get(k) {
    let log = this.logger;
    let key = this._buildKey(k);
    return this.redisClient.getAsync(key)
      .then((val) => {
        let v = JSON.parse(val);
        log.debug({key: key, val: v}, 'get');
        return v;
      }).catch((err) => {
        // log and rethrow
        log.error({err, key}, 'Could not get value from cache');
        throw err;
      });
  }

  set(k, v, ttl) {
    let log = this.logger;
    let key = this._buildKey(k);
    let val = JSON.stringify(v);
    log.debug({key, val, ttl}, 'set');
    return this.redisClient.SETEXAsync(key, ttl, val)
      .catch((err) => {
        // log and rethrow
        log.error({err, key, val, ttl}, 'Could not set value in cache');
        throw err;
      });
  }

  _buildKey(key) {
    return this.namespace + '-' + JSON.stringify(key);
  }
}


module.exports = Cache;
