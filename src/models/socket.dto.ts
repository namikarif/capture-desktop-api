export class DeviceState {
  deviceId: string;
  isEnable: boolean;
  status: boolean;
}

export class StreamData {
  buffer: Buffer;
  deviceId: string;
}

export class VideoBlobData {
  blob: any;
  deviceId: string;
  folder: string;
  startTime: number;
}
