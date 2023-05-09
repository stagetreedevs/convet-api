/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, Query, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('Usuários')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'CRIAR USUÁRIO', description: 'PASSE O BODY PREENCHIDO E CRIE UM USUÁRIO.' })
  @ApiBody({ type: UserDto })
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  @ApiOperation({ summary: 'TODOS USUÁRIOS', description: 'RETORNA TODOS OS USUÁRIOS.' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR USUÁRIO', description: 'PASSE COMO PARAMETRO O ID E RETORNE UM USUÁRIO.' })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR USUÁRIO', description: 'PASSE COMO PARAMETRO O ID E UM BODY CONTENDO INFORMAÇÕES PARA ATAULIZAR O.' })
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR USUÁRIO', description: 'PASSE COMO PARAMETRO O ID E DELETE UM USUÁRIO.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Post('upload/')
  @ApiOperation({ summary: 'Upload firebase', description: 'PASSE COMO PARAMETRO O EMAIL DO USUÁRIO E A IMAGEM(ARQUIVO FILE), PARA REALIZAR O UPLOAD NO FIREBASE STORAGE.' })
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Query() username: any, @UploadedFile() file){
    return this.userService.upload(username, file);
  }
}
