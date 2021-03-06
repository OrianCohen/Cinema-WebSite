var subAPI = require('../DAL/RestAPI')

const getAllMoviesData = async function(){
    let moviesData = await subAPI.getAllMoviesRESTAPI()
    return(moviesData)
}


module.exports = {getAllMoviesData}

