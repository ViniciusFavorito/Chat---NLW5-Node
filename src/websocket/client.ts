import { io } from "../http"
import { ConnectionsService } from "../services/ConnectionsService"
import { UserService } from "../services/UserService"
import { MessagesService } from "../services/MessagesService"

interface IParams {
    texto: string;
    email: string;
}


io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService()
    const userService = new UserService()
    const messagesService = new MessagesService()


    socket.on("cliente_1_acesso", async (params) => {
        const socket_id = socket.id
        const { texto, email } = params as IParams;
        let user_id = null

        const tem_usu = await userService.findByEmail(email)

        if (!tem_usu) {
            const user = await userService.create(email)

            await connectionsService.create({
                socket_id,
                user_id: user.id
            })
            user_id = user.id
        } else {
            user_id = tem_usu.id
            const connnection = await connectionsService.findByUserId(tem_usu.id)

            if (!connnection) {

                await connectionsService.create({
                    socket_id,
                    user_id: tem_usu.id
                })
            } else {
                connnection.socket_id = socket_id
                await connectionsService.create(connnection)
            }
        }

        await messagesService.create({
            texto,
            user_id
        })

        const allMessages = await messagesService.listByUser(user_id)

        socket.emit("client_list_all_messages", allMessages);
    })

    socket.on("cliente_enviou_msg", async (params) => {
        const { texto, socket_adm_id } = params;

        const socket_id = socket.id

        const { user_id } = await connectionsService.findBySocketID(socket.id)

        const message = await messagesService.create({
            texto,
            user_id
        })
        io.to(socket_adm_id).emit("adm_recieve_message", {
            message,
            socket_id
        })
    })
});