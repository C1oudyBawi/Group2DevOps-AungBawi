import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getAllHtmlFiles(dir)
{
    let results = {};

    // Read all files in the directory
    const files = fs.readdirSync(dir, { recursive: true });

    // Filter and process HTML files
    files.forEach(file =>
    {
        if (typeof file === "string" && file.endsWith(".html"))
        {
            // Create the entry name by removing .html and using forward slashes
            const entryName = file.slice(0, -5).split(path.sep).join('/');

            // Create the full file path
            const filePath = path.resolve(dir, file);
            results[entryName] = filePath;
        }
    });

    return results;
}

// export default is required for some reason
// noinspection JSUnusedGlobalSymbols
export default defineConfig(
{
    root: "public",
    build:
    {
        outDir: "../dist",
        emptyOutDir: true,
        assetsDir: "assets",
        rollupOptions:
        {
            input: getAllHtmlFiles(path.resolve(__dirname, "public"))
        }
    },
    publicDir: "public"
})