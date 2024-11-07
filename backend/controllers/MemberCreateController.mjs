import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { MemberDTO } from "../dtos/MemberDTO.mjs";

export const createMemberAsync = async(req, res) =>
{
    try
    {
        let database = DB_INSTANCE;

        let { name, admin_number, gym_programs } = req.body;

        const nameRegex = /^[a-zA-Z\s-]+$/;

        if (!name || !name.trim() || !nameRegex.test(name))
        {
            return res.status(400).json({ message: 'Invalid name. It should contain only alphabetic characters and spaces.' });
        }

        const adminNumberRegex = /^\d{7}[A-Z]$/;
        if (!adminNumberRegex.test(admin_number))
        {
            return res.status(400).json({ message: 'Invalid admin number format. It should consist of 7 digits followed by 1 uppercase letter (e.g., 2304806I).' });
        }

        gym_programs = new Set(gym_programs);

        let existing_programs = database.programs;

        for (let programName of gym_programs)
        {
            let targetProgram = existing_programs.get(programName);

            if (targetProgram === undefined)
            {
                res.status(404).json({ message: `Program ( Name: ${programName} ) not found!` });
                return;
            }

            if (!targetProgram.is_active)
            {
                res.status(400).json({ message: `Program ( Name: ${programName} ) is inactive!` });
                return;
            }
        }

        let member = new MemberDTO(
            {
                name: name,
                admin_number: admin_number,
                gym_programs: Array.from(gym_programs),
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