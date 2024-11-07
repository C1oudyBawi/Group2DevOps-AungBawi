import { Router } from "express";
import { createProgram } from "../controllers/GymProgramCreateController.mjs";
import { updateProgram } from "../controllers/GymProgramUpdateController.mjs";

export const gymPrograms_ROUTER = Router();

gymPrograms_ROUTER.post("/create", createProgram);
gymPrograms_ROUTER.put("/update/:id", updateProgram);