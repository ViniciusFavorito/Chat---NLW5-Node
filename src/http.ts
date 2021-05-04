import express, { request, response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io"
import path from "path"

import "./database";
import { routes } from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname, "..", "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html")
})

app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html")
})

const http = createServer(app) //cria protocolo http
const io = new Server(http) //cria protocolo websocket

io.on("connection", (socket: Socket) => {
    console.log("to aqui malucao", socket.id);
})
/**
 * GET = BUSCA
 * POST = CRIAR
 * PUT = ALTERAÇÃO
 * DELETE = DELETAR
 * PATCH = ALTERAR UMA INFORMÇÃO ESPECIFICA COMO POR EXEMPLO SENHA DO USUÁRIO
 */

// app.get("/", (request, response) => {
//     return response.json({
//         message: "Luiz é um Macaco"
//     })
// })

// app.post("/users", (request, response) => {
//     return response.json({
//         message: "luiz é um macaco 2.0"
//     })
// })

app.use(express.json())

app.use(routes);

export { http, io }