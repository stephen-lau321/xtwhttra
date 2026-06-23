import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags("认证")
@Controller({ path: "auth", version: "1" })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("wechat")
  @ApiOperation({ summary: "微信登录" })
  wechatLogin(@Body("code") code: string) {
    return this.authService.wechatLogin(code);
  }

  @Post("phone/send-code")
  @ApiOperation({ summary: "发送短信验证码" })
  sendSmsCode(@Body("phone") phone: string) {
    return this.authService.sendSmsCode(phone);
  }

  @Post("phone/login")
  @ApiOperation({ summary: "手机号验证码登录" })
  phoneLogin(@Body("phone") phone: string, @Body("code") code: string) {
    return this.authService.phoneLogin(phone, code);
  }
}
