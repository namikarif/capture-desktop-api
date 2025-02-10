import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as fs from 'fs';
import * as path from 'path';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';
import { DeviceDto } from '../models/device.dto';
import { DeviceState, VideoBlobData } from '../models/socket.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @WebSocketServer()
  server: Server;

  private writeStream;

  constructor(private appService: AppService) {}

  @SubscribeMessage('register-computer')
  async handleRegister(
    @MessageBody() device: DeviceDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log({ handleRegister: device });
    this.appService.setDevice(device);
    this.server.emit('update-computers', this.appService.getDevices());
    await client.join(device.id);
  }

  @SubscribeMessage('start-stream')
  handleStartStream(@MessageBody() id: string) {
    this.server.emit(`start-stream-${id}`);
  }

  @SubscribeMessage('stop-stream')
  handleStopStream(@MessageBody() id: string) {
    this.writeStream?.end();
    this.server.emit(`stop-stream-${id}`);
  }

  @SubscribeMessage('stream-blob-data')
  handleStreamBlobData(@MessageBody() data: VideoBlobData) {

    const filePath = path.join(__dirname, '../../uploads', `${data.id}.webm`);

    if (!this.writeStream) {
      this.writeStream = fs.createWriteStream(filePath, { flags: 'a' });
    }

    this.writeStream.write(Buffer.from(data.blob));

    this.server.emit('stream-blob', data);
  }

  @SubscribeMessage('change-state')
  handleChangeState(@MessageBody() data: DeviceState) {
    this.appService.changeDeviceState(data);
    this.server.emit(`change-state`, data);
  }

  @SubscribeMessage('offer')
  handleOffer(
    @MessageBody() offer: any,
    @ConnectedSocket() client: Socket,
  ): void {
    client.broadcast.emit('offer', offer);
  }

  @SubscribeMessage('answer')
  handleAnswer(
    @MessageBody() answer: any,
    @ConnectedSocket() client: Socket,
  ): void {
    client.broadcast.emit('answer', answer);
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(
    @MessageBody() candidate: any,
    @ConnectedSocket() client: Socket,
  ): void {
    client.broadcast.emit('ice-candidate', candidate);
  }
}
