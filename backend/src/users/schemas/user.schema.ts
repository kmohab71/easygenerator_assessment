// filepath: src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  // Add this to fix _id errors
  _id?: Types.ObjectId;
  
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
  
  @Prop({ required: true, unique: true })
  email: string;
  
  @Prop({ default: false })
  isEmailVerified: boolean;
  
  @Prop({ default: 'user' })
  role: string;
  
  @Prop({ default: null })
  refreshToken: string;
  
  // Add method signature to fix toObject errors
  toObject?: () => any;
}

export const UserSchema = SchemaFactory.createForClass(User);