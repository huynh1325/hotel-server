import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswordHelper } from '@/helpers/util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(name);
    if (user) {
      const isValidPassword = await comparePasswordHelper(pass, user.password);

      if (!isValidPassword ) return null;
    }
    return user;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
