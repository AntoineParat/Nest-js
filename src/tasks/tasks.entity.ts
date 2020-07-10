import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import { TaskStatus } from './tasks.model';

@Entity()
export class TaskEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: true })
  status: TaskStatus;
}
