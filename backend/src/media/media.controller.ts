import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { CurrentUser } from "../common/decorators/current-user.decorator";

@ApiTags("媒体文件")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller({ path: "media", version: "1" })
export class MediaController {
  constructor() {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  @ApiOperation({ summary: "上传文件（图片/视频）" })
  upload(
    @CurrentUser("id") userId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) throw new BadRequestException("请选择文件");
    // ⚠ 开发阶段：返回文件信息
    // 生产环境：上传到阿里云 OSS 并返回 URL
    return {
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      message: "文件上传待接入 OSS",
    };
  }
}
