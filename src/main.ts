import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';

const configService = new ConfigService();
const PORT = configService.get('APP_PORT');

async function bootstrap() {
  try {
    const app: INestApplication = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(compression());
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('John Smilga Ecommerce Nest App')
      .setDescription('Api for products')
      .setVersion('0.1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
    await app.listen(PORT);
  } catch (error) {
    console.log(error.message, 'Message of ERROR');
  }
}
bootstrap().then(() => console.log(`App running on port ${PORT}`));
