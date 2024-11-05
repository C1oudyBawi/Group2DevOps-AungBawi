import { promises as fs } from "fs";

/**
 * @param { string } filePath
 * @returns { Promise<any | null> }
 */
export async function tryReadJSONAsync(filePath)
{
    try
    {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    }

    catch
    {
        return null;
    }
}

/**
 * @param { object } object
 * @param { string } filePath
 * @returns { Promise }
 */
export async function writeJSONAsync(object, filePath)
{
    try
    {
        await fs.writeFile(filePath, JSON.stringify(object), "utf8");
    }

    catch (err)
    {
        console.error(err);
        throw err;
    }
}
