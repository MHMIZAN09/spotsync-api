import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    @HttpCode(HttpStatus.OK)
    async checkHealth() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            message: 'Health check passed successfully',
        }
    }
}
