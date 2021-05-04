import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UserController } from "./controllers/UsersController";

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UserController();
const messagesController = new MessagesController();
/**
 * Tipos de parametros
 * Routes Params => parametros de rotas --  http://localhost:3333/settings/1
 * Query Params => Filtros e buscas --  http://localhost:3333/settings/1?alu_id=206
 * Body Params => Parametros q vem nono corpo da requisição -- {
 * 
 * }
 */


routes.post("/settings", settingsController.create)
routes.get("/settings/:nome", settingsController.findByUsername)
routes.put("/settings/:nome", settingsController.update)

routes.post("/users", usersController.create)

routes.post("/messages", messagesController.create)
routes.get("/messages/:id", messagesController.showByUser)


export { routes }