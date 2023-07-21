/* eslint-disable prettier/prettier */
import { AdminModule } from './controllers/admin/admin.module';
import { UserModule } from './controllers/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { environment } from './environment';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { SchoolSubjectModule } from './controllers/school_subject/school_subject.module';
import { RegisterModule } from './controllers/register/register.module';
import { QuestionModule } from './controllers/question/question.module';
import { PlanningModule } from './controllers/planning/planning.module';
import { PlanningCycleModule } from './controllers/planning_cycle/planning_cycle.module';
import { CycleModule } from './controllers/cycle/cycle.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ObservationModule } from './controllers/observation/observation.module';
import { CycleModelModule } from './controllers/cycleModel/cycleModel.module';
import { CycleHistoryModule } from './controllers/cycleHistory/cycleHistory.module';
@Module({
  imports: [
    AdminModule,
    UserModule,
    SchoolSubjectModule,
    RegisterModule,
    QuestionModule,
    PlanningModule,
    PlanningCycleModule,
    CycleModule,
    CycleModelModule,
    CycleHistoryModule,
    ObservationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.PG_HOST,
      port: environment.PG_PORT,
      username: environment.PG_USER,
      password: environment.PG_PASSWORD,
      database: environment.PG_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
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