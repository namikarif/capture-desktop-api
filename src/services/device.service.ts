import { Injectable } from '@nestjs/common';
import { DeviceDto } from '../models/device.dto';
import { DeviceState } from '../models/socket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceEntity } from '../entities/device.entity';
import { Repository } from 'typeorm';
import { DeviceVideosEntity } from '../entities/device-videos.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceEntityRepository: Repository<DeviceEntity>,
    @InjectRepository(DeviceVideosEntity)
    private readonly deviceVideosEntityRepository: Repository<DeviceVideosEntity>,
  ) {}

  async setDevice(device: DeviceDto) {
    const findDevice = await this.deviceEntityRepository.findOne({
      where: {
        deviceId: device.deviceId,
      },
    });

    if (!findDevice) {
      const deviceCreate = this.deviceEntityRepository.create(device);
      await this.deviceEntityRepository.save(deviceCreate);
    }
  }

  async getDevices(): Promise<DeviceEntity[]> {
    return await this.deviceEntityRepository.find();
  }

  async changeDeviceState(deviceState: DeviceState) {
    await this.deviceEntityRepository.update(
      { deviceId: deviceState.deviceId },
      { ...deviceState },
    );
  }

  async setDeviceVideo(deviceState: DeviceState) {
    await this.deviceVideosEntityRepository.create();
  }
}
