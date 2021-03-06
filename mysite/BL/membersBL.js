var subAPI = require('../DAL/RestAPI')

const getAllMembersData = async function(){
    let membersData = await subAPI.getAllMembersRESTAPI()
    return(membersData)
}


module.exports = {getAllMembersData}