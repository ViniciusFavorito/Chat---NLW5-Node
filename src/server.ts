import { http } from "./http";
import "./websocket/client";
import "./websocket/admin";


http.listen(3333, () => console.log("server is running nessa bagaça da porta 3333"));