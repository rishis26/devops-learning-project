const test = require("node:test");
const assert = require("node:assert");
const app = require("./server");

test("health endpoint returns ok", async () => {
  const server = app.listen(0);

  const { port } = server.address();

  const response = await fetch(`http://localhost:${port}/health`);
  const data = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(data.status, "ok");

  server.close();
});
