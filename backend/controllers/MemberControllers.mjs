import { tryReadJSONAsync, writeJSONAsync } from "../helpers/JsonHelpers.mjs";
import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { MemberDTO } from "../dtos/MemberDTO.mjs";
import {plainToClass} from "class-transformer";

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

// TrumpMcDonaldz
export const updateMemberAsync = async (req, res) =>
{
    // Dummy update method for testing purposes

    let database = DB_INSTANCE;

    let memberID = req.params.id;

    if (memberID === undefined)
    {
        res.status(400).json({ message: "Member ID not provided!" });
        return;
    }

    let member = database.members.get(memberID);

    if (member === undefined)
    {
        res.status(404).json({ message: "Member not found!" });
        return;
    }

    /**
     * @type { MemberDTO }
     */
    let body = req.body;

    // TODO: Validate more stuff

    if (body.name !== undefined)
    {
        member.name = body.name;
    }

    if (body.admin_number !== undefined)
    {
        member.admin_number = body.admin_number;
    }

    let gymPrograms = body.gym_programs;

    if (gymPrograms !== undefined && Array.isArray(gymPrograms))
    {
        let uniqueGymPrograms = new Set();

        for (let programName of body.gym_programs)
        {
            if (uniqueGymPrograms.has(programName))
            {
                continue;
            }

            uniqueGymPrograms.add(programName);

            let targetProgram = database.programs.get(programName);

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

        member.gym_programs = Array.from(uniqueGymPrograms);
    }

    await database.updateAsync();

    res.json({ message: `Member ( ID: ${memberID} ) updated successfully!` });
}

export const updateMember = (req, res) =>
{

}