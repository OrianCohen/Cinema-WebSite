const permissionsDAL = require('../DAL/permissionsDAL')


const getAllPermissionsDataJSON = async function(){
    let perData = await permissionsDAL.getAllPermissions();
    return(perData)
}

const getPermissionByIdJSON = async function(id){
    let allPer = await permissionsDAL.getAllPermissions()
    let per = await allPer.filter(x=> x.id == id)
    return(per)
}

const addNewPermissionJSON = async function(obj, idd){
    let newPer = {
        id: idd,
        permissions: obj.permissions
    }
    let allPer = await permissionsDAL.createNewPermissions(newPer)
    return(allPer)
}

module.exports = {getAllPermissionsDataJSON, getPermissionByIdJSON, addNewPermissionJSON}