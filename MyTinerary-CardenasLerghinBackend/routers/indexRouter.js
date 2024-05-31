import {Router} from "express";
import citiesRouters from "./citiesRouters.js";

const indexRouter = Router()


indexRouter.get('/', (request, response, next) => {

    response.send('Welcome to server /api' );
  });

  indexRouter.use('/cities', citiesRouters)


  export default indexRouter