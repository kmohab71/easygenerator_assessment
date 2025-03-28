// filepath: src/auth/auth.controller.ts
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto, RegisterDto } from '../common/dto/auth.dto';
import { RefreshTokenGuard } from './refresh-token.guard';

import { HttpException } from '@nestjs/common';

@Controller('auth') // Base route: /auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') // Route: POST /auth/login
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user);
  }

  @Post('register') // Route: POST /auth/register
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(
        registerDto.username, 
        registerDto.email, 
        registerDto.password
      );
    } catch (error) {
      throw new HttpException(error.message || 'Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile') // Route: GET /auth/profile
  getProfile(@Request() req: Express.Request) {
    if (!req.user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return req.user;
  }
  
  @UseGuards(RefreshTokenGuard)
  @Post('refresh') // Route: POST /auth/refresh
  refreshTokens(@Request() req) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('logout') // Route: POST /auth/logout
  logout(@Request() req) {
    return this.authService.logout(req.user.userId);
  }
}