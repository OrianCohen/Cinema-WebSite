const axiosDAL = require('axios')

const getAllMembersAPI = function(){
    return axiosDAL.get('https://jsonplaceholder.typicode.com/users');
}

module.exports = {getAllMembersAPI }