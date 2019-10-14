import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import "reflect-metadata";
import * as bodyParser from 'body-parser';

const PORT = process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  await app.listen(PORT);
  console.log(`http:\\localhost:${PORT} is running`)
}
bootstrap();
