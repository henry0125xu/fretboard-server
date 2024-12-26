import { RedisService } from "../../src/services/redis.service";

jest.mock("redis", () => ({
  createClient: jest.fn(() => ({
    on: jest.fn(),
    connect: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
    set: jest.fn().mockResolvedValue("OK"),
    get: jest.fn().mockResolvedValue(null),
    del: jest.fn().mockResolvedValue(1),
  })),
}));

describe("RedisService", () => {
  let redisService: RedisService;

  beforeEach(() => {
    redisService = new RedisService();
  });

  it("should connect to Redis on instantiation", async () => {
    await redisService.client.connect();

    expect(redisService.client.connect).toHaveBeenCalled();
  });

  it("should set a value in Redis", async () => {
    const mockValue = { name: "test" };
    const mockKey = "testKey";

    await redisService.set(mockKey, mockValue);

    expect(redisService.client.set).toHaveBeenCalledWith(
      mockKey,
      JSON.stringify(mockValue)
    );
  });

  it("should get a value from Redis", async () => {
    const mockKey = "testKey";
    const mockValue = { name: "test" };

    (redisService.client.get as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockValue)
    );

    const result = await redisService.get(mockKey);

    expect(redisService.client.get).toHaveBeenCalledWith(mockKey);
    expect(result).toEqual(mockValue);
  });

  it("should return null when value is not found in Redis", async () => {
    const mockKey = "nonExistingKey";

    (redisService.client.get as jest.Mock).mockResolvedValueOnce(null);

    const result = await redisService.get(mockKey);

    expect(redisService.client.get).toHaveBeenCalledWith(mockKey);
    expect(result).toBeNull();
  });

  it("should delete a key from Redis", async () => {
    const mockKey = "testKey";

    await redisService.delete(mockKey);

    expect(redisService.client.del).toHaveBeenCalledWith(mockKey);
  });

  it("should disconnect from Redis", async () => {
    await redisService.close();

    expect(redisService.client.disconnect).toHaveBeenCalled();
  });

  it("should handle Redis error", () => {
    const mockError = new Error("Test Redis Error");
    jest.spyOn(console, "error").mockImplementation(() => {});
    const mockOn = redisService.client.on as jest.Mock;

    mockOn.mock.calls.find(([eventName]) => eventName === "error")?.[1](
      mockError
    );

    expect(console.error).toHaveBeenCalledWith(mockError);
  });
});
