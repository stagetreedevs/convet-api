/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './cors.config';

async function bootstrap() {

  const corsConfig = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
  }

  // const app = await NestFactory.create(AppModule, {cors:true});
  // app.enableCors(corsConfig);
  // await app.listen(process.env.PORT || 3000);

  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
