import { Plugin } from "vite";
import { type DenoResolveResult } from "./resolver.js";
import Lock from "./lock.js";
export default function denoPlugin(cache: Map<string, DenoResolveResult>, lock: Lock): Plugin;
