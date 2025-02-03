import { ConsultDto } from './dto/consult.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { SearchConsultDto } from './dto/search-consult.dto'
import { Consult, PrismaPromise } from '@prisma/client'
import { FindAllConsultByMonthAndYearDto } from './dto/find-all-consults-by-month-and-year.dto'
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

  findAllConsultsByMonthAndYear(query: FindAllConsultByMonthAndYearDto): Promise<Consult[]> {
    const month = Number(query.month)
    const year = Number(query.year)

    const startDate = new Date(year, month - 1, 1) // Primer día del mes
    const endDate = new Date(year, month, 0, 23, 59, 59, 999) // Último día del mes

    return this.prisma.consult.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
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

  async searchConsultByPatient(query: SearchConsultDto): Promise<Consult[]> {
    const { searchValue, startDate, endDate } = query

    const searchTerms = searchValue ? searchValue.trim().toLowerCase().split(' ') : []

    // Construcción de filtros de búsqueda por paciente y doctor
    const searchFilters =
      searchTerms.length > 0
        ? [
            {
              OR: [
                // Búsqueda por nombre del paciente
                ...searchTerms.map((term) => ({
                  patient: {
                    name: {
                      contains: term,
                    },
                  },
                })),
                // Búsqueda por apellido del paciente
                ...searchTerms.map((term) => ({
                  patient: {
                    lastName: {
                      contains: term,
                    },
                  },
                })),
                // Búsqueda por CI del paciente
                {
                  patient: {
                    CI: {
                      contains: searchValue?.toLowerCase(),
                    },
                  },
                },
                // Búsqueda por nombre del doctor
                ...searchTerms.map((term) => ({
                  doctor: {
                    name: {
                      contains: term,
                    },
                  },
                })),
                // Búsqueda por apellido del doctor
                ...searchTerms.map((term) => ({
                  doctor: {
                    lastName: {
                      contains: term,
                    },
                  },
                })),
                // Búsqueda por CI del doctor
                {
                  doctor: {
                    CI: {
                      contains: searchValue?.toLowerCase(),
                    },
                  },
                },
              ],
            },
          ]
        : []

    // Construcción de filtros por fecha de la consulta
    const dateFilters = [
      ...(startDate ? [{ date: { gte: new Date(startDate) } }] : []),
      ...(endDate ? [{ date: { lte: new Date(endDate) } }] : []),
    ]

    return this.prisma.consult.findMany({
      where: {
        AND: [...searchFilters, ...dateFilters],
      },
      include: {
        patient: {
          select: {
            name: true,
            lastName: true,
            CI: true,
          },
        },
        doctor: {
          select: {
            name: true,
            lastName: true,
            CI: true,
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
