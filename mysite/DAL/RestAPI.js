const axios = require('axios')

const getAllMoviesRESTAPI = function(){
    return axios.get('http://localhost:8000/api/movies')
}

const getAllMembersRESTAPI = function(){
    return axios.get('http://localhost:8000/api/members')
}

module.exports = {getAllMoviesRESTAPI, getAllMembersRESTAPI}