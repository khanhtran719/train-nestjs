import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByName(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { username, groupId } = user;
      return { username, groupId };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, groupId: user.groupId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
