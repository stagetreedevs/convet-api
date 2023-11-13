/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards, Post, Request, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { LoginDto } from './login.dto';
@ApiTags('API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'LOGIN', description: 'PASSE O BODY PREENCHIDO(USERNAME-> EMAIL; PASSWORD-> SENHA). E OBTENHA COMO RESPOSTA UM TOKEN JWT CONTENDO INFORMAÇÕES SOBRE O USUÁRIO. O TOKEN TEM VALIDADE DE 1 DIA.' })
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('historico/:id')
  @ApiOperation({ summary: 'RETORNAR HISTÓRICO DE REGISTROS E SIMULADOS DO USUÁRIO' })
  async findUser(@Param('id') id: string): Promise<any> {
    return this.appService.getHistory(id);
  }
}
