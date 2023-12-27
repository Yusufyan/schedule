import express from "express";
import { addDoctorController } from "../controllers/doctor.controller";

const doctorRouter = express.Router();

doctorRouter.post('/add', addDoctorController)

export default doctorRouter