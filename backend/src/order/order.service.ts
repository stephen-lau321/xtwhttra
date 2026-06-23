import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(data: { productId: string; buyerId: string; quantity: number }) {
    const product = await this.prisma.product.findUnique({ where: { id: data.productId } });
    if (!product) throw new NotFoundException("商品不存在");
    return this.prisma.order.create({
      data: { productId: data.productId, buyerId: data.buyerId, quantity: data.quantity, totalFee: product.price * data.quantity },
      include: { product: true },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { buyerId: userId },
      include: { product: { include: { instrument: true } } },
      orderBy: { createdAt: "desc" },
    });
  }
}