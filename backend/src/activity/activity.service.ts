import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

// 敏感词列表（去教培化）
const FORBIDDEN_WORDS = [
  "课程", "培训", "教学", "课时", "学费",
  "试听课", "考级", "集训", "补习", "教培",
  "K12", "k12",
];

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  private checkContent(title: string, description?: string) {
    const text = `${title} ${description || ""}`;
    for (const word of FORBIDDEN_WORDS) {
      if (text.includes(word)) {
        throw new BadRequestException(
          `内容包含敏感词"${word}"，请使用社交活动语言（如体验、沙龙、分享会等）`
        );
      }
    }
  }

  async create(
    userId: string,
    data: {
      title: string;
      description?: string;
      coverImage?: string;
      eventTime?: string;
      location?: string;
      price?: number;
    }
  ) {
    this.checkContent(data.title, data.description);

    return this.prisma.activity.create({
      data: {
        teacherId: userId,
        title: data.title,
        description: data.description,
        coverImage: data.coverImage,
        eventTime: data.eventTime ? new Date(data.eventTime) : null,
        location: data.location,
        price: data.price,
      },
    });
  }

  async listByTeacher(teacherId: string) {
    return this.prisma.activity.findMany({
      where: { teacherId, status: "APPROVED" },
      orderBy: { createdAt: "desc" },
    });
  }

  async getById(id: string) {
    return this.prisma.activity.findUnique({
      where: { id },
      include: { teacher: true },
    });
  }
}
