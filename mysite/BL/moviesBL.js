var subAPI = require('../DAL/RestAPI')

//GET movie data from our web service - rest api
const getAllMoviesData = async function(){
    let moviesData = await subAPI.getAllMoviesRESTAPI()
    return(moviesData)
}


module.exports = {getAllMoviesData}

