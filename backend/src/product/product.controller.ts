import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ProductService } from "./product.service";
import { CurrentUser } from "../common/decorators/current-user.decorator";

@ApiTags("乐器商城")
@Controller({ path: "products", version: "1" })
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: "商品列表" })
  list(@Query("teacherId") teacherId?: string, @Query("instrumentId") instrumentId?: string) {
    return this.productService.list({ teacherId, instrumentId });
  }

  @Get(":id")
  @ApiOperation({ summary: "商品详情" })
  getById(@Param("id") id: string) {
    return this.productService.getById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "发布商品" })
  create(@CurrentUser("id") userId: string, @Body() data: any) {
    return this.productService.create({ ...data, teacherId: userId });
  }

  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "更新商品" })
  update(@Param("id") id: string, @Body() data: any) {
    return this.productService.update(id, data);
  }
}