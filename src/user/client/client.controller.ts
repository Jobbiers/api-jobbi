import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserClientService } from './client.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FirebaseAuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserClientController {
  constructor(private readonly userService: UserClientService) {}

  @Post()
  createWithGoogle(@Body() createUserDto: CreateUserDto) {
    return this.userService.createWithGoogle(createUserDto);
  }

  @Post('/googleUser')
  create(@Body() createUser: CreateUserDto) {
    const createUserParsed: CreateUserDto = {
      ...createUser,
      email: createUser.email.toLowerCase()
    }
    return this.userService.create(createUser);
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('/login')
  login(@Body() user: LoginUserDto) {
    const userParsed: LoginUserDto = {
      email: user.email.toLowerCase(),
      password: user.password,
    }
    return this.userService.login(userParsed);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
