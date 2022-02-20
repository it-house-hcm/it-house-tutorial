import redis from "../redis";

export default test("Redis Counter", async () => {
  for (var i = 0; i < 100; i++) {
    await redis.incr("counter");
  }
  const result = await redis.get("counter");
  expect(result).toBe("100");
});
