import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("地图/位置")
@Controller({ path: "map", version: "1" })
export class MapController {
  constructor() {}

  @Post("geocode")
  @ApiOperation({ summary: "逆地理编码（经纬度 → 地址）" })
  geocode(@Body("lat") lat: number, @Body("lng") lng: number) {
    // ⚠ 开发阶段：mock 返回
    // 生产环境：调用高德地图逆地理编码 API
    return {
      province: "广东省",
      city: "广州市",
      district: "天河区",
      street: "体育西路",
      streetNumber: "100号",
      formatted: "广东省广州市天河区体育西路100号",
    };
  }

  @Get("autocomplete")
  @ApiOperation({ summary: "地址输入提示" })
  autocomplete(@Query("keyword") keyword: string) {
    // ⚠ 开发阶段：mock 返回
    return [{ name: `${keyword}路` }, { name: `${keyword}街道` }];
  }
}
