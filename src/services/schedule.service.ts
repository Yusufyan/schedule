import { getManager } from "typeorm";
import { ScheduleDTO } from "../dtos/schedule.dto";
import { differenceInDays, parseISO } from "date-fns";
import { Schedule } from "../models/schedule.model";
import { getDateRange } from "../utils/common.util";
import moment from "moment";
import { Doctor } from "../models/mst-doctor.model";

export async function addScheduleService(dto: ScheduleDTO) {
  const entityManager = getManager()

  const getDoctor = await entityManager.findOne(Doctor, {
    where: { doctor_name: dto.doctorName }
  })

  const dateRange = dto.date_range.split(' ')

  const startDate = new Date(dateRange[0])
  const endDate = new Date(dateRange[2])

  const startDateStr = parseISO(dateRange[0])
  const endDateStr = parseISO(dateRange[2])

  const interval = differenceInDays(endDateStr, startDateStr)
  
  const intervalDate = getDateRange(startDate, endDate)

  for (let index = 0; index <= interval; index++) {
    let day = moment(intervalDate[index])
    let dayName = day.format('dddd')
    moment.locale('id')

    await entityManager.save(Schedule, {
      doctors: getDoctor,
      day: dayName === 'Sunday' ? 'Minggu' : dayName,
      time_start: dto.timeStart,
      time_end: dto.timeEnd,
      quota: dto.quota,
      status: dto.status,
      date: intervalDate[index]
    })
  }

  return
}

export async function getScheduleService() {
  const entityManager = getManager()
  const getData = await entityManager.find(Schedule, {
    relations: ["doctors"],
    select: {
      doctors: {
        id: true,
        doctor_name: true
      }
    }
  })

  return getData
}

