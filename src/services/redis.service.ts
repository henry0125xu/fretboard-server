import { createClient, RedisClientType } from "redis";
import { Store } from "../models/store";
import { RedisStore } from "connect-redis";

export class RedisService implements Store {
  public readonly client: RedisClientType;

  constructor() {
    this.client = createClient();
    this.client.on("error", (err) => console.error(err));
    this.client.connect().catch(console.error);
  }

  public async set<T>(
    key: string,
    value: T,
    expiration?: number
  ): Promise<void> {
    const serializedValue = JSON.stringify(value);
    if (expiration) {
      await this.client.set(key, serializedValue, { EX: expiration });
    } else {
      await this.client.set(key, serializedValue);
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  public async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async close(): Promise<void> {
    await this.client.disconnect();
  }
}

export const redisService = new RedisService();

export const redisStore = new RedisStore({
  client: redisService.client,
  ttl: 3600,
});
