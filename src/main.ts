import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import DatabaseService from './config/databaseClient';
import {auth, storage } from './config/firebase';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  
  // Configuración de validación global con opciones
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    validateCustomDecorators: true,
    disableErrorMessages: false,
    exceptionFactory: (errors) => new Error(`Validation failed: ${errors.map(error => error.constraints).join(', ')}`)
  }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Jobbi API')
    .setDescription('API para la aplicación Jobbi')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await DatabaseService.init();
  
  // Iniciar el servidor
  const port = process.env.PORT || 3008;
  await app.listen(port);
  console.log(`Aplicación corriendo en: http://localhost:${port}`);
}
bootstrap();