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
  register(@Body() data: ConsultDto) {
    return this.consultService.createConsult(data)
  }

  @Get('/get/:id')
  getUserById(@Param('id') id: string) {
    return this.consultService.getConsultById(Number(id))
  }

  @Get('/get-all')
  getAllConsults() {
    return this.consultService.getAllConsults()
  }

  @Delete('/delete/:id')
  deleteConsult(@Param('id') id: string) {
    return this.consultService.deleteConsult(Number(id))
  }

  @Get('/search-by-patient-dni/:ci')
  serchConsultByPatientCI(@Param('ci') ci: string) {
    return this.consultService.serchConsultByPatientCI(ci)
  }

  @Put('/update/:id')
  updateConsult(@Param('id') id: string, @Body() data: ConsultDto) {
    return this.consultService.updateConsult(Number(id), data)
  }
}
