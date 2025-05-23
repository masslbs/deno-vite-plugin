import { resolveDeno, resolveViteSpecifier, log } from "./resolver.js";
import process from "node:process";
export default function denoPrefixPlugin(cache, lock) {
    let root = process.cwd();
    return {
        name: "deno:prefix",
        enforce: "pre",
        configResolved(config) {
            root = config.root;
        },
        async resolveId(id, importer) {
            if (id.startsWith("npm:")) {
                log(`resolveId for :npm cache.get(${id})->\n${cache.get(id)}`, "prefix-plugin.ts");
                const cacheResolved = cache.get(id);
                if (cache.has(id) && !cacheResolved) {
                    log("cache knows id but can't resolve it here, exiting", "prefix-plugin.ts");
                    return;
                }
                const resolved = cacheResolved ?? await resolveDeno(id, root, cache, lock);
                if (resolved === null) {
                    // mark it as unresolvable in cache
                    cache.set(id, null);
                    return;
                }
                // TODO: Resolving custom versions is not supported at the moment
                const actual = resolved.id.slice(0, resolved.id.indexOf("@"));
                const result = await this.resolve(actual);
                return result ?? actual;
            }
            else if (id.startsWith("http:") || id.startsWith("https:")) {
                return await resolveViteSpecifier(id, cache, root, lock, importer);
            }
        },
    };
}
