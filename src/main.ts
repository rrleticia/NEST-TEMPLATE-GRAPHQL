import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors({
    allowedHeaders: '*',
    methods: 'GET,POST,DELETE',
    origin: '*',
    credentials: true,
  });

  const PREFIX = configService.get<string>('app.prefix');

  app.setGlobalPrefix(PREFIX);
  const PORT = configService.get<number>('app.port');

  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}/${PREFIX}`);
  console.log(
    `Apollo Sandbox is avaliable on: https://studio.apollographql.com/sandbox/explorer`
  );
}
bootstrap();
