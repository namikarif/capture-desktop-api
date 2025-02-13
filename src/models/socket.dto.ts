export class DeviceState {
  deviceId: string;
  isEnable: boolean;
  status: boolean;
}

export class DeviceVideoFto {
  deviceId: string;
  videoTime: number;
  videoPath: string;
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
