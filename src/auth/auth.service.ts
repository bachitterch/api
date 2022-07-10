import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  logIn() {
    return { res: 'Hello' }
  }
  signUp() {
    return { res: 'Welcome' }
  }
}
