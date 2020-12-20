//test connect redis

async function test() {
    const Redis = require('ioredis')


const redis = new Redis({
    port: 6378,
    host:'127.0.0.1', //redis port
    // family:  4, // IPv4 or IPv6
    password: 123456
})
// set(key,value)
// setex(key,Expiration-time（second）, value)
await redis.setex('c',10,123)
const keys = await redis.keys('*')  
console.log(keys)
}

test()