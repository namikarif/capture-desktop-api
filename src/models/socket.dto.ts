export class DeviceState {
  id: string;
  isEnable: boolean;
  status: boolean;
}

export class StreamData {
  buffer: Buffer;
  deviceId: string;
}

export class VideoBlobData {
  blob: any;
  id: string;
}
