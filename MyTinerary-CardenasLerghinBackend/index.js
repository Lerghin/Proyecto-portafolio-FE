
import express from "express";
import indexRouter from "./routers/indexRouter.js";

const server = express();

server.use ('/api', indexRouter)
server.get('/', (request, response, next) => {
  response.send('Bienvenido a mi Servidor /');
});


server.listen(4000, () => {
  console.log('Servidor corriendo en puerto 4000');
});