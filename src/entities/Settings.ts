import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm"

import { v4 as uuid } from "uuid"

@Entity("settings")
class Setting {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    chat: boolean;

    @UpdateDateColumn()
    att_hora: Date;

    @CreateDateColumn()
    criad_hora: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { Setting }