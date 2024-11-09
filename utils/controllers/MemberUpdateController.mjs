import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { MemberUpdateDTOSchema } from "../../common/dtos/MemberDTO.mjs";
import { GymProgramIsActiveDTOSchema } from "../../common/dtos/GymProgramDTO.mjs";
import { ErrorIssueDTO } from "../../common/dtos/ErrorIssueDTO.mjs";
import
{
    respondWithBadRequestError,
    respondWithBadRequestErrors,
    respondWithNotFoundError,
} from "../helpers/ResponseHelpers.mjs";

// TrumpMcDonaldz
export const updateMemberAsync = async (req, res) =>
{
    let database = DB_INSTANCE;

    // We will never hit this route if id is undefined
    let memberID = req.params.id;

    let member = database.members.get(memberID);

    if (member === undefined)
    {
        respondWithNotFoundError(
            res,
            new ErrorIssueDTO(
            {
                message: `Member ( ID: ${memberID} ) not found!`,
                path: "/id",
            })
        );
        return;
    }

    let parsedMember = await MemberUpdateDTOSchema.safeParseAsync(req.body);

    if (!parsedMember.success)
    {
        respondWithBadRequestErrors(res, parsedMember.error.errors);
        return;
    }

    let body = parsedMember.data;

    if (body.name !== undefined)
    {
        member.name = body.name;
    }

    if (body.adminNumber !== undefined)
    {
        member.adminNumber = body.adminNumber;
    }

    let gymPrograms = body.gymPrograms;

    if (gymPrograms !== undefined)
    {
        for (let programName of gymPrograms)
        {
            let targetProgram = database.programs.get(programName);

            if (targetProgram === undefined)
            {
                respondWithBadRequestError(
                    res,
                    new ErrorIssueDTO(
                    {
                        message: `Program ( Name: ${programName} ) not found!`,
                        path: "gymPrograms",
                    })
                );
                return;
            }

            let parsedProgram = await GymProgramIsActiveDTOSchema.safeParseAsync(targetProgram);

            if (!parsedProgram.success)
            {
                respondWithBadRequestErrors(res, parsedProgram.error.errors);
                return;
            }
        }

        member.gymPrograms = Array.from(gymPrograms);
    }

    await database.updateAsync();

    res.json({ message: `Member ( ID: ${memberID} ) updated successfully!` });
}