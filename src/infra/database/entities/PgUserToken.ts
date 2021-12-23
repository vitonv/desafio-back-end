import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { PgUser } from './PgUser';

@Entity('users_tokens')
export class PgUserToken {
  @PrimaryColumn()
  user_id: string;

  @Column({ name: 'access_token' })
  accessToken: string;

  @ManyToOne(() => PgUser)
  @JoinColumn({ name: 'user_id' })
  user: PgUser;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;
}
