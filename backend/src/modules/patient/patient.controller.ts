import { PatientDto } from './dto/patient.dto'
import { PatientService } from './patient.service'
import { EditPatientDto } from './dto/edit-patient.dto'
import { SearchPatientDto } from './dto/search-patient.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Get, Put, Post, Body, Param, Query, Delete, Controller } from '@nestjs/common'

@Controller('/patient')
@ApiTags('Patient')
@ApiBearerAuth()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/register')
  register(@Body() data: PatientDto) {
    return this.patientService.patientRegister(data)
  }

  @Get('/get/:id')
  getUserById(@Param('id') id: number) {
    return this.patientService.getPatientById(id)
  }

  @Get('/get-all')
  getAllUsers() {
    return this.patientService.getAllPatients()
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: number) {
    return this.patientService.deletePatient(id)
  }

  @Get('/count-by-date')
  getPatientsCountByDate() {
    return this.patientService.getPatientsCountByDate()
  }

  @Get('/count-by-gender')
  getPatientsCountByGender() {
    return this.patientService.getPatientsCountByGender()
  }

  @Get('/search-by-name')
  searchPatientByName(@Query() query: SearchPatientDto) {
    return this.patientService.searchPatientByName(query.name)
  }

  @Put('/update/:id')
  updateUser(@Param('id') id: number, @Body() data: EditPatientDto) {
    return this.patientService.updatePatient(id, data)
  }
}
