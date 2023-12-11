import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userExist = await this.findOneByEmail(createUserDto.email);
    if (userExist) {
      throw new BadRequestException('User already exist');
    }
    const passwordHash = bcryptjs.hashSync(createUserDto.password, 8);
    const newUser = this.userRepository.create({
      email: createUserDto.email,
      username: createUserDto.username,
      password: passwordHash,
    });
    return await this.userRepository.save(newUser);
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'username', 'password', 'role'],
    });
  }
}
