import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { GetGymProgramsDTO } from "../../common/dtos/GetGymProgramsDTO.mjs";

export const getProgramsAsync = async (req, res) => {
	let programs = new GetGymProgramsDTO(
		Array.from(DB_INSTANCE.programs.values())
	);

	res.json(programs);
};

export const getOneProgramsAsync = async (req, res) => {
	let program = DB_INSTANCE.programs
		.values()
		.find((program) => program.id === req.params.id);

	console.log(program);

	if (program === undefined) {
		res.status(404).send("Program not found.");
		return;
	}

	res.json(program);
};
