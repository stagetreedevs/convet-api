/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './environment';
import { initializeApp } from 'firebase/app';
import { setupSwagger } from './swagger';
async function bootstrap() {
  const corsConfig = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
  }

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC1lfrELRj1EjocYnnL8_xpbkM3Kqb9t9M",
    authDomain: "convet-36247.firebaseapp.com",
    projectId: "convet-36247",
    storageBucket: "convet-36247.appspot.com",
    messagingSenderId: "647758897297",
    appId: "1:647758897297:web:30843c378987d533981f30",
    measurementId: "G-SKH9VD8TY0"
  };
  initializeApp(firebaseConfig);

  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

  app.enableCors()
  await app.listen(environment.PORT);
}
bootstrap();