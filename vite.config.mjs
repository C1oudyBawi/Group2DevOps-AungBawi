import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import istanbul from 'vite-plugin-istanbul'; // Import the plugin

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getAllHtmlFiles(dir) {
    let results = {};

    // Read all files in the directory
    const files = fs.readdirSync(dir, { recursive: true });

    // Filter and process HTML files
    files.forEach(file => {
        if (typeof file === "string" && file.endsWith(".html")) {
            // Create the entry name by removing .html and using forward slashes
            const entryName = file.slice(0, -5).split(path.sep).join('/');
            // Create the full file path
            const filePath = path.resolve(dir, file);
            results[entryName] = filePath;
        }
    });

    return results;
}

// Export the configuration
export default defineConfig({
    root: "public",
    build: {
        minify: false,
        sourcemap: true,
        outDir: "../dist",
        emptyOutDir: true,
        assetsDir: "assets",
        rollupOptions: {
            input: getAllHtmlFiles(path.resolve(__dirname, "public")),
        },
    },
    publicDir: "public",
    // plugins: [
    //     istanbul({
    //         include: 'assets/*',
    //         exclude: ['node_modules', 'test/'],
    //         extension: ['.js', '.mjs',],
    //         cypress: true,
    //         requireEnv: false, // Set to true if you want to instrument only when a specific env variable is set
    //     }),
    // ],
});