import { Injectable } from '@nestjs/common';
import { DeviceDto } from '../models/device.dto';
import { DeviceState } from '../models/socket.dto';

@Injectable()
export class AppService {
  private devices: DeviceDto[] = [
    {
      id: 'FD3648FB-0810-EF11-E432-116B0932AF7B',
      name: 'NamigAA',
      isEnable: false,
      status: false,
    },
  ];

  setDevice(device: DeviceDto) {
    if (this.devices.findIndex((dv) => dv.id === device.id) === -1) {
      this.devices.push(device);
    }
  }

  getDevices(): DeviceDto[] {
    return this.devices;
  }

  changeDeviceState(deviceState: DeviceState) {
    const deviceIndex = this.devices.findIndex(
      (device) => device.id === deviceState.id,
    );

    if (deviceIndex !== -1) {
      this.devices[deviceIndex] = {
        ...this.devices[deviceIndex],
        ...deviceState,
      };
    }
  }
}
