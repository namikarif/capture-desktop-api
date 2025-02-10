import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from '../services/app.service';

@Controller('devices')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('list')
  getDevices(@Req() request: Request, @Res() response: Response) {
    response.json(this.appService.getDevices()).status(200);
  }
}
