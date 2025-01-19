import { ConsultDto } from './dto/consult.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Consult, PrismaPromise } from '@prisma/client'
import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common'

@Injectable()
export class ConsultService {
  constructor(private prisma: PrismaService) {}

  findAllConsultsToDayCount(): PrismaPromise<number> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    return this.prisma.consult.count({
      where: {
        date: {
          gte: today.toISOString(),
          lt: tomorrow.toISOString(),
        },
      },
    })
  }

  findAllConsultsToDay(): Promise<Consult[]> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    return this.prisma.consult.findMany({
      where: {
        date: {
          gte: today.toISOString(),
          lt: tomorrow.toISOString(),
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

  async searchConsultByPatient(searchValue: string): Promise<Consult[]> {
    const searchTerms = searchValue.trim().toLowerCase().split(' ')

    return this.prisma.consult.findMany({
      where: {
        OR: [
          ...searchTerms.map((term) => ({
            patient: {
              name: {
                contains: term,
              },
            },
          })),
          ...searchTerms.map((term) => ({
            patient: {
              lastName: {
                contains: term,
              },
            },
          })),
          {
            patient: {
              CI: {
                contains: searchValue.toLowerCase(),
              },
            },
          },
        ],
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
