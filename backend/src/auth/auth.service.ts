import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async wechatLogin(code: string) {
    // 1. 调用微信接口换取 openid
    // const { openid } = await this.wechatApi.code2Session(code);
    // 2. 查找或创建用户
    // let user = await this.prisma.user.findUnique({ where: { wechatOpenId: openid } });
    // if (!user) {
    //   user = await this.prisma.user.create({ data: { wechatOpenId: openid } });
    // }
    // 3. 生成 JWT
    // const token = this.jwtService.sign({ sub: user.id, role: user.role });
    // return { token, user };
    // ⚠ 开发阶段：返回 mock
    return { message: "微信登录待接入" };
  }

  async phoneLogin(phone: string, code: string) {
    // 验证短信验证码 → 查找/创建用户 → 生成 JWT
    return { message: "手机号登录待接入" };
  }

  async sendSmsCode(phone: string) {
    // 调用阿里云 SMS 发送验证码
    return { message: "短信验证码待接入" };
  }

  generateToken(userId: string, role: string): string {
    return this.jwtService.sign({ sub: userId, role });
  }
}
