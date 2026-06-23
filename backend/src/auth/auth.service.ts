import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private smsCodes = new Map<string, { code: string; expiresAt: number }>();
  private readonly DEV_UNIVERSAL_CODE = "888888";
  private readonly DEV_MODE = true;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async wechatLogin(code: string) {
    return { message: "微信登录待接入" };
  }

  async sendSmsCode(phone: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.smsCodes.set(phone, {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    this.logger.log(`========================================`);
    this.logger.log(` 验证码 [${phone}]: ${code}`);
    this.logger.log(` 通用码: ${this.DEV_UNIVERSAL_CODE}`);
    this.logger.log(`========================================`);

    return { message: "验证码已发送（开发模式）" };
  }

  async phoneLogin(phone: string, code: string) {
    if (this.DEV_MODE && code === this.DEV_UNIVERSAL_CODE) {
      return this.createOrLoginUser(phone);
    }
    const stored = this.smsCodes.get(phone);
    if (!stored) throw new BadRequestException("请先获取验证码");
    if (Date.now() > stored.expiresAt) {
      this.smsCodes.delete(phone);
      throw new BadRequestException("验证码已过期");
    }
    if (stored.code !== code) throw new BadRequestException("验证码错误");
    this.smsCodes.delete(phone);
    return this.createOrLoginUser(phone);
  }

  private async createOrLoginUser(phone: string) {
    let user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await this.prisma.user.create({
        data: { phone, role: "PARENT" },
      });
    }
    return {
      token: this.generateToken(user.id, user.role),
      user: { id: user.id, phone: user.phone, role: user.role, nickname: user.nickname },
    };
  }

  generateToken(userId: string, role: string): string {
    return this.jwtService.sign({ sub: userId, role });
  }
}