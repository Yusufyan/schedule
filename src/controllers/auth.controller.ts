import { Request, Response } from "express";
import { ValidationError } from "joi";
import ApiError from "../configs/api-error.config";
import { LoginDTO, RegisterDTO } from "../dtos/user.dto";
import { loginService, registerService } from "../services/auth.service";

export async function loginController(req: Request, res: Response) {
  try {
    const body = req.body as LoginDTO;
    const login = await loginService(body);

    return res.success("Login successful", login);
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

export async function registerController(req: Request, res: Response) {
  try {
    const body = req.body as RegisterDTO;
    const regis = await registerService(body);

    return res.success("Register successfully", regis);
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
