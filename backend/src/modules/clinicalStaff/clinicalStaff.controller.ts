import { ClinicalStaffDto } from './dto/clinical-staff.dto'
import { ClinicalStaffService } from './clinicalStaff.service'
import { EditClinicalStaffDto } from './dto/edit-clinical-staff.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { SearchClinicalStaffDto } from './dto/search-clinical-staff.dto'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'

@Controller('/clinicalstaff')
@ApiTags('Clinical staff')
@ApiBearerAuth()
export class ClinicalStaffController {
  constructor(private readonly clinicalStaffService: ClinicalStaffService) {}

  @Post('/create')
  register(@Body() data: ClinicalStaffDto) {
    return this.clinicalStaffService.createClinicalStaff(data)
  }

  @Get('/get/:id')
  getById(@Param('id') id: string) {
    return this.clinicalStaffService.getClinicalStaffById(Number(id))
  }

  @Get('/get-all')
  getAll() {
    return this.clinicalStaffService.getAllClinicalStaff()
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.clinicalStaffService.deleteClinicalStaff(Number(id))
  }

  @Get('/search-by-name')
  searchPatientByName(@Query() query: SearchClinicalStaffDto) {
    return this.clinicalStaffService.searchClinicalStaffByName(query.name)
  }

  @Put('/update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: EditClinicalStaffDto) {
    return this.clinicalStaffService.updateClinicalStaff(id, data)
  }
}
