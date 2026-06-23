import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { StreetClaimService } from "./street-claim.service";
import { CurrentUser } from "../common/decorators/current-user.decorator";

@ApiTags("街道认领")
@Controller({ path: "claims", version: "1" })
export class StreetClaimController {
  constructor(private claimService: StreetClaimService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "认领街道" })
  claim(
    @CurrentUser("id") userId: string,
    @Body() data: {
      instrumentName: string;
      streetName: string;
      district?: string;
      city?: string;
      province?: string;
      lat?: number;
      lng?: number;
    }
  ) {
    return this.claimService.claim(userId, data);
  }

  @Get("nearby")
  @ApiOperation({ summary: "查询附近老师" })
  nearby(
    @Query("lat") lat: number,
    @Query("lng") lng: number,
    @Query("radius") radius?: number
  ) {
    return this.claimService.findNearby(lat, lng, radius || 5000);
  }

  @Get("search")
  @ApiOperation({ summary: "按街道或乐器搜索" })
  search(
    @Query("q") query: string,
    @Query("lat") lat?: number,
    @Query("lng") lng?: number
  ) {
    return this.claimService.search(query, lat, lng);
  }

  @Get(":id")
  @ApiOperation({ summary: "查看认领详情" })
  getById(@Param("id") id: string) {
    return this.claimService.getById(id);
  }
}
