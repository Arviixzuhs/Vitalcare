import { Patient } from '@prisma/client'
import { PatientDto } from './dto/patient.dto'
import { PatientService } from './patient.service'
import { EditPatientDto } from './dto/edit-patient.dto'
import { SearchPatientDto } from './dto/search-patient.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Get, Put, Post, Body, Param, Query, Delete, Controller } from '@nestjs/common'
import { FindAllPatientsDto } from './dto/find-all-patients.dto'

@Controller('/patient')
@ApiTags('Patient')
@ApiBearerAuth()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/register')
  register(@Body() data: PatientDto): Promise<Patient> {
    return this.patientService.patientRegister(data)
  }

  @Get('/get/:id')
  getUserById(@Param('id') id: number): Promise<Patient> {
    return this.patientService.getPatientById(id)
  }

  @Get('/get-all')
  getAllUsers(@Query() query: FindAllPatientsDto): Promise<Patient[]> {
    return this.patientService.getAllPatients(query.startDate, query.endDate)
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: number): Promise<Patient> {
    return this.patientService.deletePatient(id)
  }

  @Get('/count-by-date')
  getPatientsCountByDate(): Promise<{ time: string; value: number }[]> {
    return this.patientService.getPatientsCountByDate()
  }

  @Get('/count-by-gender')
  getPatientsCountByGender(): Promise<{ gender: string; count: number }[]> {
    return this.patientService.getPatientsCountByGender()
  }

  @Get('/search-by-name')
  searchPatientByName(@Query() query: SearchPatientDto): Promise<Patient[]> {
    return this.patientService.searchPatientByName(query.name, query.startDate, query.endDate)
  }

  @Put('/update/:id')
  updateUser(@Param('id') id: number, @Body() data: EditPatientDto): Promise<Patient> {
    return this.patientService.updatePatient(id, data)
  }
}
