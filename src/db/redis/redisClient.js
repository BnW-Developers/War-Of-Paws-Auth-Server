import Redis from 'ioredis';
import { config } from '../../config/config.js';

const redisClient = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});
console.log('config.redis.host: ', config.redis.host);
console.log('config.redis.port: ', config.redis.port);

redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));

export default redisClient;
