const redis = require("redis");
require("dotenv").config();

const redisClient=redis.createClient({
    socke:{
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    }
});
redisClient.on("connect",()=>console.log(" Redis Connected"));
redisClient.on("error",(err)=>console.log("Redis Error:",err));

(async()=>{
    await redisClient.connect();
})();

module.exports=redisClient;