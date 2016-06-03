var redis = require('redis');
var bunyan = require('bunyan');
var Promise = require('bluebird');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var Cache  = require('./cache');


module.exports = function(options) {
  options = options || {};
  var logger = options.logger || bunyan.createLogger({name: 'node-cache-redis'});
  var redisOptions = options.redis || {};

  var redisClient = redis.createClient(redisOptions);

  var cache = new Cache(redisClient, logger)

  return function(namespace) {
    return cache.for(namespace);
  }
}
