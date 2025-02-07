import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  @WebSocketServer()
  server: Server;

  private computers: string[] = [];

  @SubscribeMessage('register-computer')
  handleRegister(
    @MessageBody() { id }: { id: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (!this.computers.includes(id)) {
      this.computers.push(id);
      this.server.emit('update-computers', this.computers);
    }
    client.join(id);
  }

  @SubscribeMessage('start-stream')
  handleStartStream(@MessageBody() id: string) {
    this.server.emit('start-stream');
  }

  @SubscribeMessage('computer-state')
  handleComputerState(@MessageBody() data: Record<string, boolean>) {
    this.server.emit('computer-state', data);
  }

  @SubscribeMessage('stop-stream')
  handleStopStream(@MessageBody() id: string) {
    this.server.emit('stop-stream');
  }

  @SubscribeMessage('stream-data')
  handleStreamData(@MessageBody() data: Buffer) {
    this.server.emit('stream-video-data', data);
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
