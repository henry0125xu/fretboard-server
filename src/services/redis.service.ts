import { createClient } from "redis";
import { Store } from "../models/store";

class RedisService implements Store {
  private _client;
  public get client() {
    return this._client;
  }

  constructor() {
    this._client = createClient();
    this._client.on("error", (err) => console.error("Redis Client Error", err));
    this._client.connect().catch(console.error);
  }

  public async set<T>(
    key: string,
    value: T,
    expiration?: number
  ): Promise<void> {
    const serializedValue = JSON.stringify(value);
    if (expiration) {
      await this._client.set(key, serializedValue, { EX: expiration });
    } else {
      await this._client.set(key, serializedValue);
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    const value = await this._client.get(key);
    return value ? JSON.parse(value) : null;
  }

  public async delete(key: string): Promise<void> {
    await this._client.del(key);
  }

  public async close(): Promise<void> {
    await this._client.disconnect();
  }
}

export default new RedisService();
