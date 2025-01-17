import * as path from 'path'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateFileDto } from './dto/create-file.dto'
import { FileEntity, Prisma } from '@prisma/client'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

@Injectable()
export class DriveService {
  constructor(private prisma: PrismaService) { }

  deleteMany(): Prisma.PrismaPromise<Prisma.BatchPayload> {
    return this.prisma.fileEntity.deleteMany()
  }

  findMany(): Promise<FileEntity[]> {
    return this.prisma.fileEntity.findMany()
  }

  createFile(data: CreateFileDto): Promise<FileEntity> {
    return this.prisma.fileEntity.create({
      data,
    })
  }

  getFileById(id: number): Promise<FileEntity> {
    return this.prisma.fileEntity.findUnique({
      where: {
        id,
      },
    })
  }

  async getFilesByFolder(folderPath: string): Promise<FileEntity[]> {
    const normalizedFolderPath = folderPath.endsWith('/') ? folderPath : `${folderPath}/`

    const files = await this.prisma.fileEntity.findMany({
      where: {
        path: {
          startsWith: normalizedFolderPath,
        },
      },
    })

    return files.filter((file) => {
      // Quitar el folderPath base
      const relativePath = file.path.replace(normalizedFolderPath, '')

      // Excluir si tiene más de un nivel
      return !relativePath.includes('/')
    })
  }

  async renameFile(id: number, newName: string): Promise<FileEntity> {
    const file = await this.getFileById(id)
    if (!file) throw new HttpException('Archivo no encontrado.', HttpStatus.NOT_FOUND)

    const oldPath = file.path

    // Normalizamos el oldPath con "/" al final
    const normalizedOldPath = (oldPath.endsWith('/') ? oldPath : path.join(oldPath, '/')).replace(
      /\\/g,
      '/',
    )

    // Calculamos el nuevo path y lo normalizamos a "/"
    const newPath = path.join(path.dirname(normalizedOldPath), newName).replace(/\\/g, '/')

    // Verificar si el nuevo path ya está siendo utilizado por otro archivo
    const conflictingFile = await this.prisma.fileEntity.findFirst({
      where: {
        path: newPath,
      },
    })
    if (conflictingFile) {
      throw new HttpException('Ya existe un archivo con este path.', HttpStatus.BAD_REQUEST)
    }

    // Si es una carpeta, actualizamos todos los archivos dentro de la carpeta
    if (file.isFolder) {
      // Actualizamos los archivos dentro de la carpeta
      const filesInFolder = await this.getFilesByFolder(oldPath)
      const newFolderPath = path.join(path.dirname(normalizedOldPath), newName).replace(/\\/g, '/')

      for (const f of filesInFolder) {
        // Verificamos que no estamos cambiando el path a sí mismo en caso de que se renombre una carpeta interna
        if (f.id !== id) {
          const newFilePath = f.path.replace(oldPath, newFolderPath).replace(/\\/g, '/')
          await this.prisma.fileEntity.update({
            where: { id: f.id },
            data: { path: newFilePath },
          })
        }
      }
    }

    // Renombramos el archivo o carpeta en sí
    const renamedFile = await this.prisma.fileEntity.update({
      where: { id },
      data: {
        name: newName,
        path: newPath,
      },
    })

    return renamedFile
  }

  async deleteFile(id: number): Promise<FileEntity> {
    const file = await this.getFileById(id)
    if (!file) throw new HttpException('Archivo no encontrado.', HttpStatus.NOT_FOUND)

    try {
      return this.prisma.fileEntity.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      throw new HttpException('Error al eliminar archivo.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
