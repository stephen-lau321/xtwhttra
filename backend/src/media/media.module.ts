import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { MediaController } from "./media.controller";
import { memoryStorage } from "multer";

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
      limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    }),
  ],
  controllers: [MediaController],
})
export class MediaModule {}
