import { RestApplication } from './rest/rest.application.js';
import { PinoLogger } from './shared/libs/logger/pino.logger.js';

async function bootstrap() {
  const logger = new PinoLogger();

  const app = new RestApplication(logger);
  await app.init();
}

bootstrap();
