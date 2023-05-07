/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/controllers/user/user.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findEmail(email);

    if (user && pass === user.password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}