import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Post, Body, Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
