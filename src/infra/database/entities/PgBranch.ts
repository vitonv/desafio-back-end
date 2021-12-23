import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import { PgEmployee } from './PgEmployee';

@Entity('branches')
export class PgBranch {
  @PrimaryGeneratedColumn('uuid', { name: 'id_branch' })
  id: string;

  @Column()
  name: string;

  // @OneToMany(() => PgEmployee, employee => employee.branch_id)
  // employees: PgEmployee[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}