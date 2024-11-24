import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AppController } from 'src/app.controller'
import { ConsultModule } from './modules/consult/consult.module'
import { PatientModule } from './modules/patient/patient.module'
import { AuthMiddleware } from 'src/middlewares/auth.middleware'
import { UserController } from './modules/user/user.controller'
import { HospitalModule } from './modules/hospital/hospital.module'
import { PatientController } from './modules/patient/patient.controller'
import { ConsultController } from './modules/consult/consult.controller'
import { HospitalController } from './modules/hospital/hospital.controller'
import { ClinicalStaffModule } from './modules/clinicalStaff/clinicalStaff.module'
import { RequestLoggerMiddleware } from './middlewares/request.logger.middleware'
import { ClinicalStaffController } from './modules/clinicalStaff/clinicalStaff.controller'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    HospitalModule,
    ConsultModule,
    ClinicalStaffModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        UserController,
        HospitalController,
        ConsultController,
        ClinicalStaffController,
        PatientController,
      )
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}
