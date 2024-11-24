import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description: 'El correo electrónico del usuario.',
  })
  @IsEmail({}, { message: 'El correo debe ser un correo electrónico válido.' })
  email: string

  @ApiProperty({
    example: 'contraseñaSegura123',
    description: 'La contraseña del usuario.',
  })
  @IsNotEmpty({ message: 'La contraseña no debe estar vacía.' })
  @IsString()
  password: string
}
