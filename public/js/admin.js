const socket = io();
let connections_Users = []
socket.on("admin_list_all_users", (connections) => {
    connections_Users = connections
    document.getElementById("list_users").innerHTML = "";

    let template = document.getElementById("template").innerHTML

    connections.forEach(connections => {
        const rendered = Mustache.render(template, {
            email: connections.user.email,
            id: connections.socket_id
        })
        document.getElementById("list_users").innerHTML += rendered
    })
})

function call(id) {
    const connection = connections_Users.find(connection => connection.socket_id === id)

    const template = document.getElementById("admin_template").innerHTML

    const rendered = Mustache.render(template, {
        email: connection.user.email,
        id: connection.user_id
    })

    document.getElementById("supports").innerHTML += rendered

    const params = {
        user_id: connection.user_id
    }

    socket.emit("admin_list_message_by_user", params, messages => {
        const divMessages = document.getElementById(`allMessages${connection.user_id}`)

        messages.forEach(message => {
            const createDiv = document.createElement("div")

            if (message.admin_id === null) {

                createDiv.className = "admin_message_client";

                createDiv.innerHTML = `<span>${connection.user.email} </span>`;
                createDiv.innerHTML += `<span>${message.texto}</span>`;
                createDiv.innerHTML += `<span class="admin_date">${dayjs(message.criad_hora).format("DD/MM/YYY HH:mm:ss")}</span>`

            } else {

                createDiv.className = "admin_message_admin";

                createDiv.innerHTML = `Atendente: <span> ${message.texto}</span>`;
                createDiv.innerHTML += `<span class="admin_date">${dayjs(message.criad_hora).format("DD/MM/YYY HH:mm:ss")}`

            }
            divMessages.appendChild(createDiv)
        })
    })
}

function sendMessage(id) {
    const texto = document.getElementById(`send_message_${id}`);

    const params = {
        texto: texto.value,
        user_id: id
    }

    socket.emit("admin_send_message", params);

    const divMessages = document.getElementById(`allMessages${id}`)

    const createDiv = document.createElement("div")
    createDiv.className = "admin_message_admin";

    createDiv.innerHTML = `Atendente: <span> ${params.texto}</span>`;
    createDiv.innerHTML += `<span class="admin_date">${dayjs().format("DD/MM/YYY HH:mm:ss")}`

    divMessages.appendChild(createDiv)

    texto.value = ""

}

socket.on("adm_recieve_message", data => {
    console.log(data)

})

