import { FileEntity, Prisma } from '@prisma/client'
import { DriveService } from './drive.service'
import { CreateFileDto } from './dto/create-file.dto'
import { RenameFileDto } from './dto/rename-file.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'

@Controller('/drive')
@ApiTags('Drive')
@ApiBearerAuth()
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  @Post('/create-file')
  create(@Body() createFileDto: CreateFileDto): Promise<FileEntity> {
    return this.driveService.createFile(createFileDto)
  }

  @Delete('/delete-many')
  deleteMany(): Prisma.PrismaPromise<Prisma.BatchPayload> {
    return this.driveService.deleteMany()
  }

  @Get('/find-many')
  findMany(): Promise<FileEntity[]> {
    return this.driveService.findMany()
  }

  @Get('/find-file-by-id:id')
  getById(@Param('id') id: number): Promise<FileEntity> {
    return this.driveService.getFileById(id)
  }

  @Get('/find-files-by-folder-path')
  getFilesByFolder(@Query('path') path: string): Promise<FileEntity[]> {
    return this.driveService.getFilesByFolder(path)
  }

  @Put('/rename-file/:id')
  rename(@Param('id') id: number, @Body() renameFileDto: RenameFileDto): Promise<FileEntity> {
    return this.driveService.renameFile(id, renameFileDto.newName)
  }

  @Delete('/delete-file/:id')
  delete(@Param('id') id: number): Promise<FileEntity> {
    return this.driveService.deleteFile(id)
  }
}
