let socket_adm_id = null
let email_user = null
let socket = null


document.querySelector("#start_chat").addEventListener("click", (event) => {
    const socket = io();

    const chat_help = document.getElementById("chat_help")
    chat_help.style.display = "none"

    const chat_suporte = document.getElementById("chat_in_support");
    chat_suporte.style.display = "block";

    const email = document.getElementById("email").value;
    email_user = email
    const texto = document.getElementById("txt_help").value;

    socket.on("connect", () => {
        const params = { email, texto }
        socket.emit("cliente_1_acesso", params, (call, err) => {
            if (err) {
                console.log(err)
            } else {
                console.log(call)
            }
        })
    })

    socket.on("client_list_all_messages", (messages) => {
        var template_client = document.getElementById("message-user-template").innerHTML;
        var template_admin = document.getElementById("admin-template").innerHTML;

        messages.forEach(message => {
            if (message.adm_id === null) {
                const rendered = Mustache.render(template_client, {
                    message: message.texto,
                    email
                })
                document.getElementById("messages").innerHTML += rendered
            } else {
                const rendered = Mustache.render(template_admin, {
                    message_admin: message.texto
                })

                document.getElementById("messages").innerHTML += rendered

            }
        })

    })

    socket.on("admin_envia_para_cliente", (message) => {

        socket_adm_id = message.socket_id
        const template_admin = document.getElementById("admin-template").innerHTML

        const rendered = Mustache.render(template_admin, {
            message_admin: message.texto
        })

        document.getElementById("messages").innerHTML += rendered

    })
});

document.querySelector("#send_message_button").addEventListener("click", (event) => {

    const text = document.getElementById("message_user");

    const params = {
        text,
        socket_adm_id
    }

    socket.emit("cliente_enviou_msg", params)
    //socket.emit("admin_send_message", params);

    const template_client = document.getElementById("message-user-template").innerHTML

    const rendered = Mustache.render(template_client, {
        message: texto.value,
        email: email_user
    })

    document.getElementById("messages").innerHTML += rendered
})




