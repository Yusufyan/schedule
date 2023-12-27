import { Request, Response } from "express";
import { ScheduleDTO } from "../dtos/schedule.dto";
import { addScheduleService, getScheduleService } from "../services/schedule.service";
import ApiError from "../configs/api-error.config";
import { ValidationError } from "joi";

export async function addScheduleController(req: Request, res: Response) {
  try {
    const body = req.body as ScheduleDTO
    const schedule = await addScheduleService(body)
  
    return res.success("Add Schedule successfully", schedule)
  } catch (error) {
    if (error instanceof ApiError) {
      res.error(error.status, error.message);
    } else if (error instanceof ValidationError) {
      const errorMessages = error.details.map((err) => err.message);
      console.log(error);
      res.error(400, errorMessages);
    } else {
      console.log(error);
      res.error(500, "Internal Server Error");
    }
  }
}

export async function getScheduleController(req: Request, res: Response) {
  try {
    const schedule = await getScheduleService()

    return res.success("Get Schedule successfully", schedule)
  } catch (error) {
    if (error instanceof ApiError) {
      res.error(error.status, error.message);
    } else if (error instanceof ValidationError) {
      const errorMessages = error.details.map((err) => err.message);
      console.log(error);
      res.error(400, errorMessages);
    } else {
      console.log(error);
      res.error(500, "Internal Server Error");
    }
  }
}
