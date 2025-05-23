import { Plugin } from "vite";
import { DenoResolveResult } from "./resolver.js";
import Lock from "./lock.js";
export default function denoPrefixPlugin(cache: Map<string, DenoResolveResult>, lock: Lock): Plugin;
