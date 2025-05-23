import prefixPlugin from "./prefixPlugin.js";
import mainPlugin from "./resolvePlugin.js";
import { log } from "./resolver.js";
import Lock from "./lock.js";
import * as fs from "node:fs";
export default function deno() {
    let cache = new Map();
    const LOAD_ON_DISK_CACHE = (typeof process.env.NOCACHE === "undefined");
    if (LOAD_ON_DISK_CACHE) {
        try {
            log(`loading ./cache.json`, "index.ts");
            const ondiskCacheBuf = fs.readFileSync("./cache.json");
            const ondiskCacheArr = JSON.parse(ondiskCacheBuf.toString());
            const cacheMap = new Map(ondiskCacheArr);
            cache = cacheMap;
        }
        catch (err) {
            log(`error: ${err}`, "index.ts");
        }
    }
    else {
        log(`env variable NOCACHE detected, not loading ./cache.json`, "index.ts");
    }
    const lock = new Lock();
    return [prefixPlugin(cache, lock), mainPlugin(cache, lock)];
}
