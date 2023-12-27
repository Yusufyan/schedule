import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { LoginDTO, RegisterDTO } from "../dtos/user.dto";
import { Users } from "../models/mst-user.model";
import { getManager } from "typeorm";
import ApiError from "../configs/api-error.config";
import { env } from "process";

export async function registerService(dto: RegisterDTO): Promise<any> {
  const entityManager = getManager();
  const existUser = await entityManager.findOne(Users, {
    where: { email: dto.email, username: dto.username },
  })

  if(existUser){
    throw new ApiError(409, "Email or Username already registered")
  }
  
  const registerData = await entityManager.save(Users, {
    email: dto.email,
    username: dto.username,
    password: await bcrypt.hash(dto.password, 10),
  });

  return registerData
}

export async function loginService(dto: LoginDTO): Promise<any> {
  const entityManager = getManager();
  const dataUser = await entityManager.findOne(Users, {
    where: [
      { username: dto.emailOrUsername },
      { email: dto.emailOrUsername }
    ]
  })

  if (!dataUser) throw new ApiError(401, "Bad Credential");

  const validate = await bcrypt.compare(dto.password, dataUser.password);

  if (!validate) throw new ApiError(401, "Bad Credential");

  const token = jwt.sign(
    { userId: dataUser.id },
    env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  return { token }
}
