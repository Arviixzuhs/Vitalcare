import { Patient } from '@prisma/client'
import { PatientDto } from './dto/patient.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { EditPatientDto } from './dto/edit-patient.dto'
import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common'

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async patientRegister(data: PatientDto): Promise<Patient> {
    const patient = await this.prisma.patient.findUnique({
      where: {
        CI: data.CI,
      },
    })

    if (patient) throw new BadRequestException('Ese paciente ya está registrado')

    return this.prisma.patient.create({
      data: {
        CI: data.CI,
        age: data.age,
        name: data.name,
        phone: data.phone,
        email: data.email,
        status: data.status,
        gender: data.gender,
        avatar: data.avatar,
        lastName: data.lastName,
        description: data.description,
        reasonEntry: data.reasonEntry,
        reasonDeath: data.reasonDeath,
      },
    })
  }

  async getPatientsCountByDate(): Promise<{ time: string; value: number }[]> {
    // Realizamos la consulta sin agrupar por fecha directamente
    const patientsCount = await this.prisma.patient.findMany({
      select: {
        createdAt: true,
      },
    })

    // Creamos un objeto para contar pacientes por fecha
    const counts: { [key: string]: number } = {}

    patientsCount.forEach((patient) => {
      // Extraemos la fecha sin la parte de la hora
      const date = patient.createdAt.toISOString().split('T')[0] // 'YYYY-MM-DD'

      // Contamos los pacientes por fecha
      counts[date] = (counts[date] || 0) + 1
    })

    // Convertimos el objeto counts a un arreglo de objetos
    return Object.keys(counts).map((date) => ({
      time: date,
      value: counts[date],
    }))
  }

  getPatientById(id: number): Promise<Patient> {
    return this.prisma.patient.findUnique({
      where: {
        id,
      },
    })
  }

  getAllPatients(startDate?: string, endDate?: string): Promise<Patient[]> {
    let dateFilter = {}

    if (startDate && endDate) {
      const gte = new Date(`${startDate}T00:00:00.000Z`)
      const lte = new Date(`${endDate}T23:59:59.999Z`)
      dateFilter = {
        createdAt: {
          gte,
          lte,
        },
      }
    }

    return this.prisma.patient.findMany({
      where: {
        AND: [dateFilter],
      },
    })
  }

  async updatePatient(id: number, data: EditPatientDto): Promise<Patient> {
    const patient = await this.getPatientById(id)

    if (!patient) throw new HttpException('Paciente no encontrado', HttpStatus.NOT_FOUND)

    return this.prisma.patient.update({
      where: {
        id,
      },
      data,
    })
  }

  async getPatientsCountByGender(): Promise<{ gender: string; count: number }[]> {
    const patientsByGender = await this.prisma.patient.groupBy({
      by: ['gender'],
      _count: {
        id: true,
      },
    })

    return patientsByGender.map((entry) => ({
      gender: entry.gender,
      count: entry._count.id,
    }))
  }

  async searchPatientByName(
    searchValue: string,
    startDate?: string,
    endDate?: string,
  ): Promise<Patient[]> {
    let dateFilter = {}

    if (startDate && endDate) {
      const gte = new Date(`${startDate}T00:00:00.000Z`)
      const lte = new Date(`${endDate}T23:59:59.999Z`)
      dateFilter = {
        createdAt: {
          gte,
          lte,
        },
      }
    }

    const searchTerms = searchValue.trim().toLowerCase().split(' ')

    return this.prisma.patient.findMany({
      where: {
        AND: [
          {
            OR: [
              ...searchTerms.map((term) => ({
                name: {
                  contains: term,
                },
              })),
              ...searchTerms.map((term) => ({
                lastName: {
                  contains: term,
                },
              })),
              {
                CI: {
                  contains: searchValue.toLowerCase(),
                },
              },
              {
                diagnostic: {
                  some: {
                    condition: {
                      contains: searchValue.toLowerCase(),
                    },
                  },
                },
              },
            ],
          },
          dateFilter,
        ].filter((condition) => Object.keys(condition).length > 0),
      },
    })
  }

  async deletePatient(id: number): Promise<Patient> {
    const patient = await this.getPatientById(id)
    if (!patient) throw new HttpException('Paciente no encontrado', HttpStatus.NOT_FOUND)

    return this.prisma.patient.delete({
      where: {
        id,
      },
    })
  }
}
