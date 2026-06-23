import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StreetClaimService {
  constructor(private prisma: PrismaService) {}

  async claim(
    userId: string,
    data: {
      instrumentName: string;
      streetName: string;
      district?: string;
      city?: string;
      province?: string;
      lat?: number;
      lng?: number;
    }
  ) {
    // 检查老师认证
    const teacher = await this.prisma.teacherAuth.findUnique({
      where: { userId },
    });
    if (!teacher || teacher.status !== "APPROVED") {
      throw new BadRequestException("请先完成老师认证");
    }

    // 获取或创建乐器
    let instrument = await this.prisma.instrument.findFirst({
      where: { name: data.instrumentName },
    });
    if (!instrument) {
      instrument = await this.prisma.instrument.create({
        data: { name: data.instrumentName },
      });
    }

    // 检查唯一性约束
    const existing = await this.prisma.streetClaim.findFirst({
      where: {
        streetName: data.streetName,
        instrumentId: instrument.id,
        status: "ACTIVE",
      },
    });
    if (existing) {
      throw new BadRequestException(
        `"${data.streetName}"的"${data.instrumentName}"已被认领，请选择其他乐器或其他街道`
      );
    }

    return this.prisma.streetClaim.create({
      data: {
        teacherId: teacher.id,
        instrumentId: instrument.id,
        streetName: data.streetName,
        streetRaw: null,
        district: data.district,
        city: data.city,
        province: data.province,
        lat: data.lat,
        lng: data.lng,
      },
      include: { instrument: true },
    });
  }

  async findNearby(lat: number, lng: number, radiusMeters: number) {
    // 使用 PostGIS 空间查询
    // SELECT * FROM street_claims
    // WHERE ST_DWithin(
    //   ST_MakePoint(lng, lat)::geography,
    //   ST_MakePoint(s.lng, s.lat)::geography,
    //   radiusMeters
    // )
    // ⚠ 开发阶段：返回所有活跃认领
    return this.prisma.streetClaim.findMany({
      where: { status: "ACTIVE" },
      include: {
        instrument: true,
        teacher: { include: { user: true } },
      },
      take: 50,
    });
  }

  async search(query: string, lat?: number, lng?: number) {
    return this.prisma.streetClaim.findMany({
      where: {
        status: "ACTIVE",
        OR: [
          { streetName: { contains: query } },
          { instrument: { name: { contains: query } } },
          { teacher: { user: { nickname: { contains: query } } } },
        ],
      },
      include: {
        instrument: true,
        teacher: { include: { user: true } },
      },
      take: 50,
    });
  }

  async getById(id: string) {
    const claim = await this.prisma.streetClaim.findUnique({
      where: { id },
      include: {
        instrument: true,
        teacher: {
          include: { user: true },
        },
      },
    });
    if (!claim) throw new NotFoundException("认领记录不存在");
    return claim;
  }
}
