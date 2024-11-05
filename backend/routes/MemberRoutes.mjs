import { Router } from "express";
import { createMember, updateMember } from "../controllers/MemberControllers.mjs";

export const MEMBERS_ROUTER = Router();

MEMBERS_ROUTER.post("/create", createMember);
MEMBERS_ROUTER.put("/update/:id", updateMember);