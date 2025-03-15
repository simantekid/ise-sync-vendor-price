import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
   // logger: WinstonModule.createLogger(winlogger),
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configservice = app.get(ConfigService);

  await app.listen(configservice.get('PORT') || 3000);
}
bootstrap().then(() => {
  console.log(`App started PORT ${process.env.PORT || 3000}`);
});
