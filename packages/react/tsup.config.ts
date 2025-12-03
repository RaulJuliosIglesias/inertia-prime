import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: false, // Disabled temporarily - TODO: fix all children?: unknown types
  sourcemap: true,
  clean: true,
  target: "es2019"
});
