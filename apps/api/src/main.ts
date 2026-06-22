import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

import { AppModule } from './app.module';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API com Swagger')
    .setDescription('Documentação automática da API com Swagger')
    .setVersion('1.0')
    .addBearerAuth() // Para habilitar autenticação JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Gera o arquivo swagger.json na raiz do projeto
  try {
    writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  } catch (err) {
    console.error('Erro ao salvar swagger.json:', err);
  }

  await app.listen(3000);
}

bootstrap();