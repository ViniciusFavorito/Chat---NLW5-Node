import { Socket } from "socket.io"
import { io } from "../http"
import { ConnectionsService } from "../services/ConnectionsService"
import { MessagesService } from "../services/MessagesService"

io.on("connect", async (socket) => {

    const connectionsService = new ConnectionsService()
    const messagesService = new MessagesService()

    const all_connect_sem_adm = await connectionsService.encontre_all_sem_adm();

    io.emit("admin_list_all_users", all_connect_sem_adm)

    socket.on("admin_list_message_by_user", async (params, callback) => {
        const { user_id } = params
        const allMessages = await messagesService.listByUser(user_id)
        callback(allMessages)
    })

    socket.on("admin_send_message", async (params) => {
        //socket.on("cliente_enviou_msg", async (params) =>{
        const { user_id, texto } = params

        await messagesService.create({

            texto,
            user_id,
            adm_id: socket.id

        })

        const { socket_id } = await connectionsService.findByUserId(user_id);

        io.to(socket_id).emit("admin_envia_para_cliente", {
            texto,
            socket_id: socket.id
        })

    })
})