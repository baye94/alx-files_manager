const redisClient = require('../utils/redis');

describe('RedisClient', () => {
  test('isAlive returns true when connected to Redis', async () => {
    const alive = redisClient.isAlive();
    expect(alive).toBe(true);
  });

  test('get returns the value stored for a given key', async () => {
    const key = 'testkey';
    const value = 'testvalue';
    await redisClient.set(key, value, 60);
    const result = await redisClient.get(key);
    expect(result).toBe(value);
  });

  test('set stores a key value pair with a given expiration time', async () => {
    const key = 'testkey';
    const value = 'testvalue';
    const time = 60;
    await redisClient.set(key, value, time);
    const result = await redisClient.get(key);
    expect(result).toBe(value);
    const ttl = await redisClient.client.ttl(key);
    expect(ttl).toBe(time);
  });

  test('del removes a key value pair from Redis', async () => {
    const key = 'testkey';
    const value = 'testvalue';
    await redisClient.set(key, value, 60);
    await redisClient.del(key);
    const result = await redisClient.get(key);
    expect(result).toBe(null);
  });
});
