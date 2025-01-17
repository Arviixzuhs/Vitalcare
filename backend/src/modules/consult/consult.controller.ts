import { Consult } from '@prisma/client'
import { ConsultDto } from './dto/consult.dto'
import { ConsultService } from './consult.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

@Controller('/consult')
@ApiTags('Consult')
@ApiBearerAuth()
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}

  @Post('/create')
  createConsult(@Body() data: ConsultDto): Promise<Consult> {
    return this.consultService.createConsult(data)
  }

  @Get('/get/:id')
  getConsultById(@Param('id') id: number): Promise<Consult> {
    return this.consultService.getConsultById(id)
  }

  @Get('/get-all')
  getAllConsults(): Promise<Consult[]> {
    return this.consultService.getAllConsults()
  }

  @Delete('/delete/:id')
  deleteConsult(@Param('id') id: number): Promise<Consult> {
    return this.consultService.deleteConsult(id)
  }

  @Get('/get-all-by-patient-id/:id')
  getAllConsultsByPatientId(@Param('id') id: number): Promise<Consult[]> {
    return this.consultService.getAllConsultsByPatientId(id)
  }

  @Get('/search-by-patient-dni/:ci')
  serchConsultByPatientCI(@Param('ci') ci: string): Promise<Consult[]> {
    return this.consultService.searchConsultByPatientCI(ci)
  }

  @Put('/update/:id')
  updateConsult(@Param('id') id: string, @Body() data: ConsultDto): Promise<Consult> {
    return this.consultService.updateConsult(Number(id), data)
  }
}
