import { Controller, Post, Get, Body, Param, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { OrderService } from "./order.service";
import { CurrentUser } from "../common/decorators/current-user.decorator";

@ApiTags("订单")
@Controller({ path: "orders", version: "1" })
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "创建订单" })
  create(@CurrentUser("id") userId: string, @Body() data: { productId: string; quantity: number }) {
    return this.orderService.create({ ...data, buyerId: userId });
  }

  @Get("mine")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "我的订单" })
  mine(@CurrentUser("id") userId: string) {
    return this.orderService.findByUser(userId);
  }
}