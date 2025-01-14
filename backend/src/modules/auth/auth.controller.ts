import { User } from '@prisma/client'
import { ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { AuthService } from './auth.service'
import { Controller, Post, Body, Get, Param } from '@nestjs/common'

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('/register')
  register(@Body() data: RegisterDto): Promise<User> {
    return this.appService.userRegister(data)
  }

  @Post('/login')
  login(@Body() data: LoginDto): Promise<String> {
    return this.appService.userLogin(data)
  }

  @Get('/load/profile/:token')
  loadProfile(@Param('token') token: string): Promise<User> {
    return this.appService.loadUserByToken(token)
  }
}
