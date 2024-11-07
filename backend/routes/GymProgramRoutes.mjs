import { Router } from "express";
import { createProgram } from "../controllers/GymProgramCreateController.mjs";
import { getProgramsAsync } from "../controllers/GymProgramGetController.mjs";
import { updateProgram } from "../controllers/GymProgramUpdateController.mjs";

export const GYM_PROGRAMS_ROUTER = Router();

GYM_PROGRAMS_ROUTER.post("/create", createProgram);
GYM_PROGRAMS_ROUTER.get("/get", getProgramsAsync);
GYM_PROGRAMS_ROUTER.put("/update/:id", updateProgram);