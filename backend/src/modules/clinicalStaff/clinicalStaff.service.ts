import { ClinicalStaff } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { ClinicalStaffDto } from './dto/clinical-staff.dto'
import { EditClinicalStaffDto } from './dto/edit-clinical-staff.dto'
import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common'

@Injectable()
export class ClinicalStaffService {
  constructor(private prisma: PrismaService) {}

  async createClinicalStaff(data: ClinicalStaffDto) {
    const existingStaff = await this.prisma.clinicalStaff.findUnique({
      where: {
        CI: data.CI,
      },
    })

    if (existingStaff) {
      throw new BadRequestException('Ese personal clínico ya está registrado')
    }

    return await this.prisma.clinicalStaff.create({
      data: {
        CI: data.CI,
        age: data.age,
        area: data.area,
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatar: data.avatar,
        gender: data.gender,
        address: data.address,
        lastName: data.lastName,
        egresados: data.egresados,
        jubilados: data.jubilados,
        placaCarro: data.placaCarro,
        numeroHijos: data.numeroHijos,
        tallaCamisas: data.tallaCamisas,
        dependencias: data.dependencias,
        cargoNominal: data.cargoNominal,
      },
    })
  }

  async getClinicalStaffById(id: number): Promise<ClinicalStaff> {
    return await this.prisma.clinicalStaff.findUnique({
      where: {
        id,
      },
    })
  }

  async getAllClinicalStaff(): Promise<ClinicalStaff[]> {
    return this.prisma.clinicalStaff.findMany()
  }

  async updateClinicalStaff(id: number, data: EditClinicalStaffDto) {
    const clinicalStaff = await this.getClinicalStaffById(id)
    if (!clinicalStaff)
      throw new HttpException('Usuario del personal médico no encontrado.', HttpStatus.NOT_FOUND)

    try {
      await this.prisma.clinicalStaff.update({
        where: {
          id,
        },
        data,
      })
      return 'Usuario del personal médico actualizdo correctamente.'
    } catch (error) {
      throw new BadRequestException('Error al actualizar al usuario del personal médico.')
    }
  }

  async deleteClinicalStaff(id: number) {
    const clinicalStaff = await this.getClinicalStaffById(id)
    if (!clinicalStaff)
      throw new HttpException('Usuario del personal médico no encontrado', HttpStatus.NOT_FOUND)

    try {
      await this.prisma.clinicalStaff.delete({
        where: {
          id,
        },
      })

      return 'Usuario borrado del personal médico.'
    } catch (error) {
      throw new BadRequestException('Error al borrar la consulta.')
    }
  }
}
