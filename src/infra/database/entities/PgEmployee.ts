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

@Entity('employees')
export class PgEmployee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  branch_id: string;

  @ManyToOne(() => PgBranch, branch => branch.id)
  @JoinColumn({ name: 'branch_id' })
  branch: PgBranch;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
