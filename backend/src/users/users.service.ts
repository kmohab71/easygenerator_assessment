// filepath: src/users/users.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(username: string, email: string, password: string): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });
    
    if (existingUser) {
      throw new ConflictException(
        existingUser.username === username 
          ? 'Username already exists' 
          : 'Email already exists'
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ 
      username, 
      email, 
      password: hashedPassword 
    });
    return user.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username }).exec();
    return user || undefined;
  }
  
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    return user || undefined;
  }
  
  async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
    const hashedRefreshToken = refreshToken 
      ? await bcrypt.hash(refreshToken, 10)
      : null;
      
    await this.userModel.findByIdAndUpdate(userId, { 
      refreshToken: hashedRefreshToken 
    });
  }
}