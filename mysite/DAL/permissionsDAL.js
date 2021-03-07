let jfile = require('jsonfile')

const getAllPermissions = function(){
    return new Promise((result,reject) =>{
        jfile.readFile(__dirname + '/permissions.json', function(err,data){
            if(err){
                reject(err)
            }
            else{
                let allpermissions = data.permissions
                result(allpermissions)
            }
        })
    })
}

const createNewPermissions = function(obj){
    return new Promise((result,reject)=>{
        jfile.readFile(__dirname + '/permissions.json', function(err,data){
            data.permissions.push(obj)
            jfile.writeFile(__dirname + '/permissions.json', data, function(err2){
                if((err2) ? reject(err2) : result('Added!'));
            })
            if(err){
                reject(err)
            }
        })
    })
}

const deletePermissions = function(obj){
    return new Promise((result,reject)=>{
        jfile.writeFile(__dirname + '/permissions.json', obj, function(err){
            if(err){
                reject(err)
            }
            else{
                result('deleted!')
            }
        })
    })
}

const updatePermissionJSON = async function(obj,allExceptOne){
    return new Promise((result,reject) => {
        allExceptOne.users.push(obj)
        jfile.writeFile(__dirname + '/permissions.json', allExceptOne, function(err){
            if(err){
                reject(err)
            }
            else{
                result('updated!')
            }
        })
    })
}



module.exports = {getAllPermissions,createNewPermissions,deletePermissions, updatePermissionJSON}