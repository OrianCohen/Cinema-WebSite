const axiosDAL = require('axios')

const getAllMoviesAPI = function(){
    return axiosDAL.get('https://api.tvmaze.com/shows');
}
module.exports = {getAllMoviesAPI }