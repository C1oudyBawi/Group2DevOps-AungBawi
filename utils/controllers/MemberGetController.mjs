import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { GetMembersDTO } from "../../common/dtos/GetMembersDTO.mjs";

export const getMembersAsync = async (req, res) =>
{
    res.json(new GetMembersDTO(Array.from(DB_INSTANCE.members.values()).map(member => member.toDTO(DB_INSTANCE))));
}