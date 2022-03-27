import DataLoader from "dataloader";

export default test("Dataloader", async () => {
  const myLoader = new DataLoader(
    async (keys: readonly string[]) => {
      console.log("keys", keys);
      return keys;
    },
    { cache: true }
  );

  await Promise.all([
    myLoader.load("1").then(console.log),
    myLoader.load("2").then(console.log),
    myLoader.load("3").then(console.log),
  ]);

  await myLoader.load("1").then(console.log);
});
