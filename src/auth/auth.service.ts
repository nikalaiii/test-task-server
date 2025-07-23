import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(login: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = new this.userModel({ login, password: hash });
    return user.save();
  }

  async validateUser(login: string, password: string) {
    const user = await this.userModel.findOne({ login });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  async login(login: string, password: string) {
    const user = await this.validateUser(login, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user._id, login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userModel.findById(payload.sub);
      if (!user) throw new UnauthorizedException('Invalid token');
      return user;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
} 