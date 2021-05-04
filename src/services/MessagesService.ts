import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository"


interface IMessageCreate {
    adm_id?: string;
    texto: string,
    user_id: string;
}

class MessagesService {
    private messagesRepository: Repository<Message>

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository)

    }

    async create({ adm_id, texto, user_id }: IMessageCreate) {
        //const messagesRepository = getCustomRepository(MessagesRepository) - nao precisa amis por causa do contructor de cima
        const message = this.messagesRepository.create({
            adm_id,
            texto,
            user_id,
        });

        await this.messagesRepository.save(message);

        return message;

    }
    async listByUser(user_id: string) {
        //const messagesRepository = getCustomRepository(MessagesRepository)

        const list = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"]
        })
        return list
    }
}

export { MessagesService }