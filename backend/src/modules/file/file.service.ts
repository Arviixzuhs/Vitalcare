import * as fs from 'fs'
import { join } from 'path'
import { config } from 'dotenv'
import { Injectable } from '@nestjs/common'

config()
@Injectable()
export class FileService {
  // Ruta base de almacenamiento
  private readonly uploadPath = './uploads'

  generateFileUrl(filename: string): string {
    const { HOST, PORT } = process.env
    return `http://${HOST}:${PORT}/uploads/${filename}`
  }

  deleteFile(filename: string): void {
    const filePath = join(this.uploadPath, filename)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    } else {
      throw new Error('File not found')
    }
  }

  validateFileType(file: Express.Multer.File, allowedTypes: string[]): void {
    const fileType = file.mimetype
    if (!allowedTypes.includes(fileType)) {
      throw new Error(`Invalid file type. Allowed types are: ${allowedTypes.join(', ')}`)
    }
  }

  saveFile(file: Express.Multer.File, directory: string = this.uploadPath): string {
    const filePath = join(directory, file.filename)
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }
    fs.writeFileSync(filePath, file.buffer)
    return filePath
  }
}
