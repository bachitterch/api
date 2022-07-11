import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as argon from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto } from './dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async logIn(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (!user) throw new ForbiddenException('Credentails Incorrect')

    const pwMatch = await argon.verify(user.hash, dto.password)

    if (!pwMatch) throw new ForbiddenException('Credentails Incorrect')

    delete user.hash

    return user
  }
  async signUp(dto: AuthDto) {
    const hash = await argon.hash(dto.password)

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      })

      delete user.hash

      return user
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credentails already taken! ')
        }
      }

      throw err
    }
  }
}
