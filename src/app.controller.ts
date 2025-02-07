import { Controller, Get } from '@nestjs/common';

@Controller('computers')
export class AppController {
  @Get()
  getComputers() {
    return { computers: ['Computer1', 'Computer2', 'Computer3'] };
  }
}
