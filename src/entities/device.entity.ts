import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('devices')
export class DeviceEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  deviceId: string;

  @Column()
  name: string;

  @Column({ default: true })
  shutdown: boolean;

  @Column({ default: true })
  isEnable: boolean;

  @Column({ default: false })
  isLock: boolean;
}
