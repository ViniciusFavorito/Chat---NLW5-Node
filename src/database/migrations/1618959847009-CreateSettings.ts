import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSettings1618959847009 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "settings",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "nome",
                        type: "varchar"
                    },
                    {
                        name: "chat",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "att_hora",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "criad_hora",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings");
    }

}
