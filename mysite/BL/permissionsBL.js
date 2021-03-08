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

const deletePermissionByIdJSON = async function(id){
    let perData = await permissionsDAL.getAllPermissions();
    let allPer = await perData.filter(x=> x.id != id)
    let d= {permissions : allPer}
    let result = await permissionsDAL.deletePermissions(d)
    return result
}

const addNewPermissionJSON = async function(obj, idd){
    let permissionArray =[]
    let viewSubscription = obj.viewsub;
    let createSubscription = obj.createsub;
    let updateSubscription = obj.updatesub;
    let deleteSubscription = obj.deletesub;
    let viewMovies = obj.viewmo;
    let createMovies = obj.createmo;
    let updateMovies = obj.updatmo;
    let deleteMovies = obj.deletemo;



    if(createSubscription){
        createSubscription = 'Create Subscriptions'
        permissionArray.push(createSubscription)
    }

    if(updateSubscription){
        updateSubscription = 'Update Subscriptions'
        permissionArray.push(updateSubscription)
    }

    if(deleteSubscription){
        viewSubscription = 'Delete Subscriptions'
    }


    if(deleteSubscription && updateSubscription && createSubscription){
        viewSubscription = 'View Subscriptions'
        permissionArray.push(viewSubscription)
    }
    else{
        if(viewSubscription){
            viewSubscription = 'View Subscriptions'
            permissionArray.push(viewSubscription)
        }
    }

    if(createMovies){
        createMovies = 'Creatw Movies'
        permissionArray.push(createMovies)
    }

    if(updateMovies){
        updateMovies = 'Update Movies'
        permissionArray.push(updateMovies)
    }

    if(deleteMovies){
        deleteMovies = 'Delete Movies'
        permissionArray.push(deleteMovies)
    }

    if(deleteMovies && createMovies && updateMovies){
        viewMovies = 'View Movies'
        permissionArray.push(viewMovies)
    }
    else{
        if(viewMovies){
            viewMovies = 'View Movies'
            permissionArray.push(viewMovies)
        }
    }
    
    let newPer = {
        id: idd,
        permissions: permissionArray
    }

    let allPer = await permissionsDAL.createNewPermissions(newPer)
    return(allPer)
}

module.exports = {deletePermissionByIdJSON,getAllPermissionsDataJSON, getPermissionByIdJSON, addNewPermissionJSON}