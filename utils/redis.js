const redis = require('redis');
const util = require('util');

class RedisClient {
  constructor() {
    const client = redis.createClient();
    client.on('error', (err) => console.log(err));
    this.client = client;
    client.on('connect', () => {
      this.client = client;
    });
  }

  async isAlive() {
    return new Promise((resolve, reject) => {
      this.client.ping((err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response === 'PONG');
        }
      });
    });
  }

  async get(key) {
    const getKey = util.promisify(this.client.get).bind(this.client);
    const retVal = await getKey(key);
    return retVal;
  }

  async set(key, value, duration) {
    const setKeyExp = util.promisify(this.client.setex).bind(this.client);
    await setKeyExp(key, duration, value);
  }

  async del(key) {
    const delKey = util.promisify(this.client.del).bind(this.client);
    await delKey(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
