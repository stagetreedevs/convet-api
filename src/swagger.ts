/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-dist';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('CONVET API')
    .setDescription('Convet API - Todos os endpoints da aplicação')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    customCss: swaggerUi.getAbsoluteFSPath() + '/swagger-ui.css',
    customJs: swaggerUi.getAbsoluteFSPath() + '/swagger-ui-bundle.js',
  });
}
