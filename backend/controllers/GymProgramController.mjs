import { readJSON, writeJSON } from "../helpers/JsonHelpers.mjs";

// Aung
export const createProgram = (req, res) =>
{
    let body = req.body;

    let programName = body.programName;

    if (programName == null || programName.length == 0 || programName.length > 50)
    {
        res.status(400).json({ message: "Invalid program name" });
        return;
    }

    res.json({ message: `Program ${programName} created` });
}

// Ohk
export const updateProgram = (req, res) =>
{

}