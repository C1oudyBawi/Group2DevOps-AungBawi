import { DB_INSTANCE } from "../database/JSONDatabase.mjs";

export const deleteProgramByName = async (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "Name is required and must be a string." });
    };

    const database = DB_INSTANCE;
    const lowerCaseName = name.toLowerCase();

    let programFound = false; // to track if the program already exists
    for (const [key, program] of database.programs.entries()) 
    // iterate over entries of programs from database with key, unique identifier and program, data
        {
        if (program.name.toLowerCase() === lowerCaseName) {
            database.programs.delete(key);
            programFound = true;
            break;
        };
    };

    if (!programFound) {
        return res.status(404).json({ error: "Program not found." });
    };

    await database.updateAsync();

    res.status(200).json({ message: "Program deleted successfully." });
};
