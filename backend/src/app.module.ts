import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { TeacherModule } from "./teacher/teacher.module";
import { StreetClaimModule } from "./street-claim/street-claim.module";
import { ActivityModule } from "./activity/activity.module";
import { MediaModule } from "./media/media.module";
import { MapModule } from "./map/map.module";
import { ProductModule } from "./product/product.module";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    TeacherModule,
    StreetClaimModule,
    ActivityModule,
    MediaModule,
    MapModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}