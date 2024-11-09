import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { MemberDTO } from "../../dtos/MemberDTO.mjs";
import { generateSnowflake } from "../helpers/SnowflakeHelpers.mjs";

export const createMemberAsync = async(req, res) =>
{
    try
    {
        let database = DB_INSTANCE;

        let { name, adminNumber, gymPrograms } = req.body;

        const nameRegex = /^[a-zA-Z\s-]+$/;

        if (!name || !name.trim() || !nameRegex.test(name))
        {
            return res.status(400).json({ message: 'Invalid name. It should contain only alphabetic characters and spaces.' });
        }

        const adminNumberRegex = /^\d{7}[A-Z]$/;
        if (!adminNumberRegex.test(adminNumber))
        {
            return res.status(400).json({ message: 'Invalid admin number format. It should consist of 7 digits followed by 1 uppercase letter (e.g., 2304806I).' });
        }

        gymPrograms = new Set(gymPrograms);

        let existing_programs = database.programs;

        for (let programName of gymPrograms)
        {
            let targetProgram = existing_programs.get(programName);

            if (targetProgram === undefined)
            {
                res.status(404).json({ message: `Program ( Name: ${programName} ) not found!` });
                return;
            }

            if (!targetProgram.isActive)
            {
                res.status(400).json({ message: `Program ( Name: ${programName} ) is inactive!` });
                return;
            }
        }

        let member = new MemberDTO(
        {
            id: generateSnowflake(),
            name: name,
            adminNumber: adminNumber,
            gymPrograms: Array.from(gymPrograms),
        });

        let generatedID = member.id;

        database.members.set(generatedID, member);

        await database.updateAsync();

        res.json({ message: `Member ( ID: ${generatedID} ) created successfully!` });
    }

    catch (error)
    {
        return res.status(500).json({ message: error.message });
    }
};