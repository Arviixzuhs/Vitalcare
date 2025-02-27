import { ClinicalStaff } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { ClinicalStaffDto } from './dto/clinical-staff.dto'
import { EditClinicalStaffDto } from './dto/edit-clinical-staff.dto'
import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common'

@Injectable()
export class ClinicalStaffService {
  constructor(private prisma: PrismaService) {}

  async createClinicalStaff(data: ClinicalStaffDto): Promise<ClinicalStaff> {
    const existingStaff = await this.prisma.clinicalStaff.findUnique({
      where: {
        CI: data.CI,
      },
    })

    if (existingStaff) {
      throw new BadRequestException('Ese personal clínico ya está registrado')
    }

    return this.prisma.clinicalStaff.create({
      data,
    })
  }

  getClinicalStaffById(id: number): Promise<ClinicalStaff> {
    return this.prisma.clinicalStaff.findUnique({
      where: {
        id,
      },
    })
  }

  getAllClinicalStaff(startDate?: string, endDate?: string): Promise<ClinicalStaff[]> {
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

    return this.prisma.clinicalStaff.findMany({
      where: {
        AND: [dateFilter],
      },
    })
  }

  async updateClinicalStaff(id: number, data: EditClinicalStaffDto): Promise<ClinicalStaff> {
    const clinicalStaff = await this.getClinicalStaffById(id)
    if (!clinicalStaff)
      throw new HttpException('Usuario del personal médico no encontrado.', HttpStatus.NOT_FOUND)

    try {
      return this.prisma.clinicalStaff.update({
        where: {
          id,
        },
        data,
      })
    } catch (error) {
      throw new BadRequestException('Error al actualizar al usuario del personal médico.')
    }
  }

  async searchClinicalStaffByName(searchValue: string): Promise<ClinicalStaff[]> {
    const searchTerms = searchValue.trim().toLowerCase().split(/\s+/)

    return this.prisma.clinicalStaff.findMany({
      where: {
        OR: [
          searchTerms.length > 1
            ? {
                AND: searchTerms.map((term) => ({
                  OR: [{ name: { contains: term } }, { lastName: { contains: term } }],
                })),
              }
            : {},
          searchTerms.length === 1
            ? {
                OR: [{ name: { contains: searchValue } }, { lastName: { contains: searchValue } }],
              }
            : {},
          { CI: searchValue },
          { email: searchValue },
        ],
      },
    })
  }

  async getClinicalStaffCountByDate(): Promise<{ time: string; value: number }[]> {
    const clinicalStaffCount = await this.prisma.clinicalStaff.findMany({
      select: {
        createdAt: true,
      },
    })

    const counts: { [key: string]: number } = {}

    clinicalStaffCount.forEach((clinicalStaff) => {
      const date = clinicalStaff.createdAt.toISOString().split('T')[0]

      counts[date] = (counts[date] || 0) + 1
    })

    return Object.keys(counts).map((date) => ({
      time: date,
      value: counts[date],
    }))
  }

  async deleteClinicalStaff(id: number): Promise<ClinicalStaff> {
    const clinicalStaff = await this.getClinicalStaffById(id)
    if (!clinicalStaff)
      throw new HttpException('Usuario del personal médico no encontrado', HttpStatus.NOT_FOUND)

    try {
      return this.prisma.clinicalStaff.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      throw new BadRequestException('Error al borrar la consulta.')
    }
  }
}
