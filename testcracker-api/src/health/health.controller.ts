import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): string {
    // simple plain-text health response
    return 'healthy';
  }
}
