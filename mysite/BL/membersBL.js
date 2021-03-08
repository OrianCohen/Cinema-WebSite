var subAPI = require('../DAL/RestAPI')

const getAllMembersDataREST = async function(){
    let membersData = await subAPI.getAllMembersRESTAPI()
    return(membersData)
}


module.exports = {getAllMembersDataREST}