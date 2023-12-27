import { LoginDTO, RegisterDTO } from "src/dtos/user.dto";
import { Users } from "src/models/mst-user.model";
import { getManager } from "typeorm";
import bcrypt from "bcrypt";
import ApiError from "src/configs/api-error.config";

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
  
}
