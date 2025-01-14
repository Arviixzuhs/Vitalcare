import { ClinicalStaff } from '@prisma/client'
import { ClinicalStaffDto } from './dto/clinical-staff.dto'
import { ClinicalStaffService } from './clinicalStaff.service'
import { EditClinicalStaffDto } from './dto/edit-clinical-staff.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { SearchClinicalStaffDto } from './dto/search-clinical-staff.dto'
import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Query,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common'

@Controller('/clinicalstaff')
@ApiTags('Clinical staff')
@ApiBearerAuth()
export class ClinicalStaffController {
  constructor(private readonly clinicalStaffService: ClinicalStaffService) {}

  @Post('/create')
  register(@Body() data: ClinicalStaffDto): Promise<ClinicalStaff> {
    return this.clinicalStaffService.createClinicalStaff(data)
  }

  @Get('/get/:id')
  getById(@Param('id') id: string): Promise<ClinicalStaff> {
    return this.clinicalStaffService.getClinicalStaffById(Number(id))
  }

  @Get('/get-all')
  getAll(): Promise<ClinicalStaff[]> {
    return this.clinicalStaffService.getAllClinicalStaff()
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string): Promise<ClinicalStaff> {
    return this.clinicalStaffService.deleteClinicalStaff(Number(id))
  }

  @Get('/count-by-date')
  getClinicalStaffByDate(): Promise<{ time: string; value: number }[]> {
    return this.clinicalStaffService.getClinicalStaffCountByDate()
  }

  @Get('/search-by-name')
  searchPatientByName(@Query() query: SearchClinicalStaffDto): Promise<ClinicalStaff[]> {
    return this.clinicalStaffService.searchClinicalStaffByName(query.name)
  }

  @Patch('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditClinicalStaffDto,
  ): Promise<ClinicalStaff> {
    return this.clinicalStaffService.updateClinicalStaff(id, data)
  }
}
