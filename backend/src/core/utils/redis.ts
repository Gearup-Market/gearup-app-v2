import { isJSON } from "."
import { Context, makeContext } from "../context"

class RedisUtil {
    public ctx: Context
    constructor(){
        this.ctx = makeContext()
    }

    public set = (key:string, data: any, expire: number = 60) => {
        this.ctx.redis.set(key, JSON.stringify(data))
        this.ctx.redis.expire(key, expire)
        return data
    }

    public get = async (key:string) => {
        const data = await this.ctx.redis.get(key)
        return isJSON(data) ? JSON.parse(data) : data
    }
}
export const redisUtil = new RedisUtil();
export default RedisUtil 