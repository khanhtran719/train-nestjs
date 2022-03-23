import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/user.service';
import { GroupService } from 'src/modules/groups/group.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private groupService: GroupService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByName(username);
    if (!user) {
      throw new NotFoundException();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const group = await this.groupService.findOneById(
        user.groupId.toString(),
      );
      const { username } = user;
      const { permission, name } = group;
      return { username, name, permission };
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      groupName: user.name,
      permission: user.permission,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
