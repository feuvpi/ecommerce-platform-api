import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async register(user: User): Promise<any> {
    const { password, ...result } = await this.usersService.create(user);
    const payload = { username: user.username, sub: result._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
