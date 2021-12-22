import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import { PgBranch } from './PgBranch';

@Entity('employee')
export class PgEmployee {
  @PrimaryGeneratedColumn('uuid', { name: 'id_employee' })
  id: string;

  @Column()
  name: string;

  @Column()
  id_department: string;

  // @ManyToOne(() => PgBranch)
  // // @JoinColumn({ name: 'id_department' })
  // department: PgBranch;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @ManyToOne(() => PgBranch)
  // @JoinColumn({ name: 'branch_id' })
  // branch: PgBranch;

  @Column()
  branch_id: string;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
