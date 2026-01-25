import { defineConfig } from "tsup";

export default [
    defineConfig({
        entry: ["src/index.ts"],
        format: ["esm", "cjs"],
        dts: true,
        sourcemap: true,
        clean: true,
        splitting: false,
        treeshake: true,
        minify: false,
        outDir: "dist"
    }),
    defineConfig({
        entry: ["src/index.ts"],
        format: ["esm"],
        dts: false,
        sourcemap: false,
        clean: false,
        splitting: false,
        treeshake: true,
        minify: true,
        outDir: "dist",
        outExtension: () => ({ js: ".min.js" })
    })
];
