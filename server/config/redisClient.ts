import { Redis } from "ioredis";

const redis = new Redis({
  host:'localhost',
  port:6379,
});


redis.on('connect',()=>{
    console.log('Redis bağlantısı başarılı');
});

redis.on('error',(err)=>{
     console.log('Redis bağlantı hatası');
});

export default redis;