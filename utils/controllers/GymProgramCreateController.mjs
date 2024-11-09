// Aung
import { DB_INSTANCE } from "../database/JSONDatabase.mjs";
import { GymProgramDTO } from "../../common/dtos/GymProgramDTO.mjs";

export const createProgram = async (req, res) => {
    const programData = req.body;
    const errors = [];

    let name = programData.name;
    let isActive = programData.isActive ?? true;

    if (!name || typeof name !== 'string') {
        errors.push("Name is required and should be a string.")
    }

    name = name.toLowerCase();

    // TODO: Update DTO if we do decide to implement these
    // if (!["upper", "lower", "back"].includes(programData.focusBodyPart)) {
    //     errors.push("Focus body part must be 'upper' or 'lower' or 'back'.")
    // }
    //
    // if (!["mild", "average", "high"].includes(programData.intensity)) {
    //     errors.push("Intensity must be 'mild', 'average', or 'high'.")
    // }
    //
    // if (!["beginner", "intermediate", "advanced"].includes(programData.difficulty)) {
    //     errors.push("Difficulty must be 'beginner', 'intermediate', or 'advanced'.")
    // }
    //
    // if (!["teenagers", "adults", "elders"].includes(programData.targetAudience)) {
    //     errors.push("Target audience must be 'Teenagers', 'Adults', or 'Elders'.")
    // }
    //
    // if (!programData.reps || typeof programData.reps !== 'number') {
    //     errors.push("Reps must be a number.")
    // }
    //
    // if (programData.difficulty === "beginner") {
    //     if (programData.intensity === "high") {
    //         errors.push("Beginner programs cannot have 'high' intensity.")
    //     }
    //     if (programData.reps > 10) {
    //         errors.push("Beginner programs should have fewer than 10 reps.")
    //     }
    // }
    //
    // if (programData.difficulty === "intermediate") {
    //     if (programData.intensity === "high" && programData.reps > 20) {
    //         errors.push("Intermediate programs should not exceed 20 reps with high intensity.")
    //     }
    // }
    //
    // if (programData.difficulty === "advanced") {
    //     if (programData.intensity === "mild" || programData.intensity === "average") {
    //         errors.push("Advanced programs must have 'high' intensity.")
    //     }
    //     if (programData.reps < 15) {
    //         errors.push("Advanced programs should have at least 15 reps for effective workout.")
    //     }
    // }

    let database = DB_INSTANCE;

    let existingPrograms = database.programs;

    if (existingPrograms.has(name)) {
        errors.push("Program with this name already exists.")
    }

    // Return errors if validation fails
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // // Read current programs from JSON
    // let programs = await readJSON('programs.json') || [];
    //
    // // Assign a new unique ID to each program
    // const newProgram = { id: Date.now().toString(), ...programData };
    // programs.push(newProgram);
    //
    // // Write updated programs to JSON
    // await writeJSON('programs.json', programs);

    existingPrograms.set(name,
        new GymProgramDTO(
            {
                name: name,
                isActive: isActive
            }
        ));

    await database.updateAsync();

    res.status(201).json({ message: "Program created successfully!" });
};