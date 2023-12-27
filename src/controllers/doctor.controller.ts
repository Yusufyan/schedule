import { Request, Response } from "express";
import { addDoctorService } from "../services/doctor.service";

export async function addDoctorController(req: Request, res: Response) {
  const addData = await addDoctorService(req.body.doctorName)
  return res.success('Add Doctor Successfully', addData)
}
