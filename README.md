<div align="center">
  <a href="https://github.com/bconnorwhite/read-dir-safe">
    <img alt="read-dir-safe" src="assets/header.svg" />
  </a>
  <a href="https://npmjs.com/package/read-dir-safe">
    <img alt="NPM" src="https://img.shields.io/npm/v/read-dir-safe.svg">
  </a>
  <a href="https://github.com/bconnorwhite/read-dir-safe">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/read-dir-safe.svg">
  </a>
  <a href='https://coveralls.io/github/bconnorwhite/read-dir-safe?branch=master'>
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/read-dir-safe.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/read-dir-safe">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/read-dir-safe?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Read directories recursively or non-recursively.

- Returns an array of relative file paths.
- Rather than throwing, returns `undefined` on errors for the root directory you are reading (for example, if you try to read a directory that does not exist).

## Installation

```sh
yarn add read-dir-safe
```

```sh
npm install read-dir-safe
```

## API

```ts
import { readDir, readDirSync, Options } from "read-dir-safe";

function readDir(path: string, options: Options): Promise<string[] | undefined>;

function readDirSync(path: string, options: Options): string[] | undefined;

type Options = {
  /**
   * Recursively read child directories as well. Default: `true`
   */
  recursive?: boolean;
  /**
   * Whether to include directories in the results. Default: `false`
   */
  includeDirectories?: boolean;
}
```

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/read-dir-safe.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for typescript projects
- [@types/mock-fs](https://www.npmjs.com/package/@types/mock-fs): TypeScript definitions for mock-fs
- [@types/node](https://www.npmjs.com/package/@types/node): TypeScript definitions for Node.js
- [mock-fs](https://www.npmjs.com/package/mock-fs): A configurable mock file system.  You know, for testing.

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/read-dir-safe.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)

<br />

## Related Packages

- [fs-safe](https://www.npmjs.com/package/fs-safe): A simple fs wrapper that doesn't throw
- [write-dir-safe](https://www.npmjs.com/package/read-dir-safe): Create directories and their parents recursively
- [remove-dir-safe](https://www.npmjs.com/package/remove-dir-safe): Remove directories recursively or non-recursively
- [read-file-safe](https://www.npmjs.com/package/read-file-safe): Read files without try catch
- [write-file-safe](https://www.npmjs.com/package/write-file-safe): Write files, and parent directories if necessary
- [remove-file-safe](https://www.npmjs.com/package/remove-file-safe): Remove a file without try catch
