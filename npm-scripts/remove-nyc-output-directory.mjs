import fs from "fs";
import path from "path";

const targetDir = path.resolve(".nyc_output");

try
{
    // Remove the target directory if it exists
    fs.rmSync(targetDir, { recursive: true, force: true });
    console.log(`Removed directory: ${targetDir}`);
}

catch (error)
{
    console.error(`Error removing directory: ${error}`);
    process.exit(1);
}
