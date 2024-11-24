import { Patient } from '@prisma/client'
import { PatientDto } from './dto/patient.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { EditPatientDto } from './dto/edit-patient.dto'
import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common'

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async patientRegister(data: PatientDto) {
    const patient = await this.prisma.patient.findUnique({
      where: {
        CI: data.CI,
      },
    })

    if (patient) throw new BadRequestException('Ese paciente ya está registrado')

    return await this.prisma.patient.create({
      data: {
        CI: data.CI,
        age: data.age,
        name: data.name,
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

  async getPatientById(id: number): Promise<Patient> {
    return this.prisma.patient.findUnique({
      where: {
        id,
      },
    })
  }

  async getAllPatients(): Promise<Patient[]> {
    return await this.prisma.patient.findMany()
  }

  async updatePatient(id: number, data: EditPatientDto) {
    const patient = await this.getPatientById(id)

    if (!patient) throw new HttpException('Paciente no encontrado', HttpStatus.NOT_FOUND)

    try {
      return await this.prisma.patient.update({
        where: {
          id,
        },
        data,
      })
    } catch (error) {
      throw new BadRequestException('Error al actualizar al paciente')
    }
  }

  async deletePatient(id: number) {
    const user = await this.getPatientById(id)

    if (!user) {
      throw new HttpException('Paciente no encontrado', HttpStatus.NOT_FOUND)
    }

    try {
      return await this.prisma.patient.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      throw new BadRequestException('Error al borrar al paciente')
    }
  }
}
