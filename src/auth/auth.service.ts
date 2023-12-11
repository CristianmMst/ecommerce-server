import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    return this.userService.create(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findByEmailWithPassword(
      loginAuthDto.email,
    );
    if (!user) {
      throw new BadRequestException('User not exist');
    }
    const passwordIsCorrect = bcryptjs.compareSync(
      loginAuthDto.password,
      user.password,
    );

    if (!passwordIsCorrect) {
      throw new UnauthorizedException('Email or password incorrect');
    }
    const payload = {
      role: user.role,
      email: user.email,
      username: user.username,
    };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
