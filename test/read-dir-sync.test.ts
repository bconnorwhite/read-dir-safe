import { test, expect } from "@jest/globals";
import mock, { restore, directory } from "mock-fs";
import { readDirSync } from "../source";

beforeEach(async () => {
  mock({
    "/access": {
      b: {
        d: directory({
          mode: 0,
          items: {
            f: "file f"
          }
        }),
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

test("read sync", async () => {
  expect(readDirSync("/access")).toEqual(["b/e", "c"]);
});

test("read sync no recursive", async () => {
  expect(readDirSync("/access", { recursive: false })).toEqual(["c"]);
});

test("read sync include directories", async () => {
  expect(readDirSync("/access", { includeDirectories: true })).toEqual(["b", "b/d", "b/e", "c"]);
});

test("read sync include directories no recursive", async () => {
  expect(readDirSync("/access", { includeDirectories: true, recursive: false })).toEqual(["b", "c"]);
});

test("read file sync", async () => {
  expect(readDirSync("/access/c")).toBe(undefined);
});

test("read no access sync", async () => {
  expect(readDirSync("/no-access")).toBe(undefined);
});
