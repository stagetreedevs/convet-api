/* eslint-disable prettier/prettier */
import { AdminModule } from './controllers/admin/admin.module';
import { UserModule } from './controllers/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { SchoolSubjectModule } from './controllers/school_subject/school_subject.module';
import { RegisterModule } from './controllers/register/register.module';
import { CycleModule } from './controllers/cycle/cycle.module';
import { SwaggerModule } from '@nestjs/swagger';
import { CycleModelModule } from './controllers/cycleModel/cycleModel.module';
import { CycleHistoryModule } from './controllers/cycleHistory/cycleHistory.module';
import { WorkbookModule } from './controllers/workbook/workbook.module';
import { ObservationModule } from './controllers/observation/observation.module';
import { ExamModule } from './controllers/exam/exam.module';
import { ExamHistoryModule } from './controllers/examHistory/examHistory.module';
import { EditModelModule } from './controllers/editModel/editModel.module';
import { EditCycleModule } from './controllers/editCycle/editCycle.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs'
dotenv.config();
@Module({
  imports: [
    AdminModule,
    UserModule,
    SchoolSubjectModule,
    ObservationModule,
    RegisterModule,
    CycleModule,
    CycleModelModule,
    CycleHistoryModule,
    WorkbookModule,
    ExamModule,
    ExamHistoryModule,
    EditModelModule,
    EditCycleModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        ca: fs.readFileSync('./rds-ca-2019-root.pem').toString(),
      },
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    JwtModule.register({
      secret: 'mySecretKey',
      signOptions: { expiresIn: '24h' },
    }),
    SwaggerModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService
  ]
})
export class AppModule { }