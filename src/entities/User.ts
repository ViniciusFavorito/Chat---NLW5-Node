import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm"

import { v4 as uuid } from "uuid"

@Entity("Users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @CreateDateColumn()
    criad_hora: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User }