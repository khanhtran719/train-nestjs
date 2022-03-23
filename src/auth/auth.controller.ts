import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  HttpCode,
} from '@nestjs/common';
import { responsFormat } from 'src/common/utils/formatRespon';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(201)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @HttpCode(200)
  getProfile(@Request() req) {
    return responsFormat(req.user, 0, 'Success', []);
  }
}
