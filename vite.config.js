import { defineConfig } from 'vite'
import { glob } from 'glob'
import path from 'path'

// The export default is actually required!
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    root: "public",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        assetsDir: "assets",
        rollupOptions: {
            input: Object.fromEntries(
                // Get all HTML files from public directory and its subdirectories
                glob.sync(path.resolve(__dirname, "public/**/*.html")).map(file =>
                [
                    // Generate the name for the entry point
                    // This removes the public directory and the extension from the file name
                    path.relative(
                        "public",
                        file.slice(0, file.length - path.extname(file).length)
                    ),
                    // Get the absolute file path
                    file
                ])
            )
        }
    },
    publicDir: "public"
})