import { Router } from "express";
import { createMemberAsync } from "../controllers/MemberCreateController.mjs";
import { updateMemberAsync } from "../controllers/MemberUpdateController.mjs";

export const MEMBERS_ROUTER = Router();

MEMBERS_ROUTER.post("/create", createMemberAsync);
MEMBERS_ROUTER.put("/update/:id", updateMemberAsync);