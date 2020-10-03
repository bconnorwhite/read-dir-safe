import { promises, readdirSync } from "fs";
import { join, relative } from "path";

export type Options = {
  /**
   * Recursively read child directories as well. Default: `true`
   */
  recursive?: boolean;
    /**
   * Whether to include directories in the results. Default: `false`
   */
  includeDirectories?: boolean;
}

function handleError(_e: any): string[] | undefined {
  return undefined;
}

function isRecursive(options: Options) {
  return options.recursive ?? true;
}

function normalize(dirPath: string, itemNames: string[] = [], options: Options) {
  const itemPaths = itemNames.map((itemName) => join(dirPath, itemName));
  if(options.includeDirectories) {
    return [dirPath, ...itemPaths];
  } else {
    return itemPaths;
  }
}

export async function readDir(path: string, options: Options = {}): Promise<string[] | undefined> {
  return promises.readdir(path, { withFileTypes: true }).then(async (items) => {
    const direntPromises = items.map(async (item) => {
      const relativePath = join(path, item.name);
      if(item.isDirectory()) {
        if(isRecursive(options)) {
          return readDir(relativePath, options).then((names) => {
            return normalize(relativePath, names, options);
          });
        } else {
          return options.includeDirectories ? relativePath : [];
        }
      } else {
        return relativePath;
      }
    });
    return Promise.all(direntPromises).then((results) => {
      return results.flat().map((itemPath) => {
        return relative(path, itemPath);
      });
    });
  }).catch((e) => {
    return handleError(e);
  });
}

export function readDirSync(path: string, options: Options = {}): string[] | undefined {
  try {
    const items = readdirSync(path, { withFileTypes: true });
    return items.map((item) => {
      const itemPath = join(path, item.name);
      if(item.isDirectory()) {
        if(isRecursive(options)) {
          return normalize(itemPath, readDirSync(itemPath, options), options);
        } else {
          return options.includeDirectories ? itemPath : [];
        }
      } else {
        return itemPath;
      }
    }).flat().map((itemPath) => {
      return relative(path, itemPath);
    });
  } catch(e) {
    return handleError(e);
  }
}
