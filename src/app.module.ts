import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceController } from './controllers/device.controller';
import { DeviceService } from './services/device.service';
import { SocketGateway } from './services/socket.gateway';
import { DeviceEntity } from './entities/device.entity';
import { DeviceVideosEntity } from './entities/device-videos.entity';

const mongoPass = '9uJZnMZt5vkIQ9NW';
const mongoUri = `mongodb+srv://namigabdukarimov:${mongoPass}@capture-desktop.ducum.mongodb.net/db?retryWrites=true&w=majority&appName=capture-desktop`;

const entities = [DeviceEntity, DeviceVideosEntity];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: mongoUri,
      database: 'db',
      logger: 'advanced-console',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: false,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [DeviceController],
  providers: [DeviceService, SocketGateway],
})
export class AppModule {}
