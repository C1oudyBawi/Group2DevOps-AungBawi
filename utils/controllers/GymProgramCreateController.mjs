// Aung Bawi Lian
import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { GymProgramDTO } from "../../common/dtos/GymProgramDTO.mjs";
import { generateSnowflake } from "../helpers/SnowflakeHelpers.mjs";

export const createProgram = async (req, res) => {
	const programData = req.body;
	const errors = [];

	let {
		name,
		focusBodyPart,
		intensity,
		difficulty,
		targetAudience,
		reps,
		isActive,
	} = programData;

	isActive = isActive ?? true;

	// Change to lower case
	[name, focusBodyPart, intensity, difficulty, targetAudience] = [
		name,
		focusBodyPart,
		intensity,
		difficulty,
		targetAudience,
	].map((str) => str.toLowerCase());

	// Validation
	if (!name || typeof name !== "string") {
		errors.push("Name is required and should be a string.");
	}

	if (!["upper", "lower", "back"].includes(focusBodyPart)) {
		errors.push("Focus body part must be 'upper' or 'lower' or 'back'.");
	}

	if (!["mild", "average", "high"].includes(intensity)) {
		errors.push("Intensity must be 'mild', 'average', or 'high'.");
	}

	if (!["beginner", "intermediate", "advanced"].includes(difficulty)) {
		errors.push(
			"Difficulty must be 'beginner', 'intermediate', or 'advanced'."
		);
	}

	if (!["teenagers", "adults", "elders"].includes(targetAudience)) {
		errors.push(
			"Target audience must be 'teenagers', 'adults', or 'elders'."
		);
	}

	if (!reps || typeof reps !== "number") {
		errors.push("Reps must be a number.");
	}

	// Validation for difficulty and intensity levels
	if (difficulty === "beginner") {
		if (intensity === "high") {
			errors.push("Beginner programs cannot have 'high' intensity.");
		}
		if (reps > 10) {
			errors.push("Beginner programs should have fewer than 10 reps.");
		}
	} else if (
		difficulty === "intermediate" &&
		intensity === "high" &&
		reps > 20
	) {
		errors.push(
			"Intermediate programs should not exceed 20 reps with high intensity."
		);
	} else if (difficulty === "advanced") {
		if (intensity !== "high") {
			errors.push("Advanced programs must have 'high' intensity.");
		}
		if (reps < 15) {
			errors.push(
				"Advanced programs should have at least 15 reps for effective workout."
			);
		}
	}

	const database = DB_INSTANCE;
	const existingPrograms = database.programs;

	if (existingPrograms.has(name)) {
		errors.push("Program with this name already exists.");
	}

	// Return errors if validation fails
	if (errors.length > 0) {
		return res.status(400).json({ errors });
	}

	// Create and save the program
	const newProgram = new GymProgramDTO({
		id: generateSnowflake(),
		name,
		focusBodyPart,
		intensity,
		difficulty,
		targetAudience,
		reps,
		isActive,
	});

	existingPrograms.set(newProgram.id, newProgram);
	await database.updateAsync();

	// Return the newly created program
	res.status(201).json({
		message: "Program created successfully!",
		program: newProgram,
	});
};
