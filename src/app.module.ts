import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { BookmarksModule } from './bookmarks/bookmarks.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
@Module({
  imports: [AuthModule, BookmarksModule, PrismaModule, UserModule],
})
export class AppModule {}
