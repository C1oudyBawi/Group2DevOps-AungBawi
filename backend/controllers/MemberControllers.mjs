import { tryReadJSONAsync, writeJSONAsync } from "../helpers/JsonHelpers.mjs";
import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { MemberDTO } from "../dtos/MemberDTO.mjs";

// Sylvester
export const createMemberAsync = async (req, res) =>
{
    // Dummy create method for testing purposes

    let database = DB_INSTANCE;

    let member = new MemberDTO(
    {
        name: "TrumpMcDonaldz",
        admin_number: "2305387I"
    });

    let generatedID = member.id;

    database.members.set(generatedID, member);

    await database.updateAsync();

    res.json({ message: `Member ( ID: ${generatedID} ) created successfully!` });
}

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
    member.name = body.name;
    member.admin_number = body.admin_number;

    let uniqueGymPrograms = new Set();

    for (let programName of uniqueGymPrograms.keys())
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

    await database.updateAsync();

    res.json({ message: `Member ( ID: ${memberID} ) updated successfully!` });
}