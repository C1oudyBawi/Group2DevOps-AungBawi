import { promises as fs } from "fs";

// https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map

function replacer(key, value)
{
    if (value instanceof Map)
    {
        return {
            dataType: "Map",
            value: Array.from(value.entries()),
        };
    }

    else
    {
        return value;
    }
}
function reviver(key, value)
{
    if (value !== null && typeof value === "object")
    {
        if (value.dataType === "Map")
        {
            return new Map(value.value);
        }
    }

    return value;
}

/**
 * @param { string } filePath
 * @returns { Promise<any | null> }
 */
export async function tryReadJSONAsync(filePath)
{
    try
    {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data, reviver);
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
        // Make JSON pretty
        await fs.writeFile(filePath, JSON.stringify(object, replacer, 4), "utf8");
    }

    catch (err)
    {
        console.error(err);
        throw err;
    }
}
