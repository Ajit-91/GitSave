import express from "express";
import * as ghControllers from "../controllers/ghControllers";

const router = express.Router();

router.post("/", ghControllers.addRepoData);

router.get("/:id",)

export default router;