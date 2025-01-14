import { HospitalService } from './hospital.service'
import { Get, Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller('/hospital')
@ApiTags('Hospital')
@ApiBearerAuth()
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Get('/get-stats')
  getAllUsers(): Promise<{
    rooms: number
    consults: number
    patients: number
    clinicalStaffs: number
  }> {
    return this.hospitalService.getInfo()
  }
}
