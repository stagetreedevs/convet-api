/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/controllers/user/user.service';
import { AdminService } from 'src/controllers/admin/admin.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private adminService: AdminService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const admin = await this.adminService.findEmail(email);
    const user = await this.userService.findEmail(email);

    if (admin && pass === admin.password) {
      const { password, ...result } = admin;
      return { page: 'admin', ...result };
    }
    else if (user && pass === user.password) {
      const { password, ...result } = user;
      return { page: 'user', ...result };
    }

    return null;
  }
}