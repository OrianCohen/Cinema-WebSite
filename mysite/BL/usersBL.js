const users = require('../models/usersModel')
const userDAL = require('../DAL/usersDAL')

//Get all user data from usersDB
const validUser = function(user,pass){
    return new Promise ((result,reject)=>{
        users.find({}, function(err,allUsers){
            if(err){
                reject(err)
            }
            else{
                let valid = allUsers.filter(x=> x.userName == user && x.password == pass)
                result(valid)
            }
        })
    })
}

//Find user by id from usersDB
const userById = function(id){
    return new Promise ((result,reject)=>{
        users.findById(id, function(err,allUsers){
            if(err){
                reject(err)
            }
            else{
                result(valid)
            }
        })
    })
}

//Add new user to usersDB
const createUser = function(obj){
    return new Promise ((result,reject)=>{
        const newUser = new users({
            userName: obj.username,
            password: obj.pwd
        })
        newUser.save(function(err){
            if(err){
                reject(err)
            }
            else{
                result('created!')
            }
        })
    })
}


// Get a list of all user data from users.json
const getAllUsersDataJSON = async function(){
    let usersData = await userDAL.getAllUsers();
    console.log(usersData)
    return(usersData)
}

//Find user by ID from users.json
const getUserById = async function(id){
    let allUsers = await userDAL.getAllUsers()
    let userExist = allUsers.filter(x=> x.id == id)
    return userExist
}


module.exports = {validUser, createUser, userById,getUserById ,getAllUsersDataJSON}