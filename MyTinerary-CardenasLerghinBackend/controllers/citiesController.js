import cities from "../routers/citiesRouter.js"


const citiesController ={ 
    getAllCities: async(request, response, next) => {
        response.json({
            
            response: cities,
            succes: true,
            error:null
        })

    },
    getOneCity: async(request, response, next) => {
        response.json({
            
            response: cities[0],
            succes: true,
            error:null
        })

    }
}

export default citiesController
