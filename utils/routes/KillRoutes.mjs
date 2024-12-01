import { Router } from "express";
import { createMemberAsync } from "../controllers/MemberCreateController.mjs";
import { getMembersAsync } from "../controllers/MemberGetController.mjs";
import { updateMemberAsync } from "../controllers/MemberUpdateController.mjs";

export const KILL_ROUTER = Router();

KILL_ROUTER.get("/", (req, res) =>
{
    res.send("Server is shutting down...");
    process.exit(0);
});