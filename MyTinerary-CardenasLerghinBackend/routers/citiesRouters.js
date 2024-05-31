import {Router} from "express";

import citiesController from "../controllers/citiesController.js";

const citiesRouters = Router()
const {getAllCities, getOneCity}=citiesController


citiesRouters.get('/',citiesController.getAllCities)
citiesRouters.get('/:name',citiesController.getOneCity)

export default citiesRouters