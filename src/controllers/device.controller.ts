import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { DeviceService } from '../services/device.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceEntity } from '../entities/device.entity';

@Controller('devices')
export class DeviceController {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceEntityRepository: Repository<DeviceEntity>,
    private deviceService: DeviceService,
  ) {}

  @Get('list')
  async getDevices(@Req() request: Request, @Res() response: Response) {
    try {
      const devices = await this.deviceEntityRepository.find();

      response.json(devices).status(200);
    } catch (error) {
      response.json({ error }).status(400);
    }
  }

  @Post('add')
  async setDevice(
    @Body() data: { deviceId: string; name: string },
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const { deviceId, name } = data;
      let device = await this.deviceEntityRepository.findOne({
        where: {
          deviceId,
        },
      });

      if (!device) {
        device = this.deviceEntityRepository.create(data);
        device = await this.deviceEntityRepository.save(device);
      }

      response.json({ device }).status(200);
    } catch (error) {
      response.json({ error }).status(400);
    }
  }
}
