import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm"


import { v4 as uuid } from "uuid"
import { User } from "./User";

@Entity("messages")
class Message {
    @PrimaryColumn()
    id: string;

    @Column()
    adm_id: string;

    @Column()
    texto: string;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => User)
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    criad_hora: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { Message }