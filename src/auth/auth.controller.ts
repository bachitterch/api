import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  logIn(@Body() dto: AuthDto) {
    return this.authService.logIn(dto)
  }

  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto)
  }
}
