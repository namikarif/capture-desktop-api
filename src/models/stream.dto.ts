import { WriteStream } from 'fs';

export class StreamDto {
  stream: WriteStream | undefined;
  filePath: string;
  deviceId: string;
  startTime: number;
}
