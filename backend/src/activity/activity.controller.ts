import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ActivityService } from "./activity.service";
import { CurrentUser } from "../common/decorators/current-user.decorator";

@ApiTags("活动")
@Controller({ path: "activities", version: "1" })
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "发布活动" })
  create(
    @CurrentUser("id") userId: string,
    @Body() data: {
      title: string;
      description?: string;
      coverImage?: string;
      eventTime?: string;
      location?: string;
      price?: number;
    }
  ) {
    return this.activityService.create(userId, data);
  }

  @Get("teacher/:teacherId")
  @ApiOperation({ summary: "查看老师的所有活动" })
  listByTeacher(@Param("teacherId") teacherId: string) {
    return this.activityService.listByTeacher(teacherId);
  }

  @Get(":id")
  @ApiOperation({ summary: "查看活动详情" })
  getById(@Param("id") id: string) {
    return this.activityService.getById(id);
  }
}
