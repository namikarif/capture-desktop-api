import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';
import { DeviceDto } from '../models/device.dto';
import { DeviceState } from '../models/socket.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @WebSocketServer()
  server: Server;

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
    console.log({id});
    this.server.emit(`stop-stream-${id}`);
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
