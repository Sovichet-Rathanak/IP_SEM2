import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.userService.findUserByID(id);
  }

  @Get('/')
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Post('/')
  createUser(@Body() body: createUserDto) {
    return this.userService.createUser(body);
  }

  @Patch('/:id')
  updateUserByID(
    @Param('id') id: number,
    @Body() body: { email: string; password: string },
  ) {
    return this.userService.updateUserByID(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
