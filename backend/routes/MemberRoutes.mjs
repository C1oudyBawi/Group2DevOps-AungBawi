import { Router } from "express";
import { createMemberAsync, updateMemberAsync } from "../controllers/MemberControllers.mjs";

export const MEMBERS_ROUTER = Router();

MEMBERS_ROUTER.post("/create", createMemberAsync);
MEMBERS_ROUTER.put("/update/:id", updateMemberAsync);