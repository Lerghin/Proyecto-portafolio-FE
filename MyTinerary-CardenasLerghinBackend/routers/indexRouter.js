import {Router} from "express";
import cities from "./citiesRouter.js";
import citiesController from "../controllers/citiesController.js";

const indexRouter = Router()
const {getAllCities, getOneCity}= citiesController

indexRouter.get('/', (request, response, next) => {
    response.send('Welcome to server /api' );
  });
 
  indexRouter.get('/cities/one',citiesController.getOneCity)

  export default indexRouter