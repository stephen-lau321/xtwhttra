import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async apply(
    userId: string,
    data: {
      realName: string;
      idCardFront?: string;
      idCardBack?: string;
      instrumentNames: string[];
    }
  ) {
    const existing = await this.prisma.teacherAuth.findUnique({
      where: { userId },
    });
    if (existing) {
      throw new BadRequestException("您已提交过认证申请");
    }

    // 更新用户角色为老师
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: "TEACHER" as any },
    });

    // 创建认证记录
    const auth = await this.prisma.teacherAuth.create({
      data: {
        userId,
        realName: data.realName,
        idCardFront: data.idCardFront,
        idCardBack: data.idCardBack,
      },
    });

    // 创建或关联乐器
    for (const name of data.instrumentNames) {
      let instrument = await this.prisma.instrument.findFirst({
        where: { name },
      });
      if (!instrument) {
        instrument = await this.prisma.instrument.create({ data: { name } });
      }
    }

    return auth;
  }

  async getStatus(userId: string) {
    return this.prisma.teacherAuth.findUnique({
      where: { userId },
      include: { streetClaims: { include: { instrument: true } } },
    });
  }

  async listPending() {
    return this.prisma.teacherAuth.findMany({
      where: { status: "PENDING" },
      include: { user: true },
    });
  }

  async verify(data: { teacherAuthId: string; approved: boolean; reason?: string }) {
    return this.prisma.teacherAuth.update({
      where: { id: data.teacherAuthId },
      data: {
        status: data.approved ? "APPROVED" : "REJECTED",
        verifiedAt: data.approved ? new Date() : undefined,
      },
    });
  }
}
