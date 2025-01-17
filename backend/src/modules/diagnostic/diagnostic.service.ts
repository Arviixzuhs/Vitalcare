import { Injectable } from '@nestjs/common'
import { Diagnostic } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto'
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto'

@Injectable()
export class DiagnosticService {
  constructor(private prisma: PrismaService) {}

  createDiagnostic(data: CreateDiagnosticDto): Promise<Diagnostic> {
    return this.prisma.diagnostic.create({
      data,
    })
  }

  findAllDiagnosticsByPatientId(patientId: number): Promise<Diagnostic[]> {
    return this.prisma.diagnostic.findMany({
      where: { patientId },
    })
  }

  findDiagnosticById(id: number): Promise<Diagnostic> {
    return this.prisma.diagnostic.findFirst({
      where: { id },
    })
  }

  updateDiagnostic(id: number, data: UpdateDiagnosticDto): Promise<Diagnostic> {
    return this.prisma.diagnostic.update({
      where: {
        id,
      },
      data,
    })
  }

  deleteDiagnostic(id: number): Promise<Diagnostic> {
    return this.prisma.diagnostic.delete({
      where: {
        id,
      },
    })
  }
}
