import { createClient, RedisClientType } from "redis";
import { Store } from "../models/store";
import { REDIS_URL } from "../config/envConstants";

export class RedisService implements Store {
  public readonly client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: REDIS_URL,
    });
    this.client.on("error", (err) => console.error(err));
    this.client.connect().catch(console.error);
  }

  public async set<T>(
    key: string,
    value: T,
    expiration: number = 3600
  ): Promise<void> {
    const serializedValue = JSON.stringify(value);
    await this.client.set(key, serializedValue, { EX: expiration });
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

export default new RedisService();
