import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { MemberDTO } from "../dtos/MemberDTO.mjs";

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

    if (body.adminNumber !== undefined)
    {
        member.adminNumber = body.adminNumber;
    }

    let gymPrograms = body.gymPrograms;

    if (gymPrograms !== undefined && Array.isArray(gymPrograms))
    {
        gymPrograms = new Set(gymPrograms);

        for (let programName of gymPrograms)
        {
            let targetProgram = database.programs.get(programName);

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

        member.gymPrograms = Array.from(gymPrograms);
    }

    await database.updateAsync();

    res.json({ message: `Member ( ID: ${memberID} ) updated successfully!` });
}