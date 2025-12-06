import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      service: 'testcracker-api',
      time: new Date().toISOString(),
    };
  }
}
