import { promises as fs } from "fs";

export async function readJSON(filename)
{
    try
    {
        const data = await fs.readFile(filename, "utf8");
        return JSON.parse(data);
    }

    catch (err)
    {
        console.error(err);
        throw err;
    }
}

export async function writeJSON(object, filename) {
    try
    {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), "utf8");
        return allObjects;
    }

    catch (err)
    {
        console.error(err);
        throw err;
    }
}
