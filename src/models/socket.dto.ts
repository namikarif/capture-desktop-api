export class DeviceState {
  id: string;
  isEnable: boolean;
  status: boolean;
}

export class StreamData {
  buffer: Buffer;
  deviceId: string;
}
