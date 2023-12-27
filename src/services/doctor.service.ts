import { Doctor } from "../models/mst-doctor.model";
import { getManager } from "typeorm";

export async function addDoctorService(name: string){
  const entityManager = getManager()
  const addDoctor = await entityManager.save(Doctor, {
    doctor_name: name
  })

  return addDoctor
}
