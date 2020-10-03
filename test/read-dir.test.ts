import { test, expect } from "@jest/globals";
import mock, { restore, directory } from "mock-fs";
import { readDir } from "../source";

beforeEach(async () => {
  mock({
    "/access": {
      b: {
        d: {},
        e: "file e"
      },
      c: "file c"
    },
    "/no-access": directory({
      mode: 0,
      items: {
        b: {}
      }
    })
  })
});

afterEach(async () => {
  restore();
});

test("read", async () => {
  return readDir("/access").then((files) => {
    expect(files).toEqual(["b/e", "c"]);
  });
});

test("read no recursive", async () => {
  return readDir("/access", { recursive: false }).then((files) => {
    expect(files).toEqual(["c"]);
  });
});

test("read include directories", async () => {
  return readDir("/access", { includeDirectories: true }).then((files) => {
    expect(files).toEqual(["b", "b/d", "b/e", "c"]);
  });
});

test("read include directories no recursive", async () => {
  return readDir("/access", { includeDirectories: true, recursive: false }).then((files) => {
    expect(files).toEqual(["b", "c"]);
  });
});

test("read file", async () => {
  return readDir("/access/c").then((files) => {
    expect(files).toBe(undefined);
  });
});

test("read no access", async () => {
  return readDir("/no-access").then((files) => {
    expect(files).toBe(undefined);
  });
});
