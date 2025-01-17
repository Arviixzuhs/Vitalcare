import { join } from 'path'
import { NoteModule } from './modules/note/note.module'
import { FileModule } from './modules/file/file.module'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { DriveModule } from './modules/drive/drive.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AppController } from 'src/app.controller'
import { ConsultModule } from './modules/consult/consult.module'
import { PatientModule } from './modules/patient/patient.module'
import { FileController } from './modules/file/file.controller'
import { AuthMiddleware } from 'src/middlewares/auth.middleware'
import { UserController } from './modules/user/user.controller'
import { NoteController } from './modules/note/note.controller'
import { HospitalModule } from './modules/hospital/hospital.module'
import { DriveController } from './modules/drive/drive.controller'
import { DiagnosticModule } from './modules/diagnostic/diagnostic.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { PatientController } from './modules/patient/patient.controller'
import { ConsultController } from './modules/consult/consult.controller'
import { HospitalController } from './modules/hospital/hospital.controller'
import { ClinicalStaffModule } from './modules/clinicalStaff/clinicalStaff.module'
import { DiagnosticController } from './modules/diagnostic/diagnostic.controller'
import { RequestLoggerMiddleware } from './middlewares/request.logger.middleware'
import { ClinicalStaffController } from './modules/clinicalStaff/clinicalStaff.controller'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({
  imports: [
    NoteModule,
    FileModule,
    AuthModule,
    UserModule,
    DriveModule,
    PrismaModule,
    ConsultModule,
    PatientModule,
    HospitalModule,
    DiagnosticModule,
    ClinicalStaffModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        setHeaders: (res, path) => {
          // Forzar la descarga para todos los archivos
          const fileName = path.split('/').pop()
          const fileExtension = fileName.split('.').pop()
          res.set({
            'Content-Disposition': `attachment; filename="descarga.${fileExtension}"`,
            'Content-Type': 'application/octet-stream',
          })
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        NoteController,
        FileController,
        UserController,
        DriveController,
        ConsultController,
        PatientController,
        HospitalController,
        DiagnosticController,
        ClinicalStaffController,
      )
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}
