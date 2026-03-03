import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
  });
  const config = new DocumentBuilder().setTitle('API').setDescription('API description').setVersion('1.0').build();
  const documentFactory = (): OpenAPIObject => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const logger = new Logger('Main');

  app.useGlobalPipes(new ValidationPipe());
  logger.log(`Using global validation pipe`);

  app.enableCors({
    origin: process.env.CORS_ORIGIN === '*' ? /^.*/ : new RegExp(process.env.CORS_ORIGIN ?? ''),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  logger.log(`Using CORS origin ${process.env.CORS_ORIGIN ?? '*'}`);

  app.setGlobalPrefix('api');
  logger.log(`Using global prefix /api`);

  app.use(
    '/scalar',
    apiReference({
      spec: {
        content: documentFactory,
      },
    })
  );
  logger.log('Using Scalar API reference at /scalar');

  await app.listen(process.env.PORT ?? 3001);
  logger.log(`Server started on port ${process.env.PORT ?? 3001}`);
}
bootstrap();
