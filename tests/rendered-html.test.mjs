import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the WörterSee study builder", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>WörterSee — German Vocabulary Game<\/title>/i);
  assert.match(html, /Die wichtigsten unregelmäßigen Verben/);
  assert.match(html, /<small>86<\/small>/);
  for (const count of [10, 20, 30, 50, 100, 200]) {
    assert.match(html, new RegExp(`<button[^>]*>${count}<\\/button>`));
  }
});

test("keeps the curated irregular-verb dataset complete and wired in", async () => {
  const [dataset, vocabulary] = await Promise.all([
    readFile(new URL("../app/important-irregular-verbs.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/vocabulary.ts", import.meta.url), "utf8"),
  ]);

  assert.equal((dataset.match(/^  \{ de:/gm) ?? []).length, 86);
  assert.match(dataset, /de: "backen"/);
  assert.match(dataset, /de: "preisen"/);
  assert.match(vocabulary, /import \{ importantIrregularVerbs \}/);
  assert.match(vocabulary, /category: "Die wichtigsten unregelmäßigen Verben"/);
});
