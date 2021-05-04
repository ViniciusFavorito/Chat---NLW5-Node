import { MessagesService } from "../services/MessagesService"
import { Request, Response } from "express"


class MessagesController {
    async create(request: Request, response: Response) {
        const { adm_id, texto, user_id } = request.body
        const messagesService = new MessagesService();

        const message = await messagesService.create({
            adm_id,
            texto,
            user_id,
        })
        return response.json(message)
    }
    //localhost:3333/messages/idDoUsuario
    async showByUser(request: Request, response: Response) {
        const { id } = request.params;
        const messagesService = new MessagesService();
        const list = await messagesService.listByUser(id)

        return response.json(list)

    }

}

export { MessagesController }