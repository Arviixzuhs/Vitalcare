import { Consult } from '@prisma/client'
import { ConsultDto } from './dto/consult.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common'

@Injectable()
export class ConsultService {
  constructor(private prisma: PrismaService) {}

  createConsult(data: ConsultDto): Promise<Consult> {
    const consultDate = new Date(data.date)
    return this.prisma.consult.create({
      data: {
        ...data,
        date: consultDate.toISOString(),
      },
      include: {
        doctor: {
          select: {
            CI: true,
            name: true,
            lastName: true,
          },
        },
        patient: {
          select: {
            CI: true,
            name: true,
            lastName: true,
          },
        },
      },
    })
  }

  getConsultById(id: number): Promise<Consult> {
    return this.prisma.consult.findUnique({
      where: {
        id,
      },
    })
  }

  getAllConsultsByPatientId(patientId: number): Promise<Consult[]> {
    return this.prisma.consult.findMany({
      where: {
        patientId,
      },
      include: {
        patient: {
          select: {
            name: true,
            lastName: true,
          },
        },
        doctor: {
          select: {
            name: true,
            lastName: true,
          },
        },
      },
    })
  }

  getAllConsults(): Promise<Consult[]> {
    return this.prisma.consult.findMany({
      include: {
        patient: {
          select: {
            name: true,
            lastName: true,
          },
        },
        doctor: {
          select: {
            name: true,
            lastName: true,
          },
        },
      },
    })
  }

  async updateConsult(id: number, data: ConsultDto): Promise<Consult> {
    const consult = await this.getConsultById(id)
    if (!consult) throw new HttpException('Consulta médica no encontrada.', HttpStatus.NOT_FOUND)

    return this.prisma.consult.update({
      where: {
        id,
      },
      data,
    })
  }

  searchConsultByPatientCI(CI: string): Promise<Consult[]> {
    return this.prisma.consult.findMany({
      where: {
        patient: {
          CI,
        },
      },
      include: {
        patient: {
          select: {
            name: true,
            lastName: true,
          },
        },
        doctor: {
          select: {
            name: true,
            lastName: true,
          },
        },
      },
    })
  }

  async deleteConsult(id: number): Promise<Consult> {
    const consult = await this.getConsultById(id)
    if (!consult) throw new HttpException('Consulta médica no encontrada.', HttpStatus.NOT_FOUND)

    try {
      return this.prisma.consult.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      throw new BadRequestException('Error al borrar la consulta médica.')
    }
  }
}
