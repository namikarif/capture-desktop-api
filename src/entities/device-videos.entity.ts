import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('device_videos')
export class DeviceVideosEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  deviceId: string;

  @Column()
  videoPath: string;

  @Column()
  videoTime: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
