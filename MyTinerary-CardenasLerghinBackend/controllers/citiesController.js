import cities from "../util/cities.js"

const citiesController ={ 
    getAllCities: async(request, response, next) => {
        response.json({
            
            response: cities,
            succes: true,
            error:null
        })

    },
    getOneCity: async(request, response, next) => {
        const {name}= request.params
        const city= cities.find(city => city.name== name)
        response.json({
       
            response: city,
            succes: true,
            error:null
        })
  
    }
}

export default citiesController
