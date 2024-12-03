import fs from "fs";
import path from "path";

const sourceDir = path.resolve("dist");
const targetDir = path.resolve("instrumented");

try
{
    // Remove the target directory if it exists
    fs.rmSync(targetDir, { recursive: true, force: true });
    console.log(`Removed directory: ${targetDir}`);

    // Copy the source directory to the target directory
    fs.cpSync(sourceDir, targetDir, { recursive: true });
    console.log(`Copied ${sourceDir} to ${targetDir}`);
}

catch (error)
{
    console.error(`Error managing directories: ${error}`);
    process.exit(1);
}
