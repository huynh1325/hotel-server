import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'name',
      passwordField: 'password',
    });
  }

  async validate(name: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(name, password);
    if (!user) {
      throw new UnauthorizedException("name/password ko hợp lệ");
    }
    if (user.isActive === false) {
      throw new BadRequestException("Tài khoản chưa đc kích hoạt");
    }
    return user;
  }
}