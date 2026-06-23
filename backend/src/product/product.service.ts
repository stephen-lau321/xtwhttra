import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async list(options: { teacherId?: string; instrumentId?: string; status?: string }) {
    return this.prisma.product.findMany({
      where: {
        ...(options.teacherId ? { teacherId: options.teacherId } : {}),
        ...(options.instrumentId ? { instrumentId: options.instrumentId } : {}),
        ...(options.status ? { status: options.status } : { status: "ACTIVE" }),
      },
      include: { teacher: { include: { user: true } }, instrument: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getById(id: string) {
    const p = await this.prisma.product.findUnique({ where: { id }, include: { teacher: { include: { user: true } }, instrument: true } });
    if (!p) throw new NotFoundException("商品不存在");
    return p;
  }

  async create(data: { teacherId: string; instrumentId: string; name: string; description?: string; price: number; images?: string[] }) {
    return this.prisma.product.create({
      data: { teacherId: data.teacherId, instrumentId: data.instrumentId, name: data.name, description: data.description, price: data.price, images: JSON.stringify(data.images || []) },
      include: { instrument: true },
    });
  }

  async update(id: string, data: any) {
    if (data.images) data.images = JSON.stringify(data.images);
    return this.prisma.product.update({ where: { id }, data });
  }
}