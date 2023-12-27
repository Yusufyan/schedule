import express from "express";
import { addScheduleController, getScheduleController } from "../controllers/schedule.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const scheduleRouter = express.Router()

scheduleRouter.post("/add", authMiddleware, addScheduleController)
scheduleRouter.get("/", getScheduleController)

export default scheduleRouter
