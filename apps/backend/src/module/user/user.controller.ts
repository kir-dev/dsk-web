import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<object[]> {
    return this.userService.findAll();
  }

  @Get('me')
  async getMe(): Promise<object> {
    return this.userService.getMe();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<object> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<object> {
    return this.userService.update(id, data);
  }
}
