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

    let memberEntity = database.tryGetMemberByID(memberID);

    if (memberEntity === undefined)
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

    let memberDTO = memberEntity.toDTO(database);

    let parsedMember = await MemberUpdateDTOSchema.safeParseAsync(req.body);

    if (!parsedMember.success)
    {
        respondWithBadRequestErrors(res, parsedMember.error.errors);
        return;
    }

    let body = parsedMember.data;

    if (body.name !== undefined)
    {
        memberDTO.name = body.name;
    }

    if (body.adminNumber !== undefined)
    {
        memberDTO.adminNumber = body.adminNumber;
    }

    let gymPrograms = body.gymPrograms;

    if (gymPrograms !== undefined)
    {
        for (let programName of gymPrograms)
        {
            let targetProgram = database.tryGetGymProgramByName(programName);

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

        memberDTO.gymPrograms = gymPrograms;

        memberEntity.applyDTO(memberDTO, database);
    }

    await database.updateAsync();

    res.json({ message: `Member ( ID: ${memberID} ) updated successfully!` });
}