// filepath: src/auth/auth.service.ts
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // Handle Mongoose document properly
    const result = typeof user.toObject === 'function' ? user.toObject() : { ...user };
    delete result.password;
    return result;
  }

  async login(user: any) {
    // Ensure we have an _id
    const userId = user._id?.toString() || user.id || '';
    const tokens = await this.getTokens(userId, user.username, user.role || 'user');
    await this.usersService.updateRefreshToken(userId, tokens.refreshToken);
    
    return tokens;
  }

  async register(username: string, email: string, password: string) {
    const user = await this.usersService.create(username, email, password);
    // Ensure we have an _id
    const userId = user._id?.toString() || '';
    const tokens = await this.getTokens(userId, user.username, user.role || 'user');
    await this.usersService.updateRefreshToken(userId, tokens.refreshToken);
    
    return tokens;
  }
  
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }
    
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken
    );
    
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access denied');
    }
    
    // Ensure we have an _id
    const id = user._id?.toString() || userId;
    const tokens = await this.getTokens(id, user.username, user.role || 'user');
    await this.usersService.updateRefreshToken(id, tokens.refreshToken);
    
    return tokens;
  }
  
  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);
    return { message: 'Logout successful' };
  }
  
  private async getTokens(userId: string, username: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET') || 'fallback-secret',
          expiresIn: this.configService.get<string>('JWT_EXPIRATION', '15m'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'fallback-refresh-secret',
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}