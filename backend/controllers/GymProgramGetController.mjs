import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { GetGymProgramsDTO } from "../dtos/GetGymProgramsDTO.mjs";

export const getProgramsAsync = async (req, res) =>
{
    let database = DB_INSTANCE;

    let programs = new GetGymProgramsDTO(Array.from(database.programs.values()));

    res.json(programs);
}