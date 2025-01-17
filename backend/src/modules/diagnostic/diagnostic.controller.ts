import { Diagnostic } from '@prisma/client'
import { DiagnosticService } from './diagnostic.service'
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto'
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common'

@ApiTags('Diagnostic')
@ApiBearerAuth()
@Controller('diagnostic')
export class DiagnosticController {
  constructor(private readonly diagnosticService: DiagnosticService) {}

  @Post()
  createDiagnostic(@Body() createDiagnosticDto: CreateDiagnosticDto): Promise<Diagnostic> {
    return this.diagnosticService.createDiagnostic(createDiagnosticDto)
  }

  @Get('patient/:patientId')
  findAllDiagnosticsByPatientId(@Param('patientId') patientId: number): Promise<Diagnostic[]> {
    return this.diagnosticService.findAllDiagnosticsByPatientId(patientId)
  }

  @Get(':id')
  findDiagnosticById(@Param('id') id: number): Promise<Diagnostic> {
    return this.diagnosticService.findDiagnosticById(id)
  }

  @Patch(':id')
  updateDiagnostic(
    @Param('id') id: number,
    @Body() updateDiagnosticDto: UpdateDiagnosticDto,
  ): Promise<Diagnostic> {
    return this.diagnosticService.updateDiagnostic(id, updateDiagnosticDto)
  }

  @Delete(':id')
  deleteDiagnostic(@Param('id') id: number): Promise<Diagnostic> {
    return this.diagnosticService.deleteDiagnostic(id)
  }
}
