import { Consult } from '@prisma/client'
import { ConsultDto } from './dto/consult.dto'
import { ConsultService } from './consult.service'
import { SearchConsultDto } from './dto/search-consult.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { FindAllConsultByMonthAndYearDto } from './dto/find-all-consults-by-month-and-year.dto'
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'

@Controller('/consult')
@ApiTags('Consult')
@ApiBearerAuth()
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}

  @Get('/find-all-to-day')
  getAllConsultsToDay(): Promise<Consult[]> {
    return this.consultService.findAllConsultsToDay()
  }

  @Get('/find-all-by-month-and-year')
  findAllConsultsByMonthAndYear(@Query() query: FindAllConsultByMonthAndYearDto) {
    return this.consultService.findAllConsultsByMonthAndYear(query)
  }

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

  @Get('/search/')
  serchConsultByPatientCI(@Query() query: SearchConsultDto): Promise<Consult[]> {
    return this.consultService.searchConsultByPatient(query)
  }

  @Put('/update/:id')
  updateConsult(@Param('id') id: string, @Body() data: ConsultDto): Promise<Consult> {
    return this.consultService.updateConsult(Number(id), data)
  }
}
