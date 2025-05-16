import { Plugin } from "vite";
import prefixPlugin from "./prefixPlugin.js";
import mainPlugin from "./resolvePlugin.js";
import { DenoResolveResult, log } from "./resolver.js";
import Lock from "./lock.js";
import * as fs from "node:fs";


export default function deno(): Plugin[] {
  let cache = new Map<string, DenoResolveResult>();
  try {
      const ondiskCacheBuf = fs.readFileSync("./cache.json")
      const ondiskCacheArr = JSON.parse(ondiskCacheBuf.toString())
      const cacheMap = new Map(ondiskCacheArr)
      cache = cacheMap as Map<string, DenoResolveResult>
  } catch (err: any) {
      log(`error: ${err}`, "index.ts")
  }
  const lock = new Lock();

  return [prefixPlugin(cache, lock), mainPlugin(cache, lock)];
}
