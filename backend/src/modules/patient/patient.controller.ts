import { PatientDto } from './dto/patient.dto'
import { PatientService } from './patient.service'
import { EditPatientDto } from './dto/edit-patient.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common'

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
  getUserById(@Param('id') id: string) {
    return this.patientService.getPatientById(Number(id))
  }

  @Get('/get-all')
  getAllUsers() {
    return this.patientService.getAllPatients()
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.patientService.deletePatient(Number(id))
  }

  @Put('/update/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: EditPatientDto) {
    return this.patientService.updatePatient(id, data)
  }
}
