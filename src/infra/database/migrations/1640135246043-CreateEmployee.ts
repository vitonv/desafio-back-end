import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmployee1640135246043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'id_branch',
            type: 'uuid',
            isNullable: true,
          },
        ],
        // foreignKeys: [
        //   {
        //     name: 'FKBranchEmployee',
        //     referencedTableName: 'branches',
        //     referencedColumnNames: ['id_branch'],
        //     columnNames: ['id_branch'],
        //     onDelete: 'SET NULL',
        //     onUpdate: 'SET NULL',
        //   },
        // ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees');
  }
}
