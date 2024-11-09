import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { GetGymProgramsDTO } from "../../common/dtos/GetGymProgramsDTO.mjs";

export const getProgramsAsync = async (req, res) =>
{
    let programs = new GetGymProgramsDTO(Array.from(DB_INSTANCE.programs.values()));

    res.json(programs);
}